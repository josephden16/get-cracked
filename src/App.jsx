import { useState, useEffect, useRef, useCallback } from "react";
import { PLAN, PHASE_COLORS, TAG_COLORS, getAllSessions } from "./planData";
import { useStore } from "./useStore";
import "./App.css";

const ALL_SESSIONS = getAllSessions();
const MANUAL_SYNC_COOLDOWN_MS = 10000;

function CheckIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="1.5,6 4.5,9 10.5,3" />
    </svg>
  );
}

function LinkIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h7a1 1 0 0 0 1-1V7" />
      <path d="M8 1h3v3" />
      <path d="M11 1L6 6" />
    </svg>
  );
}

function BellIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1a5 5 0 0 0-5 5v3l-1.5 2h13L13 9V6a5 5 0 0 0-5-5z" />
      <path d="M6.5 13a1.5 1.5 0 0 0 3 0" />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1s4 4 4 7.5a4 4 0 0 1-8 0C4 7.5 5 6 5 6S5.5 9 8 9c0 0-2-2.5-2-5 0 0 1 1.5 2 1.5S8 1 8 1z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="6" cy="6" r="4.5" />
      <path d="M9.5 9.5L13 13" />
    </svg>
  );
}

function NotesIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="1" y="1" width="10" height="10" rx="1.5" />
      <path d="M3.5 4h5M3.5 6.5h5M3.5 9h3" />
    </svg>
  );
}

function ExportIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 1v8M4 6l3 3 3-3" />
      <path d="M2 10v1.5A1.5 1.5 0 0 0 3.5 13h7a1.5 1.5 0 0 0 1.5-1.5V10" />
    </svg>
  );
}

function ImportIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 9V1M4 4l3-3 3 3" />
      <path d="M2 10v1.5A1.5 1.5 0 0 0 3.5 13h7a1.5 1.5 0 0 0 1.5-1.5V10" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82a7.65 7.65 0 0 1 2-.27c.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
    </svg>
  );
}

function CloudIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12.5 12.5a2.5 2.5 0 0 0 .2-5 4.5 4.5 0 0 0-8.8-1.3A3 3 0 0 0 4 12.5h8.5z" />
    </svg>
  );
}

function SyncIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 6A5 5 0 0 0 4.5 3.5L3 5" />
      <path d="M3 2.5V5h2.5" />
      <path d="M3 10a5 5 0 0 0 8.5 2.5L13 11" />
      <path d="M10.5 11H13v2.5" />
    </svg>
  );
}

