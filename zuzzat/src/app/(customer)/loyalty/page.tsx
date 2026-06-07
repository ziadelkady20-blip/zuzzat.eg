"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const REWARDS = [
  { pts:500, name:"Free Mojito 🧃", desc:"Classic or Passion flavour" },
  { pts:750, name:"Free Cold Brew ☕", desc:"Any size" },
  { pts:1000, name:"50 EGP Discount 💰", desc:"On any order" },
  { pts:2000, name:"VIP Tasting Event 🎉", desc:"Exclusive monthly event" },
];

export default function LoyaltyPage() {
  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      {/* Hero */}
      <div className="py-20 text-center text-white" style={{ background:"linear-gradient(135deg,#1E3ABA,#2847D4)" }}>
        <div className="text-5xl mb-4">⭐</div>
        <h1 className="text-3xl font-bold mb-2">ZUZZAT Loyalty</h1>
        <p className="text-white/70 text-sm max-w-md mx-auto">Earn points on every purchase and redeem them for amazing rewards.</p>
        <div className="flex justify-center gap-8 mt-8">
          {[{n:"1 pt",l:"per EGP spent"},{n:"2×",l:"birthday points"},{n:"+100",l:"per referral"}].map(s=>(
            <div key={s.l} className="text-center">
              <div className="text-2xl font-black">{s.n}</div>
              <div className="text-white/60 text-xs mt-0.5">{s.l}</div>
            </div>
          ))}
        </div>
      </div>
      {/* How it works */}
      <div className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-10">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {[
            { step:"1", icon:"🛒", title:"Order & Earn", desc:"Every EGP you spend earns 1 loyalty point automatically." },
            { step:"2", icon:"💎", title:"Collect Points", desc:"Track your points in your account. They never expire!" },
            { step:"3", icon:"🎁", title:"Redeem Rewards", desc:"Use your points for free drinks, discounts & more." },
          ].map((s, i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:i*0.15 }}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm text-center">
              <div className="text-4xl mb-3">{s.icon}</div>
              <div className="text-xs font-bold text-[#1E3ABA] mb-2">STEP {s.step}</div>
              <h3 className="font-bold mb-2">{s.title}</h3>
              <p className="text-gray-400 text-sm">{s.desc}</p>
            </motion.div>
          ))}
        </div>
        {/* Rewards */}
        <h2 className="text-2xl font-bold text-center mb-8">Available Rewards</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {REWARDS.map((r, i) => (
            <motion.div key={i} initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }} transition={{ delay:i*0.1 }}
              className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-5 hover:shadow-md transition-all">
              <div>
                <div className="font-bold text-sm">{r.name}</div>
                <div className="text-xs text-gray-400">{r.desc}</div>
              </div>
              <span className="bg-[#EEF1FF] text-[#1E3ABA] text-xs font-black px-3 py-1.5 rounded-full whitespace-nowrap">{r.pts} pts</span>
            </motion.div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/register" className="inline-flex text-white font-bold px-8 py-4 rounded-2xl text-sm" style={{ background:"#1E3ABA" }}>
            Join Loyalty Now →
          </Link>
        </div>
      </div>
    </div>
  );
}
