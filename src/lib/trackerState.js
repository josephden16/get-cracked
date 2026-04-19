import {
  getAllSessions,
  getSessionByLegacyIndex,
  getSessionIdByLegacyIndex,
} from "../planData";

const TRACKER_STORAGE_KEY = "staff_plan_state_v3";
const LEGACY_DONE_KEY = "staff_plan_done_v2";
const LEGACY_STREAK_KEY = "staff_plan_streak_v1";
const LEGACY_NOTIF_KEY = "staff_plan_notif_v1";
const LEGACY_NOTES_KEY = "staff_plan_notes_v1";
const CLIENT_ID_KEY = "staff_plan_client_id_v1";

export const TRACKER_SCHEMA_VERSION = 3;

const DEFAULT_NOTIF = {
  enabled: false,
  time: "09:00",
  updatedAt: null,
};

const DEFAULT_STREAK = {
  streak: 0,
  lastDate: null,
  updatedAt: null,
};

const DEFAULT_SYNC = {
  clientId: null,
  lastLocalChangeAt: null,
  lastSyncedAt: null,
  lastImportAt: null,
  lastExportAt: null,
  needsUpload: false,
  lastError: null,
};

function safeParse(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function readStorage(key) {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(key);
}

function writeStorage(key, value) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, value);
}

function createClientId() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `client-${Date.now()}-${Math.random().toString(36).slice(2, 10)}`;
}

function ensureClientId(existingId) {
  const persisted = readStorage(CLIENT_ID_KEY);
  const nextId = existingId || persisted || createClientId();
  if (nextId !== persisted) {
    writeStorage(CLIENT_ID_KEY, nextId);
  }
  return nextId;
}

export function nowIso() {
  return new Date().toISOString();
}

export function todayStr(date = new Date()) {
  return new Date(date).toISOString().slice(0, 10);
}

function toIsoDateStart(dateString) {
  return `${dateString}T00:00:00.000Z`;
}

function normalizeDoneRecord(value) {
  if (!value) return null;
  if (typeof value === "string") {
    return {
      completedAt: value,
      updatedAt: toIsoDateStart(value),
    };
  }
  if (typeof value === "object" && typeof value.completedAt === "string") {
    return {
      completedAt: value.completedAt,
      updatedAt:
        typeof value.updatedAt === "string"
          ? value.updatedAt
          : toIsoDateStart(value.completedAt),
    };
  }
  return null;
}

function normalizeNoteRecord(value) {
  if (!value) return null;
  if (typeof value === "string") {
    return {
      text: value,
      updatedAt: nowIso(),
    };
  }
  if (typeof value === "object" && typeof value.text === "string") {
    return {
      text: value.text,
      updatedAt:
        typeof value.updatedAt === "string" ? value.updatedAt : nowIso(),
    };
  }
  return null;
}

function normalizeNotif(value) {
  return {
    enabled: Boolean(value?.enabled),
    time: typeof value?.time === "string" ? value.time : DEFAULT_NOTIF.time,
    updatedAt: typeof value?.updatedAt === "string" ? value.updatedAt : null,
  };
}

function normalizeStreak(value) {
  return {
    streak: Number.isFinite(value?.streak) ? value.streak : 0,
    lastDate: typeof value?.lastDate === "string" ? value.lastDate : null,
    updatedAt: typeof value?.updatedAt === "string" ? value.updatedAt : null,
  };
}

function normalizeSync(value) {
  return {
    clientId: ensureClientId(value?.clientId),
    lastLocalChangeAt:
      typeof value?.lastLocalChangeAt === "string"
        ? value.lastLocalChangeAt
        : null,
    lastSyncedAt:
      typeof value?.lastSyncedAt === "string" ? value.lastSyncedAt : null,
    lastImportAt:
      typeof value?.lastImportAt === "string" ? value.lastImportAt : null,
    lastExportAt:
      typeof value?.lastExportAt === "string" ? value.lastExportAt : null,
    needsUpload: Boolean(value?.needsUpload),
    lastError: typeof value?.lastError === "string" ? value.lastError : null,
  };
}