function formatTimestamp(value) {
  if (!value) return "Not yet";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Not yet";
  return date.toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function getSyncTone(auth, syncState) {
  if (!auth.configured) return "muted";
  if (syncState.kind === "synced") return "ok";
  if (syncState.kind === "syncing") return "live";
  if (syncState.kind === "error") return "warn";
  if (auth.status === "authenticated") return "live";
  return "muted";
}

function getSyncLabel(auth, syncState) {
  if (!auth.configured) return "local only";
  if (auth.status !== "authenticated") return "guest mode";
  if (syncState.kind === "synced") return syncState.pendingChanges ? "pending updates" : "up to date";
  if (syncState.kind === "syncing") return "updating";
  if (syncState.kind === "error") return "needs attention";
  return "ready";
}

function SessionCard({ session, isDone, onToggle, note, onNoteChange }) {
  const [expanded, setExpanded] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const tagStyle = TAG_COLORS[session.tag];
  const textareaRef = useRef(null);
  const saveTimerRef = useRef(null);

  const handleToggle = () => {
    if (!isDone) {
      setAnimating(true);
      setTimeout(() => setAnimating(false), 280);
    }
    onToggle(session.id);
  };

  useEffect(() => {
    if (!textareaRef.current || !showNotes) return;
    const element = textareaRef.current;
    element.style.height = "auto";
    element.style.height = `${Math.max(80, element.scrollHeight)}px`;
  }, [note, showNotes]);

  const handleNoteChange = (event) => {
    onNoteChange(session.id, event.target.value);
    clearTimeout(saveTimerRef.current);
    setSavedFlash(false);
    saveTimerRef.current = setTimeout(() => {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1800);
    }, 700);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.stopPropagation();
      setShowNotes(false);
    }
  };

  const wordCount = note ? note.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className={`session-card${isDone ? " done" : ""}${showNotes ? " notes-open" : ""}`}>
      <div className="session-card-main">
        <button
          className={`check-btn${isDone ? " checked" : ""}${animating ? " pop" : ""}`}
          aria-label={isDone ? "Mark undone" : "Mark done"}
          onClick={handleToggle}
        >
          {isDone && <CheckIcon />}
        </button>
        <div className="session-content">
          <div className="session-title">{session.title}</div>
          <div className="session-task">{session.task}</div>
          {note && !showNotes && (
            <div className="note-preview" onClick={(event) => { event.stopPropagation(); setShowNotes(true); }}>
              <NotesIcon />
              <span>{note}</span>
            </div>
          )}
          <div className="session-footer">
            <span className="tag" style={{ background: tagStyle.bg, color: tagStyle.color }}>{session.tag}</span>
            {session.links?.length > 0 && (
              <button className="links-toggle" onClick={(event) => { event.stopPropagation(); setExpanded((current) => !current); }}>
                <LinkIcon />
                {expanded ? "hide links" : `${session.links.length} resources`}
              </button>
            )}
            <button
              className={`links-toggle notes-toggle${note ? " has-note" : ""}${showNotes ? " open" : ""}`}
              onClick={(event) => { event.stopPropagation(); setShowNotes((current) => !current); }}
            >
              <NotesIcon />
              {showNotes ? "close note" : note ? "note ✎" : "note"}
            </button>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="links-panel">
          {session.links.map((link) => (
            <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className="resource-link">
              <LinkIcon />
              {link.label}
            </a>
          ))}
        </div>
      )}
      {showNotes && (
        <div className="notes-panel" onClick={(event) => event.stopPropagation()}>
          <div className="notes-panel-header">
            <span className="notes-panel-label"><NotesIcon /> session note</span>
            <div className="notes-panel-actions">
              <span className={`notes-saved${savedFlash ? " visible" : ""}`}>saved</span>
              {note && (
                <button className="notes-action-btn" onClick={() => { onNoteChange(session.id, ""); setSavedFlash(false); }}>
                  clear
                </button>
              )}
              <button className="notes-action-btn notes-close" onClick={() => setShowNotes(false)}>✕</button>
            </div>
          </div>
          <textarea
            ref={textareaRef}
            className="notes-area"
            placeholder="What did you build or learn? Any blockers? Key insight?"
            value={note || ""}
            onChange={handleNoteChange}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <div className="notes-footer">
            <span className="notes-wordcount">{wordCount > 0 ? `${wordCount}w` : ""}</span>
            <span className="notes-hint">esc to close</span>
          </div>
        </div>
      )}
    </div>
  );
}

function TodayPin({ session, onJump }) {
  if (!session) return null;
  const tagStyle = TAG_COLORS[session.tag];

  return (
    <div className="today-pin">
      <div className="today-pin-label">▸ up next</div>
      <div className="today-pin-card" onClick={onJump} title="Jump to session">
        <div className="today-pin-title">{session.title}</div>
        <div className="today-pin-task">{session.task}</div>
        <span className="tag" style={{ background: tagStyle.bg, color: tagStyle.color }}>{session.tag}</span>
      </div>
    </div>
  );
}

function Toast({ message, onUndo, onDismiss }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 5000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  return (
    <div className="toast">
      <span className="toast-msg">{message}</span>
      <div className="toast-actions">
        {onUndo && <button className="toast-undo" onClick={onUndo}>Undo</button>}
        <button className="toast-dismiss" onClick={onDismiss}>✕</button>
      </div>
    </div>
  );
}

