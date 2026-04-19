import { useCallback, useEffect, useReducer, useRef, useState } from "react";
import { getAllSessions as getPlanSessions } from "./planData";
import { useAuth } from "./auth/useAuth";
import {
  applyImportPayload,
  buildExportPayload,
  hasMeaningfulLocalData,
  loadTrackerState,
  markExportRecorded,
  markTrackerSynced,
  markTrackerSyncError,
  mergeTrackerStates,
  persistTrackerState,
  setReminderPreferences,
  setSessionNote,
  toggleSession,
} from "./lib/trackerState";
import {
  loadRemoteTrackerState,
  recordImportExportEvent,
  saveRemoteTrackerState,
} from "./lib/firebase/progressRepository";

const ALL_SESSIONS = getPlanSessions();

function syncStatusReducer(_state, action) {
  switch (action.type) {
    case "set":
      return {
        kind: action.kind,
        message: action.message,
      };
    default:
      return _state;
  }
}

function normalizeSyncError(error) {
  if (!error) return "Could not update your progress right now.";
  if (error.code === "unavailable") {
    return "Sync is temporarily unavailable.";
  }
  if (error.code === "permission-denied") {
    return "This account can't sync right now.";
  }
  return "Could not update your progress right now.";
}

export function getAllSessions() {
  return ALL_SESSIONS;
}