function normalizeDoneMap(doneMap) {
  return Object.fromEntries(
    Object.entries(doneMap || {})
      .map(([sessionId, value]) => [sessionId, normalizeDoneRecord(value)])
      .filter(([, value]) => value),
  );
}

function normalizeNoteMap(notesMap) {
  return Object.fromEntries(
    Object.entries(notesMap || {})
      .map(([sessionId, value]) => [sessionId, normalizeNoteRecord(value)])
      .filter(([, value]) => value && value.text.trim()),
  );
}

function cloneState(state) {
  return {
    ...state,
    done: { ...state.done },
    notes: { ...state.notes },
    streak: { ...state.streak },
    notif: { ...state.notif },
    sync: { ...state.sync },
  };
}

export function createEmptyTrackerState() {
  return {
    schemaVersion: TRACKER_SCHEMA_VERSION,
    done: {},
    notes: {},
    streak: { ...DEFAULT_STREAK },
    notif: { ...DEFAULT_NOTIF },
    sync: normalizeSync(DEFAULT_SYNC),
  };
}

export function hydrateTrackerState(rawState) {
  const emptyState = createEmptyTrackerState();

  return {
    schemaVersion: TRACKER_SCHEMA_VERSION,
    done: normalizeDoneMap(rawState?.done),
    notes: normalizeNoteMap(rawState?.notes),
    streak: normalizeStreak(rawState?.streak ?? emptyState.streak),
    notif: normalizeNotif(rawState?.notif ?? emptyState.notif),
    sync: normalizeSync(rawState?.sync ?? emptyState.sync),
  };
}

function migrateLegacyDone() {
  const legacyDone = safeParse(readStorage(LEGACY_DONE_KEY), {});
  return Object.fromEntries(
    Object.entries(legacyDone)
      .map(([legacyIndex, value]) => {
        const sessionId = getSessionIdByLegacyIndex(legacyIndex);
        if (!sessionId) return null;
        const completedAt = typeof value === "string" ? value : todayStr();
        return [
          sessionId,
          { completedAt, updatedAt: toIsoDateStart(completedAt) },
        ];
      })
      .filter(Boolean),
  );
}

function migrateLegacyNotes() {
  const legacyNotes = safeParse(readStorage(LEGACY_NOTES_KEY), {});
  return Object.fromEntries(
    Object.entries(legacyNotes)
      .map(([legacyIndex, text]) => {
        const sessionId = getSessionIdByLegacyIndex(legacyIndex);
        if (!sessionId || typeof text !== "string" || !text.trim()) return null;
        return [sessionId, { text, updatedAt: nowIso() }];
      })
      .filter(Boolean),
  );
}

export function recomputeStreak(doneMap) {
  const uniqueDates = Array.from(
    new Set(
      Object.values(doneMap)
        .map((record) => normalizeDoneRecord(record)?.completedAt)
        .filter(Boolean),
    ),
  ).sort((left, right) => right.localeCompare(left));

  if (uniqueDates.length === 0) {
    return { ...DEFAULT_STREAK, updatedAt: nowIso() };
  }

  let streak = 1;
  let expectedDate = uniqueDates[0];

  for (let index = 1; index < uniqueDates.length; index += 1) {
    const previous = new Date(`${expectedDate}T00:00:00.000Z`);
    previous.setUTCDate(previous.getUTCDate() - 1);
    const previousStr = previous.toISOString().slice(0, 10);

    if (uniqueDates[index] !== previousStr) break;
    expectedDate = uniqueDates[index];
    streak += 1;
  }

  return {
    streak,
    lastDate: uniqueDates[0],
    updatedAt: nowIso(),
  };
}

export function loadTrackerState() {
  const existingState = safeParse(readStorage(TRACKER_STORAGE_KEY), null);
  if (existingState) {
    const hydratedState = hydrateTrackerState(existingState);
    persistTrackerState(hydratedState);
    return hydratedState;
  }

  const migratedState = hydrateTrackerState({
    done: migrateLegacyDone(),
    notes: migrateLegacyNotes(),
    streak: safeParse(readStorage(LEGACY_STREAK_KEY), DEFAULT_STREAK),
    notif: safeParse(readStorage(LEGACY_NOTIF_KEY), DEFAULT_NOTIF),
  });

  migratedState.streak = recomputeStreak(migratedState.done);
  persistTrackerState(migratedState);
  return migratedState;
}

