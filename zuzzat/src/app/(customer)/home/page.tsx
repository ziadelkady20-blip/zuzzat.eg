"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const FEATURED = [
  { name: "Ice Matcha Latte", price: 70, emoji: "🍵", tag: "Best Seller", tagColor: "#A4B55A" },
  { name: "Passion Mojito",   price: 55, emoji: "🧃", tag: "Fan Favourite", tagColor: "#1E3ABA" },
  { name: "Cold Brew",        price: 55, emoji: "☕", tag: "New",          tagColor: "#F5A623" },
  { name: "Mango Frappe",     price: 65, emoji: "🥤", tag: "Summer Pick",  tagColor: "#FF6B6B" },
];

const REVIEWS = [
  { name: "Ahmed M.", stars: 5, text: "Best matcha latte in Cairo! The vibe is incredible 🔥", date: "2 days ago" },
  { name: "Sara K.",  stars: 5, text: "Love the loyalty program — already redeemed a free mojito! ⭐", date: "1 week ago" },
  { name: "Omar Y.",  stars: 5, text: "Super fast delivery and the drinks taste amazing every time.", date: "2 weeks ago" },
];

const CATEGORIES = [
  { icon:"☕", name:"Ice Coffee" }, { icon:"🍵", name:"Matcha" }, { icon:"🧃", name:"Mojito" },
  { icon:"🥤", name:"Frappe" },  { icon:"🍊", name:"Fresh Juices" }, { icon:"🥛", name:"Milkshakes" },
];

