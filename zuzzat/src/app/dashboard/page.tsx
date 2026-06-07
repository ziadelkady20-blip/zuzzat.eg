"use client";
import { motion } from "framer-motion";
import StatCard from "@/components/ui/StatCard";

const bestSellers = [
  { name: "Ice Matcha Latte", count: 34, pct: 82, color: "#A4B55A", emoji: "🍵" },
  { name: "Mojito Passion", count: 28, pct: 68, color: "#1E3ABA", emoji: "🧃" },
  { name: "Ice Cold Brew", count: 22, pct: 54, color: "#F5A623", emoji: "☕" },
  { name: "Mango Frappe", count: 18, pct: 44, color: "#FF6B6B", emoji: "🥤" },
];

const weekRevenue = [7200, 9100, 6400, 10800, 8500, 12840, 9700];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxRev = Math.max(...weekRevenue);

const tableStatuses = [
  "available","occupied","occupied","reserved","available","occupied","occupied","available","occupied","available",
  "reserved","available","available","pickup","pickup"
];

export default function DashboardPage() {
  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-gray-800">Good morning! ☀️</h1>
        <p className="text-sm text-gray-400 mt-1 mb-6">Sunday, June 7, 2026 — Here&apos;s your ZUZZAT overview</p>
      </motion.div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard icon="💰" iconBg="#EEF1FF" value="12,840 EGP" label="Revenue Today" change="↑ 18% vs yesterday" changeType="up" />
        <StatCard icon="📋" iconBg="#FFF5E6" value="84" label="Orders Today" change="↑ 12 vs avg" changeType="up" />
        <StatCard icon="👥" iconBg="#F0F7E6" value="247" label="Active Customers" change="↑ 23 this week" changeType="up" />
        <StatCard icon="🛵" iconBg="#FFF0F0" value="19" label="Delivery Orders" change="↓ 3 vs avg" changeType="down" />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Revenue This Week</p>
          <div className="flex items-end gap-2 h-28">
            {weekRevenue.map((v, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full rounded-t-md transition-all" style={{ height: `${(v / maxRev) * 100}%`, background: i === 5 ? "#1E3ABA" : "#C7CFFE" }} />
                <span className={`text-[10px] ${i === 5 ? "text-[#1E3ABA] font-bold" : "text-gray-400"}`}>{weekDays[i]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Best Sellers Today</p>
          <div className="flex flex-col gap-3">
            {bestSellers.map((item) => (
              <div key={item.name} className="flex items-center gap-2.5">
                <span className="text-lg">{item.emoji}</span>
                <div className="flex-1">
                  <p className="text-xs font-semibold mb-1">{item.name}</p>
                  <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${item.pct}%`, background: item.color }} />
                  </div>
                </div>
                <span className="text-sm font-bold text-gray-800">{item.count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Payment Breakdown</p>
          {[{l:"💵 Cash",v:8240,pct:64,c:"#A4B55A"},{l:"📱 Vodafone Cash",v:3100,pct:24,c:"#FF6B6B"},{l:"💳 Instapay",v:1500,pct:12,c:"#1E3ABA"}].map((p)=>(
            <div key={p.l} className="mb-3">
              <div className="flex justify-between text-xs mb-1"><span>{p.l}</span><span className="font-bold">{p.v.toLocaleString()} EGP</span></div>
              <div className="h-1.5 bg-gray-100 rounded-full"><div className="h-full rounded-full" style={{width:`${p.pct}%`,background:p.c}}/></div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Active Tables</p>
          <div className="grid grid-cols-5 gap-1.5 mb-3">
            {tableStatuses.map((s, i) => {
              const colors: Record<string, string> = { available: "bg-green-50 text-green-700 border-green-200", occupied: "bg-red-50 text-red-500 border-red-200", reserved: "bg-orange-50 text-orange-600 border-orange-200", pickup: "bg-[#EEF1FF] text-[#1E3ABA] border-[#C7CFFE]" };
              return <div key={i} className={`aspect-square rounded-lg border flex items-center justify-center text-[11px] font-bold cursor-pointer ${colors[s]}`}>{i < 13 ? i + 1 : `P${i - 12}`}</div>;
            })}
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[10px] font-semibold bg-green-50 text-green-700 px-2 py-0.5 rounded-full">● 6 Available</span>
            <span className="text-[10px] font-semibold bg-red-50 text-red-500 px-2 py-0.5 rounded-full">● 5 Occupied</span>
            <span className="text-[10px] font-semibold bg-orange-50 text-orange-600 px-2 py-0.5 rounded-full">● 2 Reserved</span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Inventory Alerts</p>
          <div className="flex flex-col gap-2">
            {[{n:"🍵 Matcha Powder",l:"3 left",c:"orange"},{n:"🍋 Passion Fruit",l:"Critical!",c:"red"},{n:"🥛 Oat Milk",l:"5 left",c:"orange"},{n:"🧊 Ice Bags",l:"2 bags",c:"orange"}].map((a)=>(
              <div key={a.n} className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium ${a.c==="red"?"bg-red-50":"bg-orange-50"}`}>
                <span>{a.n}</span>
                <span className={`font-bold ${a.c==="red"?"text-red-500":"text-orange-600"}`}>{a.l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
