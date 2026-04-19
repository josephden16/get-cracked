import { useState, useEffect, useCallback } from "react";
import { PLAN } from "./planData";

const STORAGE_KEY = "staff_plan_done_v2";
const STREAK_KEY = "staff_plan_streak_v1";
const NOTIF_KEY = "staff_plan_notif_v1";
const NOTES_KEY = "staff_plan_notes_v1";

// Flat list of all session IDs in order
export function getAllSessions() {
  const sessions = [];
  PLAN.forEach((phase) => {
    phase.weeks.forEach((week) => {
      week.days.forEach((day) => {
        sessions.push({ ...day, phase: phase.phase });
      });
    });
  });
  return sessions;
}

function loadDone() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}

function loadStreak() {
  try {
    return JSON.parse(
      localStorage.getItem(STREAK_KEY) || '{"streak":0,"lastDate":null}',
    );
  } catch {
    return { streak: 0, lastDate: null };
  }
}

function loadNotif() {
  try {
    return JSON.parse(
      localStorage.getItem(NOTIF_KEY) || '{"enabled":false,"time":"09:00"}',
    );
  } catch {
    return { enabled: false, time: "09:00" };
  }
}

function loadNotes() {
  try {
    return JSON.parse(localStorage.getItem(NOTES_KEY) || "{}");
  } catch {
    return {};
  }
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

export function useStore() {
  const [done, setDone] = useState(loadDone);
  const [streakData, setStreakData] = useState(loadStreak);
  const [notif, setNotif] = useState(loadNotif);
  const [notes, setNotesState] = useState(loadNotes);

  const setNote = useCallback((idx, text) => {
    setNotesState((prev) => {
      const next = { ...prev };
      if (text.trim()) next[idx] = text;
      else delete next[idx];
      localStorage.setItem(NOTES_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  const totalSessions = getAllSessions().length;
  const doneSessions = Object.keys(done).length;

  // Toggle a session done/undone by its global index
  const toggle = useCallback((id) => {
    setDone((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = todayStr();
      }
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));

      // Update streak
      const today = todayStr();
      setStreakData((s) => {
        let newStreak = s.streak;
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().slice(0, 10);

        if (!next[id]) {
          // unchecked — only recompute if needed
          return s;
        }

        if (s.lastDate === today) {
          // already counted today
          return s;
        } else if (s.lastDate === yesterdayStr) {
          newStreak = s.streak + 1;
        } else {
          newStreak = 1;
        }
        const updated = { streak: newStreak, lastDate: today };
        localStorage.setItem(STREAK_KEY, JSON.stringify(updated));
        return updated;
      });

      return next;
    });
  }, []);

  const updateNotif = useCallback((patch) => {
    setNotif((prev) => {
      const next = { ...prev, ...patch };
      localStorage.setItem(NOTIF_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // Bulk-merge done sessions from an import (preserves existing, adds new)
  const importDone = useCallback((doneMap) => {
    setDone((prev) => {
      const next = { ...prev };
      Object.entries(doneMap).forEach(([idx, date]) => {
        if (!next[idx]) next[idx] = date;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }, []);

  // Next undone session (global index)
  const sessions = getAllSessions();
  const nextSession = sessions.find((_, i) => !done[i]);

  return {
    done,
    toggle,
    importDone,
    totalSessions,
    doneSessions,
    streakData,
    notif,
    updateNotif,
    nextSession,
    notes,
    setNote,
  };
}
