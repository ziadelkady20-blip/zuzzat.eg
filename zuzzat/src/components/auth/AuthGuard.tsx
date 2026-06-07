"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types";

const ROLE_REDIRECTS: Record<Role, string> = {
  superadmin: "/dashboard",
  admin: "/dashboard",
  cashier: "/pos",
  kitchen: "/kds",
  inventory: "/inventory",
  customer: "/(customer)/home",
};

interface Props {
  children: React.ReactNode;
  allowedRoles?: Role[];
}

export default function AuthGuard({ children, allowedRoles }: Props) {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) { router.push("/login"); return; }
    if (allowedRoles && !allowedRoles.includes(role)) {
      router.push(ROLE_REDIRECTS[role]);
    }
  }, [user, role, loading, allowedRoles, router]);

  if (loading) return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <svg width="60" height="60" viewBox="0 0 110 110" fill="none">
          <circle cx="55" cy="50" r="36" fill="#EEF1FF" stroke="#1E3ABA" strokeWidth="2.5"/>
          <ellipse cx="55" cy="51" rx="17" ry="19" fill="white" stroke="#1E3ABA" strokeWidth="2"/>
          <circle cx="48" cy="49" r="2.8" fill="#1E3ABA"/><circle cx="62" cy="49" r="2.8" fill="#1E3ABA"/>
          <path d="M48 57 Q55 65 62 57" stroke="#1E3ABA" strokeWidth="2" fill="none" strokeLinecap="round"/>
          <path d="M35 23 Q55 8 75 23 L73 34 Q55 24 37 34Z" fill="#1E3ABA"/>
        </svg>
        <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#1E3ABA] rounded-full animate-pulse w-full"/>
        </div>
      </div>
    </div>
  );

  if (!user || (allowedRoles && !allowedRoles.includes(role))) return null;
  return <>{children}</>;
}
