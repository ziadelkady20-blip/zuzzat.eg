"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const OFFERS = [
  { code:"SUMMER25", title:"Summer Special", desc:"Get 25% off all drinks this summer!", badge:"25% OFF", color:"#F5A623", emoji:"☀️", expires:"Jun 30, 2026" },
  { code:"MATCHA10", title:"Matcha Monday", desc:"10% off all matcha drinks every Monday.", badge:"10% OFF", color:"#A4B55A", emoji:"🍵", expires:"Jul 31, 2026" },
  { code:"WELCOME50", title:"Welcome Gift", desc:"New customers get 50 EGP off their first order!", badge:"50 EGP", color:"#1E3ABA", emoji:"🎁", expires:"Dec 31, 2026" },
  { code:"DELIVERY0", title:"Free Delivery", desc:"Free delivery on orders above 150 EGP.", badge:"FREE", color:"#FF6B6B", emoji:"🛵", expires:"Jul 15, 2026" },
];

export default function OffersPage() {
  const copy = (code: string) => { navigator.clipboard?.writeText(code); alert(`✅ Code "${code}" copied!`); };
  return (
    <div className="max-w-4xl mx-auto px-6 py-16" style={{ fontFamily:"'Poppins',sans-serif" }}>
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold mb-2">Current Offers 🎉</h1>
        <p className="text-gray-400">Use these codes at checkout to save on your order</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {OFFERS.map((o, i) => (
          <motion.div key={o.code} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
            className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all">
            <div className="h-2" style={{ background:o.color }}/>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div className="text-3xl">{o.emoji}</div>
                <span className="text-xs font-bold text-white px-3 py-1 rounded-full" style={{ background:o.color }}>{o.badge}</span>
              </div>
              <h3 className="font-bold text-base mb-1">{o.title}</h3>
              <p className="text-gray-500 text-sm mb-4">{o.desc}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <code className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg text-xs font-bold tracking-wider">{o.code}</code>
                  <button onClick={() => copy(o.code)} className="text-xs font-semibold text-[#1E3ABA] hover:underline">Copy</button>
                </div>
                <span className="text-xs text-gray-400">Expires {o.expires}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div className="mt-10 text-center">
        <Link href="/menu" className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-2xl text-sm" style={{ background:"#1E3ABA" }}>
          Order Now & Use a Code →
        </Link>
      </div>
    </div>
  );
}
