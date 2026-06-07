"use client";
import { useEffect, useState } from "react";
import { User } from "firebase/auth";
import { onAuthChange, getUserRole } from "@/lib/firebase/auth";
import { Role } from "@/types";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<Role>("customer");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthChange(async (u) => {
      setUser(u);
      if (u) {
        const r = await getUserRole(u.uid);
        setRole(r);
      } else {
        setRole("customer");
      }
      setLoading(false);
    });
    return () => unsub();
  }, []);

  return { user, role, loading };
}
