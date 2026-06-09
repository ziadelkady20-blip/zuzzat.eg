import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
  AuthError,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";
import { Role } from "@/types";

const AUTH_ERROR_MESSAGES: Record<string, string> = {
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/user-disabled": "This account has been disabled. Contact support.",
  "auth/user-not-found": "No account found with this email.",
  "auth/wrong-password": "Incorrect password. Please try again.",
  "auth/invalid-credential": "Invalid email or password.",
  "auth/email-already-in-use": "An account with this email already exists.",
  "auth/weak-password": "Password is too weak. Use at least 6 characters.",
  "auth/operation-not-allowed": "This sign-in method is not enabled.",
  "auth/too-many-requests": "Too many attempts. Please try again later.",
  "auth/network-request-failed": "Network error. Check your connection and try again.",
};

function getAuthErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "code" in error &&
    typeof (error as AuthError).code === "string"
  ) {
    return AUTH_ERROR_MESSAGES[(error as AuthError).code] ?? "An unexpected error occurred. Please try again.";
  }
  return "An unexpected error occurred. Please try again.";
}

export { getAuthErrorMessage };

export async function loginUser(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const snap = await getDoc(doc(db, "users", cred.user.uid));
  const data = snap.data();
  return { user: cred.user, role: (data?.role as Role) ?? "customer", name: data?.name ?? "" };
}

export async function registerCustomer(name: string, email: string, password: string, phone: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  try {
    await updateProfile(cred.user, { displayName: name });
  } catch (profileError) {
    console.error("[Auth] Failed to set display name after registration:", profileError);
  }
  try {
    await setDoc(doc(db, "users", cred.user.uid), {
      name, email, phone, role: "customer",
      points: 0, orders: 0, totalSpend: 0,
      createdAt: serverTimestamp(),
    });
  } catch (firestoreError) {
    console.error("[Auth] Failed to create user profile in Firestore:", firestoreError);
    throw new Error(
      "Account created but profile setup failed. Please contact support."
    );
  }
  return cred.user;
}

export async function logoutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("[Auth] Sign-out failed:", error);
    throw error;
  }
}

export function onAuthChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

export async function getUserRole(uid: string): Promise<Role> {
  const snap = await getDoc(doc(db, "users", uid));
  if (!snap.exists()) {
    console.warn(`[Auth] No user document found for uid: ${uid}, defaulting to "customer".`);
  }
  return (snap.data()?.role as Role) ?? "customer";
}