export function persistTrackerState(state) {
  writeStorage(TRACKER_STORAGE_KEY, JSON.stringify(hydrateTrackerState(state)));
}

function stampLocalChange(state, needsUpload = true) {
  return {
    ...state,
    sync: {
      ...state.sync,
      lastLocalChangeAt: nowIso(),
      needsUpload,
      lastError: null,
    },
  };
}

function compareTimestamps(left, right) {
  if (!left && !right) return 0;
  if (!left) return -1;
  if (!right) return 1;
  return left.localeCompare(right);
}

export function toggleSession(state, sessionId) {
  const nextState = cloneState(state);

  if (nextState.done[sessionId]) {
    delete nextState.done[sessionId];
  } else {
    nextState.done[sessionId] = {
      completedAt: todayStr(),
      updatedAt: nowIso(),
    };
  }

  nextState.streak = recomputeStreak(nextState.done);
  return stampLocalChange(nextState);
}

export function setSessionNote(state, sessionId, text) {
  const nextState = cloneState(state);

  if (text.trim()) {
    nextState.notes[sessionId] = {
      text,
      updatedAt: nowIso(),
    };
  } else {
    delete nextState.notes[sessionId];
  }

  return stampLocalChange(nextState);
}

export function setReminderPreferences(state, patch) {
  const nextState = cloneState(state);
  nextState.notif = {
    ...nextState.notif,
    ...patch,
    updatedAt: nowIso(),
  };
  return stampLocalChange(nextState);
}

function resolveImportedSession(record) {
  if (
    record?.sessionId &&
    getAllSessions().some((session) => session.id === record.sessionId)
  ) {
    return (
      getAllSessions().find((session) => session.id === record.sessionId) ??
      null
    );
  }
  if (Number.isInteger(record?.index)) {
    return getSessionByLegacyIndex(record.index);
  }
  return null;
}

export function applyImportPayload(state, payload) {
  const nextState = cloneState(state);
  let restoredDone = 0;
  let restoredNotes = 0;

  (payload?.sessions || []).forEach((record) => {
    const session = resolveImportedSession(record);
    if (!session) return;

    if (record.done && !nextState.done[session.id]) {
      const completedAt =
        typeof record.doneDate === "string" ? record.doneDate : todayStr();
      nextState.done[session.id] = {
        completedAt,
        updatedAt:
          typeof record.doneUpdatedAt === "string"
            ? record.doneUpdatedAt
            : toIsoDateStart(completedAt),
      };
      restoredDone += 1;
    }

    if (
      typeof record.note === "string" &&
      record.note.trim() &&
      !nextState.notes[session.id]
    ) {
      nextState.notes[session.id] = {
        text: record.note,
        updatedAt:
          typeof record.noteUpdatedAt === "string"
            ? record.noteUpdatedAt
            : typeof payload?.exportedAt === "string"
              ? payload.exportedAt
              : nowIso(),
      };
      restoredNotes += 1;
    }
  });

  nextState.streak = recomputeStreak(nextState.done);
  nextState.sync.lastImportAt = nowIso();

  return {
    state: stampLocalChange(nextState),
    summary: {
      restoredDone,
      restoredNotes,
    },
  };
}

export function buildExportPayload(state) {
  const exportedAt = nowIso();
  return {
    exportedAt,
    schemaVersion: TRACKER_SCHEMA_VERSION,
    sessions: getAllSessions().map((session) => ({
      index: session.globalIndex,
      sessionId: session.id,
      title: session.title,
      phase: session.phase,
      week: session.week,
      tag: session.tag,
      done: Boolean(state.done[session.id]),
      doneDate: state.done[session.id]?.completedAt ?? null,
      doneUpdatedAt: state.done[session.id]?.updatedAt ?? null,
      note: state.notes[session.id]?.text ?? null,
      noteUpdatedAt: state.notes[session.id]?.updatedAt ?? null,
    })),
  };
}

