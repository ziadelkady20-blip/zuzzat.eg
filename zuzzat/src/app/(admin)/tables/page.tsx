"use client";
import { useState } from "react";
import { TABLES } from "@/lib/data";
import { TABLE_STATUS_STYLES, TABLE_STATUS_ICONS } from "@/lib/constants";
import { motion } from "framer-motion";

export default function TablesPage() {
  const [tables, setTables] = useState(TABLES);
  const toggle = (id: number) => {
    setTables(ts => ts.map(t => t.id === id ? { ...t, status: t.status === "available" ? "occupied" : "available" } : t));
  };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Table Manager</h1>
      <p className="text-sm text-gray-400 mb-4">ZUZZAT Cafe — Floor Layout</p>
      <div className="flex gap-3 mb-5">
        {["available","occupied","reserved","pickup"].map(s => (
          <span key={s} className={`text-xs font-semibold px-3 py-1 rounded-full border ${TABLE_STATUS_STYLES[s]}`}>
            ● {s.charAt(0).toUpperCase()+s.slice(1)} ({tables.filter(t=>t.status===s).length})
          </span>
        ))}
      </div>
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <div className="grid grid-cols-5 gap-3">
          {tables.map(t => (
            <motion.div key={t.id} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} onClick={() => toggle(t.id)}
              className={`aspect-square rounded-xl border-2 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors ${TABLE_STATUS_STYLES[t.status]}`}>
              <span className="text-xl">{TABLE_STATUS_ICONS[t.status]}</span>
              <span className="font-bold text-sm">{t.label.replace("Table ", "")}</span>
              <span className="text-[9px] opacity-70">{t.status === "occupied" && t.orderId ? t.orderId : t.seats > 0 ? `${t.seats} seats` : t.status}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