function ImportDrawer({ onImport, onClose }) {
  const [dragOver, setDragOver] = useState(false);
  const [parsed, setParsed] = useState(null);
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  const readFile = (file) => {
    if (!file || !file.name.endsWith(".json")) {
      setError("Please choose a backup file exported from get.cracked.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = JSON.parse(event.target.result);
        if (!Array.isArray(data.sessions)) throw new Error("Invalid format");
        setParsed(data);
        setError(null);
      } catch {
        setError("Couldn't read that file. Make sure it's a get.cracked export.");
        setParsed(null);
      }
    };
    reader.readAsText(file);
  };

  const doneCount = parsed ? parsed.sessions.filter((session) => session.done).length : 0;
  const noteCount = parsed ? parsed.sessions.filter((session) => session.note).length : 0;
  const exportedDate = parsed?.exportedAt
    ? new Date(parsed.exportedAt).toLocaleDateString(undefined, { dateStyle: "medium" })
    : null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <span>Import progress</span>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">
          {!parsed ? (
            <>
              <div
                className={`import-drop-zone${dragOver ? " drag-over" : ""}`}
                onDragOver={(event) => { event.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(event) => { event.preventDefault(); setDragOver(false); readFile(event.dataTransfer.files[0]); }}
                onClick={() => fileRef.current?.click()}
              >
                <div className="import-drop-icon"><ImportIcon /></div>
                <div className="import-drop-title">Drop your backup file here</div>
                <div className="import-drop-sub">or click to browse for saved progress</div>
                <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={(event) => readFile(event.target.files[0])} />
              </div>
              {error && <div className="import-error">{error}</div>}
              <div className="import-hint">This merges completed sessions and notes into your current progress. If you are signed in, the changes will be picked up automatically.</div>
            </>
          ) : (
            <>
              <div className="import-preview">
                <div className="import-preview-row">
                  <span className="import-preview-label">Exported</span>
                  <span className="import-preview-value">{exportedDate}</span>
                </div>
                <div className="import-preview-row">
                  <span className="import-preview-label">Sessions done</span>
                  <span className="import-preview-value import-preview-green">{doneCount} / {parsed.sessions.length}</span>
                </div>
                <div className="import-preview-row">
                  <span className="import-preview-label">Notes</span>
                  <span className="import-preview-value">{noteCount}</span>
                </div>
              </div>
              <div className="import-hint">Completed sessions and notes will be merged in. Existing completions stay intact and current notes are not overwritten.</div>
              <div className="import-actions">
                <button className="import-confirm-btn" onClick={() => { onImport(parsed); onClose(); }}>Apply import</button>
                <button className="import-cancel-btn" onClick={() => setParsed(null)}>Choose different file</button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function NotifDrawer({ notif, updateNotif, onClose, signedIn }) {
  const [permission, setPermission] = useState(() =>
    "Notification" in window ? Notification.permission : "denied",
  );

  const requestPermission = async () => {
    const result = await Notification.requestPermission();
    setPermission(result);
    if (result === "granted") updateNotif({ enabled: true });
  };

  const toggle = () => {
    if (!notif.enabled && permission !== "granted") {
      requestPermission();
      return;
    }
    updateNotif({ enabled: !notif.enabled });
  };

  const test = () => {
    if (permission === "granted") {
      new Notification("📚 Study reminder", { body: "It's time to study!" });
    }
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <span>Reminder settings</span>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">
          <div className="setting-row">
            <div>
              <div className="setting-label">Daily reminder</div>
              <div className="setting-desc">
                {permission === "denied"
                  ? "Notifications are blocked in this browser."
                  : "Set a daily nudge for the next unfinished session."}
              </div>
            </div>
            <button className={`toggle-btn${notif.enabled ? " on" : ""}`} onClick={toggle} disabled={permission === "denied"}>
              <span className="toggle-thumb" />
            </button>
          </div>
          <div className="setting-row">
            <div>
              <div className="setting-label">Reminder time</div>
              <div className="setting-desc">{signedIn ? "Your reminder settings can follow you. Notification permission still depends on this device." : "This reminder stays on this device until you sign in."}</div>
            </div>
            <input type="time" className="time-input" value={notif.time} onChange={(event) => updateNotif({ time: event.target.value })} />
          </div>
          <button className="test-btn" onClick={test} disabled={permission !== "granted"}>Send test notification</button>
        </div>
      </div>
    </div>
  );
}

function AccountDrawer({ auth, syncState, onSyncNow, onClose }) {
  const [busy, setBusy] = useState(null);
  const [syncLocked, setSyncLocked] = useState(false);

  useEffect(() => {
    if (!syncLocked) return undefined;

    const timer = setTimeout(() => {
      setSyncLocked(false);
    }, MANUAL_SYNC_COOLDOWN_MS);

    return () => clearTimeout(timer);
  }, [syncLocked]);

  const syncInFlight = busy === "sync" || syncState.kind === "syncing";
  const syncDisabled = syncInFlight || (syncLocked && syncState.kind !== "error");

  let syncActionLabel = "Check now";
  if (syncInFlight) {
    syncActionLabel = "Syncing...";
  } else if (syncState.kind === "error") {
    syncActionLabel = "Retry sync";
  } else if (syncLocked) {
    syncActionLabel = "Checked just now";
  } else if (syncState.pendingChanges) {
    syncActionLabel = "Sync now";
  }

  let syncActionHint = "Use this to check for the latest account updates on demand.";
  if (syncInFlight) {
    syncActionHint = "A sync is already in progress.";
  } else if (syncState.kind === "error") {
    syncActionHint = "Try again after the issue above is resolved.";
  } else if (syncLocked) {
    syncActionHint = "Give it a moment before checking again.";
  } else if (syncState.pendingChanges) {
    syncActionHint = "You have recent changes ready to send.";
  }

  const handleSignIn = async () => {
    setBusy("signin");
    await auth.signIn();
    setBusy(null);
  };

  const handleSignOut = async () => {
    setBusy("signout");
    await auth.signOut();
    setBusy(null);
  };

  const handleSync = async () => {
    if (syncDisabled) return;
    setBusy("sync");
    const didSync = await onSyncNow();
    if (didSync) {
      setSyncLocked(true);
    }
    setBusy(null);
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={(event) => event.stopPropagation()}>
        <div className="drawer-header">
          <span>Account & sync</span>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">
          <div className="account-hero">
            <div className="account-hero-icon"><CloudIcon /></div>
            <div>
              <div className="setting-label">Local-first tracker</div>
              <div className="setting-desc">Use guest mode freely, then sign in when you want your progress available wherever you study.</div>
            </div>
          </div>

          {!auth.configured ? (
            <>
              <div className="status-panel status-panel--muted">
                <div className="status-panel-title">Account sync isn't available right now</div>
                <div className="status-panel-copy">You can keep using the tracker normally on this device. Account features will appear when they are available.</div>
              </div>
              <div className="scope-list">
                <div className="scope-item"><span className="scope-label">includes</span><span>Completed sessions</span></div>
                <div className="scope-item"><span className="scope-label">includes</span><span>Session notes</span></div>
                <div className="scope-item"><span className="scope-label">includes</span><span>Streak and reminder settings</span></div>
              </div>
            </>
          ) : auth.user ? (
            <>
              <div className="account-card">
                <div className="account-card-top">
                  <div>
                    <div className="account-name">{auth.user.displayName || "Signed in"}</div>
                    <div className="account-email">{auth.user.email || "Your account"}</div>
                  </div>
                  <span className={`sync-pill sync-pill--${getSyncTone(auth, syncState)}`}>{getSyncLabel(auth, syncState)}</span>
                </div>
                <div className="account-card-copy">{syncState.message}</div>
              </div>

              {auth.error && (
                <div className="status-panel status-panel--warning">
                  <div className="status-panel-title">Authentication issue</div>
                  <div className="status-panel-copy">{auth.error}</div>
                </div>
              )}

              {syncState.lastError && (
                <div className="status-panel status-panel--warning">
                  <div className="status-panel-title">Sync needs attention</div>
                  <div className="status-panel-copy">{syncState.lastError}</div>
                </div>
              )}

              <div className="account-actions">
                <button className="action-btn action-btn--primary" onClick={handleSync} disabled={syncDisabled}>
                  <SyncIcon />
                  {syncActionLabel}
                </button>
                <button className="action-btn" onClick={handleSignOut} disabled={busy === "signout"}>
                  {busy === "signout" ? "Signing out..." : "Sign out"}
                </button>
              </div>

              <div className="account-action-meta">{syncActionHint}</div>

              <div className="account-grid">
                <div className="meta-card">
                  <div className="meta-label">Last sync</div>
                  <div className="meta-value">{formatTimestamp(syncState.lastSyncedAt)}</div>
                </div>
                <div className="meta-card">
                  <div className="meta-label">Last import</div>
                  <div className="meta-value">{formatTimestamp(syncState.lastImportAt)}</div>
                </div>
                <div className="meta-card">
                  <div className="meta-label">Last export</div>
                  <div className="meta-value">{formatTimestamp(syncState.lastExportAt)}</div>
                </div>
                <div className="meta-card">
                  <div className="meta-label">Pending changes</div>
                  <div className="meta-value">{syncState.pendingChanges ? "Yes" : "No"}</div>
                </div>
              </div>

              <div className="scope-list">
                <div className="scope-item"><span className="scope-label">saved</span><span>Completed sessions and dates</span></div>
                <div className="scope-item"><span className="scope-label">saved</span><span>Notes, streak, and reminder settings</span></div>
                <div className="scope-item"><span className="scope-label">stays local</span><span>Notification permission stays with each device</span></div>
              </div>
            </>
          ) : (
            <>
              <div className="account-card">
                <div className="account-card-top">
                  <div>
                    <div className="account-name">Guest mode</div>
                    <div className="account-email">Progress stays on this device until you connect an account.</div>
                  </div>
                  <span className={`sync-pill sync-pill--${getSyncTone(auth, syncState)}`}>{getSyncLabel(auth, syncState)}</span>
                </div>
                <div className="account-card-copy">Sign in later to make your progress available on your other devices.</div>
              </div>

              {auth.error && (
                <div className="status-panel status-panel--warning">
                  <div className="status-panel-title">Authentication issue</div>
                  <div className="status-panel-copy">{auth.error}</div>
                </div>
              )}

              <div className="account-actions">
                <button className="action-btn action-btn--primary" onClick={handleSignIn} disabled={busy === "signin" || auth.status === "authenticating"}>
                  <CloudIcon />
                  {busy === "signin" || auth.status === "authenticating" ? "Opening sign-in..." : "Continue with Google"}
                </button>
              </div>

              <div className="scope-list">
                <div className="scope-item"><span className="scope-label">guest mode</span><span>Your progress stays available on this device</span></div>
                <div className="scope-item"><span className="scope-label">when you sign in</span><span>Your sessions, notes, and reminders follow your account</span></div>
                <div className="scope-item"><span className="scope-label">safe default</span><span>Backup and restore still work either way</span></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Header({ totalSessions, doneSessions, streak, auth, syncState, onBell, onExport, onImport, onAccount }) {
  const pct = totalSessions > 0 ? Math.round((doneSessions / totalSessions) * 100) : 0;
  const syncTone = getSyncTone(auth, syncState);
  const syncLabel = getSyncLabel(auth, syncState);

  return (
    <header className="sticky-header">
      <div className="header-inner">
        <div className="header-top">
          <div className="header-brand">
            <span className="brand-prompt">{">"}</span>
            <span className="brand-name">get.cracked</span>
            <span className="brand-cursor" aria-hidden="true">_</span>            <a
              className="github-link"
              href="https://github.com/josephden16/get-cracked"
              target="_blank"
              rel="noopener noreferrer"
              title="View on GitHub"
            >
              <GitHubIcon />
            </a>          </div>
          <div className="header-right">
            {streak > 0 && (
              <div className="streak-badge">
                <FireIcon />
                <span>{streak}d streak</span>
              </div>
            )}
            <button className={`sync-pill sync-pill--${syncTone} sync-pill-btn`} onClick={onAccount} title={syncState.message}>
              <CloudIcon />
              <span>{syncLabel}</span>
            </button>
            <button className="bell-btn" onClick={onImport} title="Import progress"><ImportIcon /></button>
            <button className="bell-btn" onClick={onExport} title="Export progress"><ExportIcon /></button>
            <button className="bell-btn" onClick={onBell} title="Reminder settings"><BellIcon /></button>
          </div>
        </div>
        <div className="progress-wrap">
          <div className="progress-bar"><div className="progress-fill" style={{ width: `${pct}%` }} /></div>
          <div className="progress-meta">
            <span>{doneSessions} of {totalSessions} sessions done</span>
            <span className="progress-pct">{pct}%</span>
          </div>
        </div>
      </div>
    </header>
  );
}

const UTILITY_FILTERS = [
  { id: "all", label: "All" },
  { id: "todo", label: "To do" },
  { id: "done", label: "Done" },
];

const PHASE_FILTERS = [
  { id: "p1", label: "Phase 1 — Foundations", color: "#30d158" },
  { id: "p2", label: "Phase 2 — Senior bridge", color: "#007aff" },
  { id: "p3", label: "Phase 3 — Systems depth", color: "#bf5af2" },
  { id: "p4", label: "Phase 4 — Staff-level skills", color: "#818cf8" },
];

const BASE_MILESTONES = [7, 14, 21, 30];

export default function App() {
  const {
    auth,
    buildExportPayload: createExportSnapshot,
    done,
    doneSessions,
    importProgress,
    markExport,
    nextSession,
    notes,
    notif,
    setNote,
    streakData,
    syncNow,
    syncState,
    toggle,
    totalSessions,
    updateNotif,
  } = useStore();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [showAccount, setShowAccount] = useState(false);
  const [toast, setToast] = useState(null);
  const prevDone = useRef(doneSessions);
  const pendingScroll = useRef(null);
  const dismissToast = () => setToast(null);

  useEffect(() => {
    if (pendingScroll.current === null) return;
    const targetIndex = pendingScroll.current;
    pendingScroll.current = null;
    const element = document.getElementById(`session-${targetIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [filter, search]);

  useEffect(() => {
    if (!notif.enabled || typeof Notification === "undefined" || Notification.permission !== "granted") return;

    const [hours, minutes] = notif.time.split(":").map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(hours, minutes, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);

    const timer = setTimeout(() => {
      const nextUp = ALL_SESSIONS.find((session) => !done[session.id]);
      new Notification("📚 Study time!", {
        body: nextUp ? `Next: ${nextUp.title}` : "All sessions complete! 🎉",
      });
    }, target - now);

    return () => clearTimeout(timer);
  }, [done, notif]);

  useEffect(() => {
    if (
      doneSessions > prevDone.current &&
      (BASE_MILESTONES.includes(doneSessions) || doneSessions === totalSessions)
    ) {
      const messages = {
        7: "7 sessions done. Momentum is real.",
        14: "14 sessions. Two weeks of consistency.",
        21: "21 sessions. This is a habit now.",
        30: "30 sessions. You are operating with intent.",
        [totalSessions]: `All ${totalSessions} sessions. Staff engineer mindset: unlocked.`,
      };
      setToast({ message: messages[doneSessions] });
    }
    prevDone.current = doneSessions;
  }, [doneSessions, totalSessions]);

  const handleToggle = (sessionId) => {
    const wasDone = Boolean(done[sessionId]);
    const session = ALL_SESSIONS.find((entry) => entry.id === sessionId);
    toggle(sessionId);

    if (!wasDone) {
      setToast({
        message: `"${session?.title || "Session"}" marked done`,
        undoFn: () => {
          toggle(sessionId);
          dismissToast();
        },
      });
    } else {
      dismissToast();
    }
  };

  const handleImport = useCallback((payload) => {
    const summary = importProgress(payload);
    const parts = [];
    if (summary.restoredDone > 0) parts.push(`${summary.restoredDone} sessions`);
    if (summary.restoredNotes > 0) parts.push(`${summary.restoredNotes} notes`);
    setToast({
      message: parts.length > 0 ? `Import applied — ${parts.join(" and ")} restored.` : "Import applied — no new progress to merge.",
    });
  }, [importProgress]);

  const handleExport = () => {
    const payload = createExportSnapshot();
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "get-cracked-progress.json";
    anchor.click();
    URL.revokeObjectURL(url);
    markExport(payload);
    setToast({
      message: `Export ready — ${payload.sessions.filter((session) => session.done).length} sessions captured.`,
    });
  };

  const phaseCounts = {};
  let countIndex = 0;
  for (const phase of PLAN) {
    let phaseTotal = 0;
    let phaseDone = 0;
    for (const week of phase.weeks) {
      for (let index = 0; index < week.days.length; index += 1) {
        const session = ALL_SESSIONS[countIndex + index];
        phaseTotal += 1;
        if (done[session.id]) phaseDone += 1;
      }
      countIndex += week.days.length;
    }
    phaseCounts[phase.phase] = { total: phaseTotal, done: phaseDone };
  }

  const q = search.trim().toLowerCase();
  const rendered = [];
  let globalIndex = 0;

  for (const phase of PLAN) {
    const colors = PHASE_COLORS[phase.phase];
    const phaseWeeks = [];

    for (const week of phase.weeks) {
      const weekStart = globalIndex;
      const visibleDays = week.days
        .map((_, offset) => {
          const session = ALL_SESSIONS[weekStart + offset];
          return {
            session,
            isDone: Boolean(done[session.id]),
          };
        })
        .filter(({ session, isDone }) => {
          if (filter === "todo" && isDone) return false;
          if (filter === "done" && !isDone) return false;
          if (["p1", "p2", "p3", "p4"].includes(filter) && phase.phase !== filter) return false;
          if (!q) return true;
          return `${session.title} ${session.task}`.toLowerCase().includes(q);
        });

      globalIndex += week.days.length;
      if (visibleDays.length > 0) phaseWeeks.push({ week, visibleDays });
    }

    if (phaseWeeks.length > 0) {
      rendered.push({
        colors,
        phase,
        phaseCount: phaseCounts[phase.phase],
        phaseWeeks,
      });
    }
  }

  return (
    <div className="app-root">
      <Header
        totalSessions={totalSessions}
        doneSessions={doneSessions}
        streak={streakData.streak}
        auth={auth}
        syncState={syncState}
        onBell={() => setShowNotif(true)}
        onExport={handleExport}
        onImport={() => setShowImport(true)}
        onAccount={() => setShowAccount(true)}
      />
      <main className="main-content">
        <div className="search-row">
          <div className="search-wrap">
            <span className="search-icon"><SearchIcon /></span>
            <input
              className="search-input"
              type="text"
              placeholder="Search sessions..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            {search && <button className="search-clear" onClick={() => setSearch("")}>✕</button>}
          </div>
        </div>

        <div className="filter-bar">
          <div className="filter-group">
            {UTILITY_FILTERS.map((entry) => (
              <button key={entry.id} className={`filter-btn${filter === entry.id ? " active" : ""}`} onClick={() => setFilter(entry.id)}>
                {entry.label}
              </button>
            ))}
          </div>
          <div className="filter-sep" />
          <div className="filter-group filter-group--phases">
            {PHASE_FILTERS.map((entry) => (
              <button
                key={entry.id}
                className={`filter-btn filter-btn--phase${filter === entry.id ? " active" : ""}`}
                style={filter === entry.id ? { color: entry.color, background: `${entry.color}1a`, borderColor: `${entry.color}40` } : {}}
                onClick={() => setFilter(entry.id)}
              >
                <span className="filter-dot" style={{ background: entry.color }} />
                {entry.label}
              </button>
            ))}
          </div>
        </div>

        {nextSession && (
          <TodayPin
            session={nextSession}
            onJump={() => {
              const element = document.getElementById(`session-${nextSession.globalIndex}`);
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
              } else {
                pendingScroll.current = nextSession.globalIndex;
                setFilter("all");
                setSearch("");
              }
            }}
          />
        )}

        {rendered.length === 0 && (
          <div className="empty-state">
            <div className="empty-title">
              {q ? "No sessions match your search." : filter === "done" ? "Nothing done yet." : "All sessions complete."}
            </div>
            <div className="empty-sub">
              {q ? "Try a different keyword." : filter === "done" ? "Complete a session and it will appear here." : "No remaining sessions in this view."}
            </div>
          </div>
        )}

        {rendered.map(({ phase, colors, phaseWeeks, phaseCount }) => (
          <div key={phase.phase} className="phase-block">
            <div className="phase-header">
              <span className="phase-badge" style={{ background: colors.bg, color: colors.badge }}>{phase.phase.toUpperCase()}</span>
              <span className="phase-title">{phase.phaseLabel}</span>
              <div className="phase-progress">
                <div className="phase-progress-top">
                  <span className="phase-sub">{phase.phaseSub}</span>
                  <span className="phase-count">{phaseCount.done}<span className="phase-count-total">/{phaseCount.total}</span></span>
                </div>
                <div className="phase-bar"><div className="phase-bar-fill" style={{ width: phaseCount.total > 0 ? `${(phaseCount.done / phaseCount.total) * 100}%` : "0%" }} /></div>
              </div>
            </div>

            {phaseWeeks.map(({ week, visibleDays }) => (
              <div key={`${phase.phase}-${week.week}`} className="week-block">
                <div className="week-header-static">
                  <span className="week-title">{week.week}</span>
                  <span className="week-sub">— {week.weekSub}</span>
                </div>
                <div className="week-days">
                  {visibleDays.map(({ session, isDone }) => (
                    <div id={`session-${session.globalIndex}`} key={session.id}>
                      <SessionCard
                        session={session}
                        isDone={isDone}
                        onToggle={handleToggle}
                        note={notes[session.id]?.text || ""}
                        onNoteChange={setNote}
                      />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}

        {doneSessions === totalSessions && totalSessions > 0 && (
          <div className="completion-banner">
            <div className="completion-title">Plan complete.</div>
            <div className="completion-sub">All {totalSessions} sessions done. Time to pick your next deep area.</div>
          </div>
        )}
      </main>

      {showNotif && (
        <NotifDrawer
          notif={notif}
          updateNotif={updateNotif}
          signedIn={auth.status === "authenticated"}
          onClose={() => setShowNotif(false)}
        />
      )}
      {showImport && <ImportDrawer onImport={handleImport} onClose={() => setShowImport(false)} />}
      {showAccount && <AccountDrawer auth={auth} syncState={syncState} onSyncNow={syncNow} onClose={() => setShowAccount(false)} />}
      {toast && <Toast message={toast.message} onUndo={toast.undoFn} onDismiss={dismissToast} />}
    </div>
  );
}