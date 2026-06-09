"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types";
import { ROLE_HOME_PATHS } from "@/lib/constants";
import ZuzzatLogo from "@/components/ui/ZuzzatLogo";

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
      router.push(ROLE_HOME_PATHS[role]);
    }
  }, [user, role, loading, allowedRoles, router]);

  if (loading) return (
    <div className="fixed inset-0 bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <ZuzzatLogo size={60} />
        <div className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#1E3ABA] rounded-full animate-pulse w-full"/>
        </div>
      </div>
    </div>
  );

  if (!user || (allowedRoles && !allowedRoles.includes(role))) return null;
  return <>{children}</>;
}
