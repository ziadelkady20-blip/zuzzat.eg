import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  updateProfile,
} from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "./config";
import { Role } from "@/types";

export async function loginUser(email: string, password: string) {
  const cred = await signInWithEmailAndPassword(auth, email, password);
  const snap = await getDoc(doc(db, "users", cred.user.uid));
  const data = snap.data();
  return { user: cred.user, role: (data?.role as Role) ?? "customer", name: data?.name ?? "" };
}

export async function registerCustomer(name: string, email: string, password: string, phone: string) {
  const cred = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(cred.user, { displayName: name });
  await setDoc(doc(db, "users", cred.user.uid), {
    name, email, phone, role: "customer",
    points: 0, orders: 0, totalSpend: 0,
    createdAt: serverTimestamp(),
  });
  return cred.user;
}

export async function logoutUser() {
  await signOut(auth);
}

export function onAuthChange(cb: (user: User | null) => void) {
  return onAuthStateChanged(auth, cb);
}

export async function getUserRole(uid: string): Promise<Role> {
  const snap = await getDoc(doc(db, "users", uid));
  return (snap.data()?.role as Role) ?? "customer";
}
