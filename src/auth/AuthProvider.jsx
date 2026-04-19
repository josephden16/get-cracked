import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { AuthContext } from "./auth-context";
import { getFirebaseAuthInstance, getFirebaseConfigStatus } from "../lib/firebase/client";
import {
  prepareFirebaseAuth,
  signInWithGoogle,
  signOutFromFirebase,
} from "../lib/firebase/auth";

function normalizeAuthError(error) {
  if (!error) return null;
  if (error.code === "auth/popup-closed-by-user") {
    return "The Google sign-in popup was closed before authentication finished.";
  }
  if (error.code === "auth/popup-blocked") {
    return "The Google sign-in popup was blocked by the browser.";
  }
  return error.message || "Authentication failed.";
}

export function AuthProvider({ children }) {
  const configStatus = getFirebaseConfigStatus();
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(configStatus.configured ? "loading" : "unavailable");
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!configStatus.configured) {
      return undefined;
    }

    let unsubscribe = () => {};
    let cancelled = false;

    void prepareFirebaseAuth()
      .then((auth) => {
        if (!auth || cancelled) return;
        unsubscribe = onAuthStateChanged(
          getFirebaseAuthInstance(),
          (nextUser) => {
            setUser(nextUser);
            setStatus(nextUser ? "authenticated" : "guest");
            setError(null);
          },
          (nextError) => {
            setStatus("error");
            setError(normalizeAuthError(nextError));
          },
        );
      })
      .catch((nextError) => {
        if (cancelled) return;
        setStatus("error");
        setError(normalizeAuthError(nextError));
      });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [configStatus.configured]);

  const value = {
    configured: configStatus.configured,
    error,
    missingKeys: configStatus.missingKeys,
    signIn: async () => {
      if (!configStatus.configured) return false;
      try {
        setStatus("authenticating");
        setError(null);
        await signInWithGoogle();
        return true;
      } catch (nextError) {
        setStatus(user ? "authenticated" : "guest");
        setError(normalizeAuthError(nextError));
        return false;
      }
    },
    signOut: async () => {
      if (!configStatus.configured) return false;
      try {
        await signOutFromFirebase();
        return true;
      } catch (nextError) {
        setError(normalizeAuthError(nextError));
        return false;
      }
    },
    status,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}