export function useStore() {
  const [state, setState] = useState(loadTrackerState);
  const [syncStatus, dispatchSyncStatus] = useReducer(syncStatusReducer, {
    kind: "local",
    message: "Saved on this device.",
  });
  const stateRef = useRef(state);
  const bootstrapRef = useRef({ uid: null, complete: false });
  const syncTimerRef = useRef(null);
  const {
    configured: firebaseConfigured,
    error: authError,
    missingKeys,
    signIn,
    signOut,
    status: authStatus,
    user,
  } = useAuth();

  const updateSyncStatus = useCallback((kind, message) => {
    dispatchSyncStatus({ type: "set", kind, message });
  }, []);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  const commitState = useCallback((updater) => {
    setState((previousState) => {
      const nextState =
        typeof updater === "function" ? updater(previousState) : updater;
      persistTrackerState(nextState);
      return nextState;
    });
  }, []);

  const recordActivity = useCallback(
    async (type, payload = {}) => {
      if (!user) return;
      try {
        await recordImportExportEvent(user.uid, {
          type,
          clientId: stateRef.current.sync.clientId,
          ...payload,
        });
      } catch {
        // Activity logging should never block the local flow.
      }
    },
    [user],
  );

  useEffect(() => {
    if (!firebaseConfigured) {
      updateSyncStatus(
        "unavailable",
        "Sync isn't available right now. Progress stays on this device.",
      );
      return;
    }

    if (!user && authStatus !== "loading" && authStatus !== "authenticating") {
      updateSyncStatus(
        authError ? "error" : "guest",
        authError ||
          "Guest mode is active. Sign in when you want your progress available across devices.",
      );
    }
  }, [authError, authStatus, firebaseConfigured, updateSyncStatus, user]);

  useEffect(() => {
    if (!firebaseConfigured || !user) {
      bootstrapRef.current = { uid: null, complete: false };
      return undefined;
    }

    if (
      bootstrapRef.current.uid === user.uid &&
      bootstrapRef.current.complete
    ) {
      return undefined;
    }

    let cancelled = false;

    const bootstrapRemoteState = async () => {
      updateSyncStatus("syncing", "Loading your saved progress...");

      try {
        const localSnapshot = stateRef.current;
        const remoteState = await loadRemoteTrackerState(user.uid);
        if (cancelled) return;

        if (!remoteState) {
          if (hasMeaningfulLocalData(localSnapshot)) {
            await saveRemoteTrackerState(user.uid, localSnapshot);
            if (cancelled) return;
            commitState(markTrackerSynced(localSnapshot));
            updateSyncStatus("synced", "Your progress is now backed up.");
          } else {
            commitState(markTrackerSynced(localSnapshot));
            updateSyncStatus("synced", "Account sync is ready.");
          }
        } else {
          const mergedState = mergeTrackerStates(localSnapshot, remoteState);
          if (mergedState.sync.needsUpload) {
            await saveRemoteTrackerState(user.uid, mergedState);
          }
          if (cancelled) return;
          commitState(markTrackerSynced(mergedState));
          updateSyncStatus(
            "synced",
            mergedState.sync.needsUpload
              ? "Your latest progress is now up to date."
              : "Saved progress loaded.",
          );
        }

        bootstrapRef.current = { uid: user.uid, complete: true };
      } catch (error) {
        if (cancelled) return;
        const message = normalizeSyncError(error);
        commitState((previousState) =>
          markTrackerSyncError(previousState, message),
        );
        updateSyncStatus("error", message);
      }
    };

    void bootstrapRemoteState();

    return () => {
      cancelled = true;
    };
  }, [commitState, firebaseConfigured, updateSyncStatus, user]);

  useEffect(() => {
    if (!firebaseConfigured || !user || !bootstrapRef.current.complete)
      return undefined;
    if (!state.sync.needsUpload) return undefined;

    if (syncTimerRef.current) {
      clearTimeout(syncTimerRef.current);
    }

    updateSyncStatus("syncing", "Updating your progress...");

    syncTimerRef.current = window.setTimeout(async () => {
      try {
        await saveRemoteTrackerState(user.uid, stateRef.current);
        commitState((previousState) => markTrackerSynced(previousState));
        updateSyncStatus("synced", "Everything is up to date.");
      } catch (error) {
        const message = normalizeSyncError(error);
        commitState((previousState) =>
          markTrackerSyncError(previousState, message),
        );
        updateSyncStatus("error", message);
      }
    }, 900);

    return () => {
      if (syncTimerRef.current) {
        clearTimeout(syncTimerRef.current);
      }
    };
  }, [
    commitState,
    firebaseConfigured,
    state.sync.needsUpload,
    updateSyncStatus,
    user,
  ]);

  const toggle = useCallback(
    (sessionId) => {
      commitState((previousState) => toggleSession(previousState, sessionId));
    },
    [commitState],
  );

  const setNote = useCallback(
    (sessionId, text) => {
      commitState((previousState) =>
        setSessionNote(previousState, sessionId, text),
      );
    },
    [commitState],
  );

  const updateNotif = useCallback(
    (patch) => {
      commitState((previousState) =>
        setReminderPreferences(previousState, patch),
      );
    },
    [commitState],
  );

  const importProgress = useCallback(
    (payload) => {
      let summary = { restoredDone: 0, restoredNotes: 0 };

      commitState((previousState) => {
        const result = applyImportPayload(previousState, payload);
        summary = result.summary;
        return result.state;
      });

      void recordActivity("import", summary);
      return summary;
    },
    [commitState, recordActivity],
  );

  const createExportSnapshot = useCallback(
    () => buildExportPayload(stateRef.current),
    [],
  );

  const markExport = useCallback(
    (payload) => {
      commitState((previousState) => markExportRecorded(previousState));
      void recordActivity("export", {
        sessionCount: payload.sessions.length,
        doneCount: payload.sessions.filter((session) => session.done).length,
        noteCount: payload.sessions.filter((session) => session.note).length,
      });
    },
    [commitState, recordActivity],
  );

  const syncNow = useCallback(async () => {
    if (!firebaseConfigured || !user) return false;

    try {
      updateSyncStatus("syncing", "Checking for updates...");
      const remoteState = await loadRemoteTrackerState(user.uid);
      const mergedState = remoteState
        ? mergeTrackerStates(stateRef.current, remoteState)
        : stateRef.current;

      await saveRemoteTrackerState(user.uid, mergedState);
      commitState(markTrackerSynced(mergedState));
      updateSyncStatus("synced", "Sync complete.");
      return true;
    } catch (error) {
      const message = normalizeSyncError(error);
      commitState((previousState) =>
        markTrackerSyncError(previousState, message),
      );
      updateSyncStatus("error", message);
      return false;
    }
  }, [commitState, firebaseConfigured, updateSyncStatus, user]);

  const totalSessions = ALL_SESSIONS.length;
  const doneSessions = Object.keys(state.done).length;
  const nextSession =
    ALL_SESSIONS.find((session) => !state.done[session.id]) ?? null;

  return {
    auth: {
      configured: firebaseConfigured,
      error: authError,
      missingKeys,
      signIn,
      signOut,
      status: authStatus,
      user,
    },
    buildExportPayload: createExportSnapshot,
    done: state.done,
    doneSessions,
    importProgress,
    markExport,
    nextSession,
    notes: state.notes,
    notif: state.notif,
    setNote,
    streakData: state.streak,
    syncState: {
      ...syncStatus,
      lastError: state.sync.lastError,
      lastExportAt: state.sync.lastExportAt,
      lastImportAt: state.sync.lastImportAt,
      lastSyncedAt: state.sync.lastSyncedAt,
      pendingChanges: state.sync.needsUpload,
    },
    syncNow,
    toggle,
    totalSessions,
    updateNotif,
  };
}
