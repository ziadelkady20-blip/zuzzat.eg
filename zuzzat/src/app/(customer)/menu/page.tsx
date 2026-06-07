"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS, CATEGORIES } from "@/lib/data";

export default function CustomerMenuPage() {
  const [cat, setCat] = useState("all");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState<Record<string,number>>({});
  const [added, setAdded] = useState<string | null>(null);

  const filtered = MENU_ITEMS.filter(i =>
    (cat === "all" || i.category === cat) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const addItem = (id: string, name: string) => {
    setCart(c => ({ ...c, [id]: (c[id] || 0) + 1 }));
    setAdded(name);
    setTimeout(() => setAdded(null), 2000);
  };

  const totalItems = Object.values(cart).reduce((a,b) => a+b, 0);

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily:"'Poppins',sans-serif" }}>
      {/* Header */}
      <div className="bg-white border-b border-gray-100 sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <input value={search} onChange={e => setSearch(e.target.value)}
            className="w-full max-w-md border border-gray-200 rounded-2xl px-5 py-2.5 text-sm outline-none focus:border-[#1E3ABA] mb-4"
            placeholder="🔍 Search drinks..."/>
          <div className="flex gap-2 flex-wrap">
            {CATEGORIES.map(c => (
              <button key={c.id} onClick={() => setCat(c.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${cat===c.id?"bg-[#1E3ABA] text-white border-[#1E3ABA]":"bg-white border-gray-200 text-gray-600 hover:border-[#1E3ABA]"}`}>
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filtered.map((item, i) => (
            <motion.div key={item.id} layout initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}
              className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-all group">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 h-36 flex items-center justify-center text-6xl group-hover:scale-105 transition-transform">
                {item.emoji}
              </div>
              <div className="p-4">
                <div className="font-bold text-sm text-gray-800 mb-1">{item.name}</div>
                <div className="text-xs text-gray-400 mb-3">{item.description}</div>
                <div className="flex items-center justify-between">
                  <span className="font-black text-[#1E3ABA]">{item.price} EGP</span>
                  {item.available ? (
                    <button onClick={() => addItem(item.id, item.name)}
                      className="flex items-center gap-1.5 text-xs font-bold text-white px-3 py-1.5 rounded-xl transition-colors"
                      style={{ background:"#1E3ABA" }}>
                      + Add
                    </button>
                  ) : (
                    <span className="text-xs text-gray-400 font-medium">Unavailable</span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Cart toast */}
      <AnimatePresence>
        {added && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:20 }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-sm font-medium px-5 py-3 rounded-2xl shadow-xl z-50">
            ✅ {added} added to cart
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart button */}
      {totalItems > 0 && (
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
          className="fixed bottom-6 right-6 z-50">
          <button className="flex items-center gap-2 text-white font-bold px-6 py-3.5 rounded-2xl shadow-xl text-sm"
            style={{ background:"#1E3ABA" }}
            onClick={() => alert(`${totalItems} items in cart\nGo to checkout →`)}>
            🛒 Cart · {totalItems}
          </button>
        </motion.div>
      )}
    </div>
  );
}
