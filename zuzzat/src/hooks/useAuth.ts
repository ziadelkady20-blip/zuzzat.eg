"use client";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthChange, getUserRole } from "@/lib/firebase/auth";
import { Role } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>("customer");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      setUser(u);
      setError(null);
      if (u) {
        try {
          const r = await getUserRole(u.uid);
          setRole(r);
        } catch (err) {
          console.error("[useAuth] Failed to fetch user role:", err);
          setRole("customer");
          setError("Failed to load user role. Using default permissions.");
        }
      } else {
        setRole("customer");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, role, loading, error };
}
