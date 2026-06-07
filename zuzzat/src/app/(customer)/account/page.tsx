"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

const MOCK_ORDERS = [
  { id:"#142", date:"Today 14:32", items:"Ice Matcha Latte ×2, Mojito ×1", total:195, status:"Preparing" },
  { id:"#130", date:"Yesterday 18:10", items:"Cold Brew ×1, Oreo Frappe ×1", total:125, status:"Delivered" },
  { id:"#112", date:"Jun 4, 2026", items:"Passion Mojito ×2", total:110, status:"Delivered" },
];

export default function AccountPage() {
  const [tab, setTab] = useState<"orders"|"points"|"profile">("orders");
  return (
    <div className="max-w-2xl mx-auto px-6 py-12" style={{ fontFamily:"'Poppins',sans-serif" }}>
      {/* Points card */}
      <div className="rounded-2xl p-6 text-white mb-8" style={{ background:"linear-gradient(135deg,#1E3ABA,#2847D4)" }}>
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-xl">AM</div>
          <div><div className="font-bold">Ahmed Mohamed</div><div className="text-white/60 text-xs">Gold Member ⭐</div></div>
        </div>
        <div className="text-3xl font-black mb-1">4,250 pts</div>
        <div className="text-white/60 text-xs">750 pts away from a Free Cold Brew ☕</div>
        <div className="mt-3 h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div className="h-full bg-white rounded-full" style={{ width:"83%" }}/>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-gray-100 p-1 rounded-xl mb-6">
        {(["orders","points","profile"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold capitalize transition-all ${tab===t?"bg-white text-[#1E3ABA] shadow-sm":"text-gray-500"}`}>
            {t}
          </button>
        ))}
      </div>

      {tab === "orders" && (
        <div className="flex flex-col gap-4">
          {MOCK_ORDERS.map((o, i) => (
            <motion.div key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
              className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
              <div className="flex justify-between items-start mb-2">
                <div className="font-bold text-sm">{o.id}</div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${o.status==="Delivered"?"bg-green-50 text-green-700":"bg-orange-50 text-orange-600"}`}>{o.status}</span>
              </div>
              <div className="text-xs text-gray-400 mb-1">{o.date}</div>
              <div className="text-xs text-gray-600 mb-2">{o.items}</div>
              <div className="font-bold text-[#1E3ABA]">{o.total} EGP</div>
            </motion.div>
          ))}
        </div>
      )}

      {tab === "points" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <p className="font-bold mb-4">Points History</p>
          {[{type:"earn",pts:195,desc:"Order #142",date:"Today"},{type:"earn",pts:125,desc:"Order #130",date:"Yesterday"},{type:"redeem",pts:-500,desc:"Free Mojito Redeemed",date:"Jun 4"}].map((t,i)=>(
            <div key={i} className="flex justify-between items-center py-3 border-b border-gray-50 last:border-0 text-sm">
              <div><div className="font-medium">{t.desc}</div><div className="text-xs text-gray-400">{t.date}</div></div>
              <span className={`font-bold ${t.pts>0?"text-green-600":"text-red-400"}`}>{t.pts>0?"+":""}{t.pts} pts</span>
            </div>
          ))}
        </div>
      )}

      {tab === "profile" && (
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          {[{l:"Full Name",v:"Ahmed Mohamed"},{l:"Email",v:"ahmed@gmail.com"},{l:"Phone",v:"010-2345-6789"}].map(f=>(
            <div key={f.l} className="mb-4">
              <label className="text-xs font-semibold text-gray-400 block mb-1">{f.l}</label>
              <input defaultValue={f.v} className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1E3ABA]"/>
            </div>
          ))}
          <button className="w-full py-3 rounded-xl font-semibold text-white text-sm" style={{ background:"#1E3ABA" }}>Save Changes</button>
          <Link href="/login" className="block text-center text-sm text-red-400 font-medium mt-4 hover:underline">Sign Out</Link>
        </div>
      )}
    </div>
  );
}
