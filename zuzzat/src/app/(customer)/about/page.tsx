"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function AboutPage() {
  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div className="text-center mb-14" initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}>
          <div className="text-5xl mb-4">☕</div>
          <h1 className="text-3xl font-bold mb-3">About ZUZZAT</h1>
          <p className="text-gray-500 max-w-xl mx-auto">We&apos;re on a mission to make your daily coffee ritual cooler, better, and more rewarding.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14">
          <motion.div initial={{ opacity:0, x:-20 }} whileInView={{ opacity:1, x:0 }}>
            <h2 className="text-xl font-bold mb-4">Our Story 📖</h2>
            <p className="text-gray-500 text-sm leading-relaxed mb-3">ZUZZAT started in 2023 with one simple goal: create the most refreshing drink experience in Egypt. We combine premium ingredients, creative recipes, and a cool brand identity that speaks to the youth of today.</p>
            <p className="text-gray-500 text-sm leading-relaxed">From our signature Ice Matcha Latte to our viral Passion Mojito, every drink is crafted with love and served with a smile.</p>
          </motion.div>
          <motion.div initial={{ opacity:0, x:20 }} whileInView={{ opacity:1, x:0 }}
            className="rounded-2xl flex items-center justify-center h-48" style={{ background:"linear-gradient(135deg,#EEF1FF,#C7CFFE)" }}>
            <div className="text-7xl">🏪</div>
          </motion.div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {[{n:"2023",l:"Founded"},{n:"10K+",l:"Customers"},{n:"50+",l:"Drinks"},{n:"4.9★",l:"Rating"}].map(s=>(
            <div key={s.l} className="bg-white rounded-2xl p-5 border border-gray-100 text-center shadow-sm">
              <div className="text-2xl font-black text-[#1E3ABA]">{s.n}</div>
              <div className="text-xs text-gray-400 mt-1">{s.l}</div>
            </div>
          ))}
        </div>
        <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm text-center">
          <h2 className="text-xl font-bold mb-2">📍 Visit Us</h2>
          <p className="text-gray-500 text-sm mb-1">123 Tahrir Square, Cairo, Egypt</p>
          <p className="text-gray-500 text-sm mb-1">📞 010-ZUZZAT-01</p>
          <p className="text-gray-500 text-sm mb-4">✉️ hello@zuzzat.com</p>
          <p className="text-gray-400 text-sm">🕐 Open daily from 9:00 AM to 12:00 AM</p>
          <Link href="/menu" className="inline-flex mt-6 text-white font-bold px-8 py-3 rounded-xl text-sm" style={{ background:"#1E3ABA" }}>Order Now →</Link>
        </div>
      </div>
    </div>
  );
}
