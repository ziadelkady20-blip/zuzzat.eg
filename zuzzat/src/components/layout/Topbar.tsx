"use client";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types";

const ROLE_LABELS: Record<Role, { label: string; icon: string }> = {
  superadmin: { label: "Super Admin", icon: "👑" },
  admin:      { label: "Admin",       icon: "🛠" },
  cashier:    { label: "Cashier",     icon: "💵" },
  kitchen:    { label: "Kitchen",     icon: "👨‍🍳" },
  inventory:  { label: "Inventory Manager", icon: "📦" },
  customer:   { label: "Customer",    icon: "🧑" },
};

export default function Topbar() {
  const { role } = useAuth();
  const [showNotif, setShowNotif] = useState(false);
  const currentRole = ROLE_LABELS[role];

  return (
    <header className="h-14 flex items-center px-5 gap-4 flex-shrink-0 shadow-md relative z-50" style={{ background: "#1E3ABA" }}>
      <div className="flex items-center gap-2.5">
        <svg width="32" height="32" viewBox="0 0 110 110" fill="none">
          <circle cx="55" cy="50" r="36" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2" />
          <ellipse cx="55" cy="51" rx="17" ry="19" fill="white" />
          <circle cx="48" cy="49" r="2.8" fill="#1E3ABA" />
          <circle cx="62" cy="49" r="2.8" fill="#1E3ABA" />
          <path d="M48 57 Q55 65 62 57" stroke="#1E3ABA" strokeWidth="2" fill="none" strokeLinecap="round" />
          <path d="M35 23 Q55 8 75 23 L73 34 Q55 24 37 34Z" fill="rgba(255,255,255,0.85)" />
        </svg>
        <span className="font-outfit font-black text-white text-2xl tracking-tight">ZUZZAT</span>
        <span className="text-white/40 text-xs font-normal">Platform</span>
      </div>

      <div className="ml-auto flex items-center gap-2.5">
        <button
          onClick={() => setShowNotif(!showNotif)}
          className="relative w-9 h-9 rounded-full flex items-center justify-center text-white transition-colors hover:bg-white/20"
        >
          🔔
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF6B6B] rounded-full border-2 border-[#1E3ABA]" />
        </button>

        <div className="flex items-center gap-2 bg-white/15 rounded-full py-1 pl-2 pr-3">
          <div className="w-6 h-6 rounded-full bg-white/30 flex items-center justify-center text-xs">{currentRole?.icon}</div>
          <span className="text-white text-sm font-medium">{currentRole?.label}</span>
        </div>
      </div>

      {/* Notifications */}
      {showNotif && (
        <div className="absolute top-16 right-4 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
          <div className="flex justify-between items-center px-4 py-3 border-b border-gray-100">
            <span className="font-bold text-sm">Notifications</span>
            <button className="text-[#1E3ABA] text-xs font-medium">Mark all read</button>
          </div>
          {[
            { color: "#FF6B6B", title: "New Order #142", sub: "Table 7 • Ice Matcha Latte x2", time: "2 min ago" },
            { color: "#F5A623", title: "Low Stock Alert", sub: "Matcha Powder — 3 portions left", time: "15 min ago" },
            { color: "#A4B55A", title: "Order #138 Delivered", sub: "Ahmed Mohamed • Nasr City", time: "28 min ago" },
            { color: "#1E3ABA", title: "Promo SUMMER25 expiring", sub: "Expires in 2 days — 89 uses", time: "1 hr ago" },
          ].map((n, i) => (
            <div key={i} className="flex gap-2.5 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 cursor-pointer">
              <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: n.color }} />
              <div><div className="text-sm font-semibold">{n.title}</div><div className="text-xs text-gray-400 mt-0.5">{n.sub}</div><div className="text-[10px] text-gray-400 mt-1">{n.time}</div></div>
            </div>
          ))}
        </div>
      )}

    </header>
  );
}
