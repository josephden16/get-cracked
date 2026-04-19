import {
  GoogleAuthProvider,
  browserLocalPersistence,
  setPersistence,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { getFirebaseAuthInstance, isFirebaseConfigured } from "./client";

let persistencePromise = null;

export async function prepareFirebaseAuth() {
  if (!isFirebaseConfigured()) return null;
  if (!persistencePromise) {
    const auth = getFirebaseAuthInstance();
    persistencePromise = setPersistence(auth, browserLocalPersistence).then(
      () => auth,
    );
  }
  return persistencePromise;
}

export async function signInWithGoogle() {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured.");
  }

  const auth = await prepareFirebaseAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });
  return signInWithPopup(auth, provider);
}

export async function signOutFromFirebase() {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured.");
  }

  const auth = await prepareFirebaseAuth();
  return signOut(auth);
}
