import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { TRACKER_SCHEMA_VERSION, hydrateTrackerState } from "../trackerState";
import { getFirestoreInstance, isFirebaseConfigured } from "./client";

function getUserDoc(db, uid, ...path) {
  return doc(db, "users", uid, ...path);
}

function toSerializableState(state) {
  const hydrated = hydrateTrackerState(state);
  return {
    schemaVersion: TRACKER_SCHEMA_VERSION,
    done: hydrated.done,
    notes: hydrated.notes,
    streak: hydrated.streak,
  };
}

export async function loadRemoteTrackerState(uid) {
  if (!isFirebaseConfigured()) return null;

  const db = getFirestoreInstance();
  const [progressSnapshot, prefsSnapshot] = await Promise.all([
    getDoc(getUserDoc(db, uid, "progress", "state")),
    getDoc(getUserDoc(db, uid, "preferences", "ui")),
  ]);

  if (!progressSnapshot.exists() && !prefsSnapshot.exists()) {
    return null;
  }

  return hydrateTrackerState({
    done: progressSnapshot.data()?.done || {},
    notes: progressSnapshot.data()?.notes || {},
    streak: progressSnapshot.data()?.streak || null,
    notif: prefsSnapshot.data()?.reminder || null,
  });
}

export async function saveRemoteTrackerState(uid, state) {
  if (!isFirebaseConfigured()) return;

  const db = getFirestoreInstance();
  const hydrated = hydrateTrackerState(state);
  const serializableState = toSerializableState(hydrated);

  await Promise.all([
    setDoc(
      getUserDoc(db, uid, "progress", "state"),
      {
        ...serializableState,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    ),
    setDoc(
      getUserDoc(db, uid, "preferences", "ui"),
      {
        reminder: hydrated.notif,
        updatedAt: serverTimestamp(),
      },
      { merge: true },
    ),
  ]);
}

export async function recordImportExportEvent(uid, event) {
  if (!isFirebaseConfigured()) return;

  const db = getFirestoreInstance();
  await addDoc(
    collection(db, "users", uid, "activity", "importExport", "events"),
    {
      ...event,
      createdAt: serverTimestamp(),
    },
  );
}
