import { useState, useEffect, useRef, useCallback } from "react";
import { PLAN, PHASE_COLORS, TAG_COLORS } from "./planData";
import { useStore, getAllSessions } from "./useStore";
import "./App.css";

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
      <path d="M8 1h3v3" /><path d="M11 1L6 6" />
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
function ChevronIcon({ open }) {
  return (
    <svg width="11" height="11" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
      style={{ transform: open ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.2s ease" }}>
      <polyline points="4,2 9,6 4,10" />
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

function SessionCard({ day, globalIdx, isDone, onToggle, note, onNoteChange }) {
  const [expanded, setExpanded] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [animating, setAnimating] = useState(false);
  const [savedFlash, setSavedFlash] = useState(false);
  const tagStyle = TAG_COLORS[day.tag];
  const textareaRef = useRef(null);
  const saveTimerRef = useRef(null);

  const handleToggle = () => {
    if (!isDone) { setAnimating(true); setTimeout(() => setAnimating(false), 280); }
    onToggle(globalIdx);
  };

  // Auto-resize textarea whenever note changes or panel opens
  useEffect(() => {
    if (!textareaRef.current || !showNotes) return;
    const el = textareaRef.current;
    el.style.height = "auto";
    el.style.height = Math.max(80, el.scrollHeight) + "px";
  }, [note, showNotes]);

  const handleNoteChange = (e) => {
    onNoteChange(globalIdx, e.target.value);
    clearTimeout(saveTimerRef.current);
    setSavedFlash(false);
    saveTimerRef.current = setTimeout(() => {
      setSavedFlash(true);
      setTimeout(() => setSavedFlash(false), 1800);
    }, 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") { e.stopPropagation(); setShowNotes(false); }
  };

  const wordCount = note ? note.trim().split(/\s+/).filter(Boolean).length : 0;

  return (
    <div className={"session-card" + (isDone ? " done" : "") + (showNotes ? " notes-open" : "")}>
      <div className="session-card-main">
        <button
          className={"check-btn" + (isDone ? " checked" : "") + (animating ? " pop" : "")}
          aria-label={isDone ? "Mark undone" : "Mark done"}
          onClick={handleToggle}
        >
          {isDone && <CheckIcon />}
        </button>
        <div className="session-content">
          <div className="session-title">{day.title}</div>
          <div className="session-task">{day.task}</div>
          {note && !showNotes && (
            <div className="note-preview" onClick={(e) => { e.stopPropagation(); setShowNotes(true); }}>
              <NotesIcon /><span>{note}</span>
            </div>
          )}
          <div className="session-footer">
            <span className="tag" style={{ background: tagStyle.bg, color: tagStyle.color }}>{day.tag}</span>
            {day.links?.length > 0 && (
              <button className="links-toggle" onClick={(e) => { e.stopPropagation(); setExpanded(p => !p); }}>
                <LinkIcon />
                {expanded ? "hide links" : day.links.length + " resources"}
              </button>
            )}
            <button
              className={"links-toggle notes-toggle" + (note ? " has-note" : "") + (showNotes ? " open" : "")}
              onClick={(e) => { e.stopPropagation(); setShowNotes(p => !p); }}
            >
              <NotesIcon />
              {showNotes ? "close note" : (note ? "note ✎" : "note")}
            </button>
          </div>
        </div>
      </div>
      {expanded && (
        <div className="links-panel">
          {day.links.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="resource-link">
              <LinkIcon />{link.label}
            </a>
          ))}
        </div>
      )}
      {showNotes && (
        <div className="notes-panel" onClick={(e) => e.stopPropagation()}>
          <div className="notes-panel-header">
            <span className="notes-panel-label"><NotesIcon /> session note</span>
            <div className="notes-panel-actions">
              <span className={"notes-saved" + (savedFlash ? " visible" : "")}>saved</span>
              {note && (
                <button className="notes-action-btn" onClick={() => { onNoteChange(globalIdx, ""); setSavedFlash(false); }}>
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

function TodayPin({ session, globalIdx, onJump }) {
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
    const t = setTimeout(onDismiss, 5000);
    return () => clearTimeout(t);
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
  const [parsed, setParsed] = useState(null); // { sessions, exportedAt } from file
  const [error, setError] = useState(null);
  const fileRef = useRef(null);

  const readFile = (file) => {
    if (!file || !file.name.endsWith(".json")) {
      setError("Please drop a .json file exported from get.cracked.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
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

  const doneCount = parsed ? parsed.sessions.filter(s => s.done).length : 0;
  const noteCount = parsed ? parsed.sessions.filter(s => s.note).length : 0;
  const exportedDate = parsed?.exportedAt ? new Date(parsed.exportedAt).toLocaleDateString(undefined, { dateStyle: "medium" }) : null;

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <span>Import progress</span>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">
          {!parsed ? (
            <>
              <div
                className={"import-drop-zone" + (dragOver ? " drag-over" : "")}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={e => { e.preventDefault(); setDragOver(false); readFile(e.dataTransfer.files[0]); }}
                onClick={() => fileRef.current?.click()}
              >
                <div className="import-drop-icon"><ImportIcon /></div>
                <div className="import-drop-title">Drop your export file here</div>
                <div className="import-drop-sub">or click to browse — .json files only</div>
                <input ref={fileRef} type="file" accept=".json" style={{ display: "none" }} onChange={e => readFile(e.target.files[0])} />
              </div>
              {error && <div className="import-error">{error}</div>}
              <div className="import-hint">This will merge completed sessions and notes from your backup into the current state. Nothing will be un-done.</div>
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
              <div className="import-hint">Completed sessions and notes will be merged in. Sessions already marked done here won't be affected.</div>
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

function NotifDrawer({ notif, updateNotif, onClose }) {
  const [perm, setPerm] = useState(() => "Notification" in window ? Notification.permission : "denied");

  const request = async () => {
    const res = await Notification.requestPermission();
    setPerm(res);
    if (res === "granted") updateNotif({ enabled: true });
  };

  const toggle = () => {
    if (!notif.enabled && perm !== "granted") { request(); return; }
    updateNotif({ enabled: !notif.enabled });
  };

  const test = () => {
    if (perm === "granted") new Notification("📚 Study reminder", { body: "It's time to study!" });
  };

  return (
    <div className="drawer-overlay" onClick={onClose}>
      <div className="drawer" onClick={e => e.stopPropagation()}>
        <div className="drawer-header">
          <span>Reminder settings</span>
          <button className="drawer-close" onClick={onClose}>✕</button>
        </div>
        <div className="drawer-body">
          <div className="setting-row">
            <div>
              <div className="setting-label">Daily reminder</div>
              <div className="setting-desc">{perm === "denied" ? "Notifications blocked in browser settings." : "Nudge yourself at a set time each day."}</div>
            </div>
            <button className={"toggle-btn" + (notif.enabled ? " on" : "")} onClick={toggle} disabled={perm === "denied"}>
              <span className="toggle-thumb" />
            </button>
          </div>
          <div className="setting-row">
            <div>
              <div className="setting-label">Reminder time</div>
              <div className="setting-desc">When should we ping you?</div>
            </div>
            <input type="time" className="time-input" value={notif.time} onChange={e => updateNotif({ time: e.target.value })} />
          </div>
          <button className="test-btn" onClick={test} disabled={perm !== "granted"}>Send test notification</button>
        </div>
      </div>
    </div>
  );
}

function Header({ totalSessions, doneSessions, streak, onBell, onExport, onImport }) {
  const pct = totalSessions > 0 ? Math.round((doneSessions / totalSessions) * 100) : 0;
  return (
    <header className="sticky-header">
      <div className="header-inner">
        <div className="header-top">
          <div className="header-brand">
            <span className="brand-prompt">{">"}</span>
            <span className="brand-name">get.cracked</span>
          </div>
          <div className="header-right">
            {streak > 0 && (
              <div className="streak-badge">
                <FireIcon /><span>{streak}d streak</span>
              </div>
            )}
            <button className="bell-btn" onClick={onImport} title="Import progress"><ImportIcon /></button>
            <button className="bell-btn" onClick={onExport} title="Export progress"><ExportIcon /></button>
            <button className="bell-btn" onClick={onBell} title="Reminder settings"><BellIcon /></button>
          </div>
        </div>
        <div className="progress-wrap">
          <div className="progress-bar"><div className="progress-fill" style={{ width: pct + "%" }} /></div>
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
  const { done, toggle, importDone, totalSessions, doneSessions, streakData, notif, updateNotif, notes, setNote, nextSession } = useStore();
  const MILESTONES = [...BASE_MILESTONES, totalSessions];
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [toast, setToast] = useState(null); // { message, undoFn? }
  const prevDone = useRef(doneSessions);
  const pendingScroll = useRef(null);
  const dismissToast = () => setToast(null);

  // Scroll to session after filter/search reset
  useEffect(() => {
    if (pendingScroll.current === null) return;
    const idx = pendingScroll.current;
    pendingScroll.current = null;
    const el = document.getElementById("session-" + idx);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [filter, search]);

  // Notification scheduling
  useEffect(() => {
    if (!notif.enabled || Notification?.permission !== "granted") return;
    const [h, m] = notif.time.split(":").map(Number);
    const now = new Date();
    const target = new Date();
    target.setHours(h, m, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 1);
    const ms = target - now;
    const timer = setTimeout(() => {
      const sessions = getAllSessions();
      const next = sessions.find((_, i) => !done[i]);
      new Notification("📚 Study time!", { body: next ? "Next: " + next.title : "All sessions complete! 🎉" });
    }, ms);
    return () => clearTimeout(timer);
  }, [notif, done]);

  // Streak milestone toasts
  useEffect(() => {
    if (doneSessions > prevDone.current) {
      if (MILESTONES.includes(doneSessions)) {
        const msgs = { 7: "7 sessions done 🔥 You're building momentum.", 14: "14 sessions. Two weeks of consistency.", 21: "21 sessions. This is a habit now.", 30: "30 sessions. You're in the top 1%.", [totalSessions]: `All ${totalSessions} sessions. Staff engineer mindset: unlocked.` };
        setToast({ message: msgs[doneSessions] });
      }
    }
    prevDone.current = doneSessions;
  }, [doneSessions]);

  // Toggle with undo
  const handleToggle = (idx) => {
    const wasDone = !!done[idx];
    const sessions = getAllSessions();
    const title = sessions[idx]?.title || "Session";
    toggle(idx);
    if (!wasDone) {
      setToast({
        message: `"${title}" marked done`,
        undoFn: () => { toggle(idx); dismissToast(); },
      });
    } else {
      dismissToast();
    }
  };

  // Import progress
  const handleImport = useCallback((data) => {
    const sessions = getAllSessions();
    // Build a done-map from the import file
    const doneMap = {};
    data.sessions.forEach(s => {
      if (s.done && s.index >= 0 && s.index < sessions.length) {
        doneMap[s.index] = s.doneDate || new Date().toISOString().slice(0, 10);
      }
    });
    importDone(doneMap);
    // Merge notes (only fill gaps, don't overwrite existing)
    data.sessions.forEach(s => {
      if (s.note && s.index >= 0 && s.index < sessions.length) {
        setNote(s.index, s.note);
      }
    });
    const count = Object.keys(doneMap).length;
    setToast({ message: `Import applied — ${count} sessions restored.` });
  }, [importDone, setNote]);

  // Export progress
  const handleExport = () => {
    const sessions = getAllSessions();
    const data = sessions.map((s, i) => ({
      index: i,
      title: s.title,
      phase: s.phase,
      tag: s.tag,
      done: !!done[i],
      doneDate: done[i] || null,
      note: notes[i] || null,
    }));
    const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), sessions: data }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = "get-cracked-progress.json"; a.click();
    URL.revokeObjectURL(url);
  };

  // Pre-compute per-phase done/total counts
  const phaseCounts = {};
  let countIdx = 0;
  for (const phase of PLAN) {
    let phTotal = 0, phDone = 0;
    for (const week of phase.weeks) {
      for (let i = 0; i < week.days.length; i++) { phTotal++; if (done[countIdx + i]) phDone++; }
      countIdx += week.days.length;
    }
    phaseCounts[phase.phase] = { total: phTotal, done: phDone };
  }

  // Find global index of nextSession
  const allSessions = getAllSessions();
  const nextIdx = allSessions.findIndex((_, i) => !done[i]);

  // Build filtered view
  const q = search.trim().toLowerCase();
  const rendered = [];
  let gIdx = 0;
  for (const phase of PLAN) {
    const colors = PHASE_COLORS[phase.phase];
    const phaseWeeks = [];
    for (const week of phase.weeks) {
      const wStart = gIdx;
      const visibleDays = week.days.map((day, i) => ({ day, gIdx: wStart + i, isDone: !!done[wStart + i] }))
        .filter(entry => {
          if (filter === "todo") { if (entry.isDone) return false; }
          else if (filter === "done") { if (!entry.isDone) return false; }
          else if (filter === "p1" || filter === "p2" || filter === "p3" || filter === "p4") { if (phase.phase !== filter) return false; }
          if (q) return entry.day.title.toLowerCase().includes(q) || entry.day.task.toLowerCase().includes(q);
          return true;
        });
      gIdx += week.days.length;
      if (visibleDays.length > 0) phaseWeeks.push({ week, wStart, visibleDays });
    }
    if (phaseWeeks.length > 0) {
      rendered.push({ phase, colors, phaseWeeks, phaseCount: phaseCounts[phase.phase] });
    }
  }

  return (
    <div className="app-root">
      <Header totalSessions={totalSessions} doneSessions={doneSessions} streak={streakData.streak} onBell={() => setShowNotif(true)} onExport={handleExport} onImport={() => setShowImport(true)} />
      <main className="main-content">

        {/* Search */}
        <div className="search-row">
          <div className="search-wrap">
            <span className="search-icon"><SearchIcon /></span>
            <input
              className="search-input"
              type="text"
              placeholder="Search sessions..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            {search && <button className="search-clear" onClick={() => setSearch("")}>✕</button>}
          </div>
        </div>

        {/* Filters */}
        <div className="filter-bar">
          <div className="filter-group">
            {UTILITY_FILTERS.map(f => (
              <button key={f.id} className={"filter-btn" + (filter === f.id ? " active" : "")} onClick={() => setFilter(f.id)}>{f.label}</button>
            ))}
          </div>
          <div className="filter-sep" />
          <div className="filter-group filter-group--phases">
            {PHASE_FILTERS.map(f => (
              <button
                key={f.id}
                className={"filter-btn filter-btn--phase" + (filter === f.id ? " active" : "")}
                style={filter === f.id ? { color: f.color, background: f.color + "1a", borderColor: f.color + "40" } : {}}
                onClick={() => setFilter(f.id)}
              >
                <span className="filter-dot" style={{ background: f.color }} />
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Today's pin — always visible when there's a next session */}
        {nextIdx !== -1 && (
          <TodayPin
            session={allSessions[nextIdx]}
            globalIdx={nextIdx}
            onJump={() => {
              const el = document.getElementById("session-" + nextIdx);
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              } else {
                // Session is filtered out — reset view then scroll
                pendingScroll.current = nextIdx;
                setFilter("all");
                setSearch("");
              }
            }}
          />
        )}

        {/* Empty state */}
        {rendered.length === 0 && (
          <div className="empty-state">
            <div className="empty-title">
              {q ? "No sessions match your search." : filter === "done" ? "Nothing done yet." : "All sessions complete."}
            </div>
            <div className="empty-sub">
              {q ? "Try a different keyword." : filter === "done" ? "Complete a session and it'll appear here." : "No remaining sessions in this view."}
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
                <div className="phase-bar"><div className="phase-bar-fill" style={{ width: phaseCount.total > 0 ? (phaseCount.done / phaseCount.total * 100) + "%" : "0%" }} /></div>
              </div>
            </div>
            {phaseWeeks.map(({ week, wStart, visibleDays }, wi) => (
              <div key={wi} className="week-block">
                <div className="week-header-static">
                  <span className="week-title">{week.week}</span>
                  <span className="week-sub">— {week.weekSub}</span>
                </div>
                <div className="week-days">
                  {visibleDays.map(({ day, gIdx: idx, isDone }) => (
                    <div id={"session-" + idx} key={idx}><SessionCard day={day} globalIdx={idx} isDone={isDone} onToggle={handleToggle} note={notes[idx]} onNoteChange={setNote} /></div>
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

      {showNotif && <NotifDrawer notif={notif} updateNotif={updateNotif} onClose={() => setShowNotif(false)} />}
      {showImport && <ImportDrawer onImport={handleImport} onClose={() => setShowImport(false)} />}
      {toast && <Toast message={toast.message} onUndo={toast.undoFn} onDismiss={dismissToast} />}
    </div>
  );
}