export default function HomePage() {
  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: "linear-gradient(135deg,#1E3ABA 0%,#2847D4 100%)", minHeight: 520 }}>
        <div className="absolute inset-0 opacity-10">
          {[...Array(6)].map((_,i)=><div key={i} className="absolute rounded-full bg-white" style={{ width:80+i*60,height:80+i*60,top:`${10+i*15}%`,left:`${-5+i*18}%`,opacity:0.1 }}/>)}
        </div>
        <div className="max-w-6xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12 relative">
          <motion.div className="flex-1 text-white" initial={{ opacity:0, x:-40 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.6 }}>
            <div className="inline-flex items-center gap-2 bg-white/15 rounded-full px-4 py-1.5 mb-6 text-sm font-medium">
              ☕ Cairo&apos;s Coolest Coffee Experience
            </div>
            <h1 className="text-5xl md:text-6xl font-black leading-tight mb-6" style={{ fontFamily:"'Outfit',sans-serif" }}>
              Stay Cool,<br/>Drink Better 🧊
            </h1>
            <p className="text-white/70 text-lg mb-8 leading-relaxed max-w-md">
              Premium ice coffees, matchas, mojitos & more — crafted fresh, delivered fast.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/menu" className="bg-white text-[#1E3ABA] font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors text-sm">
                Order Now 🍹
              </Link>
              <Link href="/loyalty" className="border-2 border-white/40 text-white font-semibold px-8 py-4 rounded-2xl hover:border-white hover:bg-white/10 transition-colors text-sm">
                Join Loyalty ⭐
              </Link>
            </div>
            <div className="flex gap-8 mt-10">
              {[{n:"10K+",l:"Happy Customers"},{n:"50+",l:"Drinks"},{n:"4.9★",l:"Rating"}].map(s=>(
                <div key={s.l}><div className="text-2xl font-black">{s.n}</div><div className="text-white/60 text-xs mt-0.5">{s.l}</div></div>
              ))}
            </div>
          </motion.div>
          <motion.div className="flex-shrink-0" initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.6, delay:0.2 }}>
            <div className="relative">
              <div className="w-72 h-72 rounded-3xl bg-white/15 backdrop-blur flex items-center justify-center" style={{ fontSize:160 }}>🍵</div>
              <div className="absolute -top-4 -right-4 bg-[#F5A623] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">✨ New Drop!</div>
              <div className="absolute -bottom-4 -left-4 bg-white text-[#1E3ABA] text-sm font-bold px-4 py-2 rounded-xl shadow-lg">🎉 Earn Points!</div>
            </div>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 60L1440 60L1440 20Q720 60 0 20Z" fill="#F8F9FF"/>
          </svg>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">What are you craving? 🤤</h2>
        <p className="text-gray-400 text-sm text-center mb-10">Choose your favourite category</p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
          {CATEGORIES.map(c => (
            <Link key={c.name} href="/menu"
              className="flex flex-col items-center gap-2 bg-white border border-gray-200 rounded-2xl p-4 hover:border-[#1E3ABA] hover:shadow-md transition-all cursor-pointer group">
              <span className="text-3xl group-hover:scale-110 transition-transform">{c.icon}</span>
              <span className="text-xs font-semibold text-gray-700 text-center">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-end mb-10">
            <div><h2 className="text-2xl font-bold mb-1">Featured Drinks ⭐</h2><p className="text-gray-400 text-sm">Our most loved menu items</p></div>
            <Link href="/menu" className="text-sm font-semibold text-[#1E3ABA] hover:underline">View all →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {FEATURED.map((item, i) => (
              <motion.div key={item.name} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
                className="bg-gray-50 rounded-2xl p-5 hover:shadow-md transition-all group cursor-pointer border border-gray-100 hover:border-[#1E3ABA]/30">
                <div className="relative mb-4">
                  <div className="text-5xl text-center py-2 group-hover:scale-110 transition-transform">{item.emoji}</div>
                  <span className="absolute top-0 right-0 text-white text-[10px] font-bold px-2 py-0.5 rounded-full" style={{ background:item.tagColor }}>{item.tag}</span>
                </div>
                <div className="font-bold text-sm text-gray-800 mb-1">{item.name}</div>
                <div className="flex items-center justify-between">
                  <span className="text-[#1E3ABA] font-black text-lg">{item.price} EGP</span>
                  <Link href="/menu" className="w-8 h-8 rounded-xl flex items-center justify-center text-white text-sm font-bold" style={{ background:"#1E3ABA" }}>+</Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LOYALTY BANNER */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between gap-8" style={{ background:"linear-gradient(135deg,#1E3ABA 0%,#2847D4 100%)" }}>
          <div className="text-white">
            <div className="text-4xl mb-3">⭐</div>
            <h2 className="text-2xl font-bold mb-2">Join ZUZZAT Loyalty</h2>
            <p className="text-white/70 text-sm max-w-md">Earn 1 point for every EGP you spend. Redeem for free drinks, discounts, and exclusive rewards.</p>
            <div className="flex gap-6 mt-5">
              {[{n:"500 pts",l:"Free Mojito 🧃"},{n:"1000 pts",l:"50 EGP Off 💰"},{n:"750 pts",l:"Free Cold Brew ☕"}].map(r=>(
                <div key={r.n} className="text-center">
                  <div className="text-white font-bold text-sm">{r.n}</div>
                  <div className="text-white/60 text-xs mt-0.5">{r.l}</div>
                </div>
              ))}
            </div>
          </div>
          <Link href="/register" className="flex-shrink-0 bg-white text-[#1E3ABA] font-bold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-colors text-sm">
            Sign Up Free →
          </Link>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center mb-2">What our customers say 💬</h2>
          <p className="text-gray-400 text-sm text-center mb-10">Real reviews from real ZUZZAT fans</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {REVIEWS.map((r, i) => (
              <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} transition={{ delay:i*0.1 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center gap-1 mb-3">{"★★★★★".split("").map((s,j)=><span key={j} className="text-[#F5A623]">{s}</span>)}</div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">&ldquo;{r.text}&rdquo;</p>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#EEF1FF] flex items-center justify-center text-xs font-bold text-[#1E3ABA]">{r.name[0]}</div>
                  <div><div className="text-xs font-semibold">{r.name}</div><div className="text-[10px] text-gray-400">{r.date}</div></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