export function hasMeaningfulLocalData(state) {
  return (
    Object.keys(state.done).length > 0 ||
    Object.keys(state.notes).length > 0 ||
    state.notif.enabled ||
    state.notif.time !== DEFAULT_NOTIF.time
  );
}

export function mergeTrackerStates(localState, remoteState) {
  const local = hydrateTrackerState(localState);
  const remote = hydrateTrackerState(remoteState);
  const mergedState = createEmptyTrackerState();
  let shouldUpload = false;

  mergedState.sync = {
    ...mergedState.sync,
    ...local.sync,
    clientId: ensureClientId(local.sync.clientId),
  };

  const doneIds = new Set([
    ...Object.keys(local.done),
    ...Object.keys(remote.done),
  ]);
  doneIds.forEach((sessionId) => {
    const localRecord = normalizeDoneRecord(local.done[sessionId]);
    const remoteRecord = normalizeDoneRecord(remote.done[sessionId]);

    if (!localRecord && remoteRecord) {
      mergedState.done[sessionId] = remoteRecord;
      return;
    }

    if (localRecord && !remoteRecord) {
      mergedState.done[sessionId] = localRecord;
      shouldUpload = true;
      return;
    }

    if (localRecord && remoteRecord) {
      if (
        compareTimestamps(localRecord.updatedAt, remoteRecord.updatedAt) >= 0
      ) {
        mergedState.done[sessionId] = localRecord;
        shouldUpload =
          shouldUpload ||
          compareTimestamps(localRecord.updatedAt, remoteRecord.updatedAt) > 0;
      } else {
        mergedState.done[sessionId] = remoteRecord;
      }
    }
  });

  const noteIds = new Set([
    ...Object.keys(local.notes),
    ...Object.keys(remote.notes),
  ]);
  noteIds.forEach((sessionId) => {
    const localRecord = normalizeNoteRecord(local.notes[sessionId]);
    const remoteRecord = normalizeNoteRecord(remote.notes[sessionId]);

    if (!localRecord && remoteRecord) {
      mergedState.notes[sessionId] = remoteRecord;
      return;
    }

    if (localRecord && !remoteRecord) {
      mergedState.notes[sessionId] = localRecord;
      shouldUpload = true;
      return;
    }

    if (localRecord && remoteRecord) {
      if (
        compareTimestamps(localRecord.updatedAt, remoteRecord.updatedAt) >= 0
      ) {
        mergedState.notes[sessionId] = localRecord;
        shouldUpload =
          shouldUpload ||
          compareTimestamps(localRecord.updatedAt, remoteRecord.updatedAt) > 0;
      } else {
        mergedState.notes[sessionId] = remoteRecord;
      }
    }
  });

  if (compareTimestamps(local.notif.updatedAt, remote.notif.updatedAt) >= 0) {
    mergedState.notif = normalizeNotif(local.notif);
    shouldUpload =
      shouldUpload ||
      compareTimestamps(local.notif.updatedAt, remote.notif.updatedAt) > 0;
  } else {
    mergedState.notif = normalizeNotif(remote.notif);
  }

  mergedState.streak = recomputeStreak(mergedState.done);
  mergedState.sync.lastSyncedAt = local.sync.lastSyncedAt ?? null;
  mergedState.sync.lastLocalChangeAt = local.sync.lastLocalChangeAt ?? null;
  mergedState.sync.lastError = null;
  mergedState.sync.needsUpload = shouldUpload || local.sync.needsUpload;

  return mergedState;
}

export function markTrackerSynced(state) {
  return {
    ...state,
    sync: {
      ...state.sync,
      lastSyncedAt: nowIso(),
      needsUpload: false,
      lastError: null,
    },
  };
}

export function markTrackerSyncError(state, message) {
  return {
    ...state,
    sync: {
      ...state.sync,
      lastError: message,
      needsUpload: true,
    },
  };
}

export function markExportRecorded(state) {
  return {
    ...state,
    sync: {
      ...state.sync,
      lastExportAt: nowIso(),
    },
  };
}
