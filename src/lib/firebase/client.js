import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const requiredEntries = Object.entries(firebaseConfig);
const configured = requiredEntries.every(([, value]) => Boolean(value));
const missingKeys = requiredEntries
  .filter(([, value]) => !value)
  .map(([key]) => key);

let appInstance = null;
let authInstance = null;
let dbInstance = null;

function ensureFirebaseInstances() {
  if (!configured) return null;
  if (!appInstance) {
    appInstance = initializeApp(firebaseConfig);
    authInstance = getAuth(appInstance);
    dbInstance = getFirestore(appInstance);
  }
  return { app: appInstance, auth: authInstance, db: dbInstance };
}

export function getFirebaseConfigStatus() {
  return {
    configured,
    missingKeys,
  };
}

export function isFirebaseConfigured() {
  return configured;
}

export function getFirebaseAuthInstance() {
  return ensureFirebaseInstances()?.auth ?? null;
}

export function getFirestoreInstance() {
  return ensureFirebaseInstances()?.db ?? null;
}
