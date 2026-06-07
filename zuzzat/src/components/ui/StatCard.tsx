"use client";
import { motion } from "framer-motion";

interface Props {
  icon: string;
  iconBg: string;
  value: string;
  label: string;
  change?: string;
  changeType?: "up" | "down";
}

export default function StatCard({ icon, iconBg, value, label, change, changeType }: Props) {
  return (
    <motion.div whileHover={{ y: -2 }} className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm transition-shadow hover:shadow-md">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl mb-3" style={{ background: iconBg }}>{icon}</div>
      <div className="text-2xl font-bold text-gray-800 font-outfit">{value}</div>
      <div className="text-xs text-gray-400 font-medium mt-1">{label}</div>
      {change && <div className={`text-xs font-semibold mt-1.5 ${changeType === "up" ? "text-green-500" : "text-red-400"}`}>{change}</div>}
    </motion.div>
  );
}
