"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MENU_ITEMS, CATEGORIES, PROMO_CODES } from "@/lib/data";
import { use } from "react";

interface CartItem { id: string; name: string; price: number; emoji: string; qty: number; }

export default function QROrderPage({ params }: { params: Promise<{ tableId: string }> }) {
  const { tableId } = use(params);
  const [cat, setCat] = useState("all");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [promoInput, setPromoInput] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState("");
  const [note, setNote] = useState("");
  const [step, setStep] = useState<"menu"|"cart"|"success">("menu");

  const filtered = MENU_ITEMS.filter(i => cat === "all" || i.category === cat);

  const addToCart = (item: typeof MENU_ITEMS[0]) => {
    setCart(c => {
      const ex = c.find(x => x.id === item.id);
      if (ex) return c.map(x => x.id === item.id ? { ...x, qty: x.qty+1 } : x);
      return [...c, { id: item.id, name: item.name, price: item.price, emoji: item.emoji, qty: 1 }];
    });
  };

  const updateQty = (id: string, delta: number) => {
    setCart(c => c.map(x => x.id === id ? { ...x, qty: Math.max(0, x.qty+delta) } : x).filter(x => x.qty > 0));
  };

  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const discount = promoInput.toUpperCase() in PROMO_CODES
    ? PROMO_CODES[promoInput.toUpperCase()].type === "percent"
      ? Math.round(subtotal * PROMO_CODES[promoInput.toUpperCase()].value)
      : Math.min(PROMO_CODES[promoInput.toUpperCase()].value, subtotal)
    : 0;
  const total = subtotal - discount;
  const totalItems = cart.reduce((a,c) => a+c.qty, 0);

  const applyPromo = () => {
    if (promoInput.toUpperCase() in PROMO_CODES) { setPromoDiscount(discount); setPromoMsg("✅ Promo applied!"); }
    else { setPromoDiscount(0); setPromoMsg("❌ Invalid code"); }
  };

  const placeOrder = () => {
    if (!cart.length) return;
    setStep("success");
  };

  if (step === "success") return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6" style={{ fontFamily:"'Poppins',sans-serif" }}>
      <motion.div className="text-center" initial={{ scale:0.8, opacity:0 }} animate={{ scale:1, opacity:1 }}>
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold mb-2">Order Placed!</h2>
        <p className="text-gray-500 mb-2">Table {tableId} • Your order is being prepared</p>
        <p className="text-[#1E3ABA] font-bold text-lg mb-6">Total: {total - promoDiscount} EGP</p>
        <div className="bg-white rounded-2xl border border-gray-100 p-5 text-left mb-6 shadow-sm">
          {cart.map(i => <div key={i.id} className="flex justify-between text-sm py-1"><span>{i.emoji} {i.name} ×{i.qty}</span><span className="font-bold">{i.price*i.qty} EGP</span></div>)}
        </div>
        <p className="text-gray-400 text-xs">We&apos;ll bring your order to Table {tableId} shortly ☕</p>
        <button onClick={() => { setCart([]); setStep("menu"); setPromoInput(""); setPromoDiscount(0); }} className="mt-6 text-[#1E3ABA] font-semibold text-sm underline">Order More</button>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily:"'Poppins',sans-serif" }}>
      {/* Header */}
      <div className="sticky top-0 z-50 text-white shadow-md" style={{ background:"#1E3ABA" }}>
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg width="30" height="30" viewBox="0 0 110 110" fill="none">
              <circle cx="55" cy="50" r="36" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="2"/>
              <ellipse cx="55" cy="51" rx="17" ry="19" fill="white"/>
              <circle cx="48" cy="49" r="2.8" fill="#1E3ABA"/><circle cx="62" cy="49" r="2.8" fill="#1E3ABA"/>
              <path d="M48 57 Q55 65 62 57" stroke="#1E3ABA" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
            <div>
              <div className="font-black text-lg" style={{ fontFamily:"'Outfit',sans-serif" }}>ZUZZAT</div>
              <div className="text-white/60 text-xs">Table {tableId}</div>
            </div>
          </div>
          {step === "menu" && totalItems > 0 && (
            <button onClick={() => setStep("cart")} className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm font-semibold transition-colors">
              🛒 {totalItems}
            </button>
          )}
          {step === "cart" && (
            <button onClick={() => setStep("menu")} className="text-white/80 text-sm">← Back</button>
          )}
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {step === "menu" && (
            <motion.div key="menu" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}>
              {/* Category pills */}
              <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-thin">
                {CATEGORIES.map(c => (
                  <button key={c.id} onClick={() => setCat(c.id)}
                    className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${cat===c.id?"bg-[#1E3ABA] text-white border-[#1E3ABA]":"bg-white border-gray-200 text-gray-600"}`}>
                    {c.label}
                  </button>
                ))}
              </div>
              {/* Products */}
              <div className="grid grid-cols-2 gap-3">
                {filtered.map(item => {
                  const qty = cart.find(c => c.id === item.id)?.qty ?? 0;
                  return (
                    <div key={item.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                      <div className="h-24 flex items-center justify-center text-5xl bg-gradient-to-br from-gray-50 to-gray-100">{item.emoji}</div>
                      <div className="p-3">
                        <div className="font-bold text-xs text-gray-800 mb-0.5">{item.name}</div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="font-black text-[#1E3ABA] text-sm">{item.price} EGP</span>
                          {qty === 0 ? (
                            <button onClick={() => addToCart(item)} className="w-7 h-7 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background:"#1E3ABA" }}>+</button>
                          ) : (
                            <div className="flex items-center gap-1.5">
                              <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 font-bold text-sm">−</button>
                              <span className="text-xs font-bold w-4 text-center">{qty}</span>
                              <button onClick={() => addToCart(item)} className="w-6 h-6 rounded-lg flex items-center justify-center text-white font-bold text-sm" style={{ background:"#1E3ABA" }}>+</button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {step === "cart" && (
            <motion.div key="cart" initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0 }}>
              <h2 className="text-lg font-bold mb-4">Your Order 🛒</h2>
              {cart.map(item => (
                <div key={item.id} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3 mb-2 shadow-sm">
                  <span className="text-2xl">{item.emoji}</span>
                  <div className="flex-1"><div className="font-semibold text-sm">{item.name}</div><div className="text-xs text-gray-400">{item.price} EGP each</div></div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => updateQty(item.id,-1)} className="w-6 h-6 rounded-lg bg-gray-100 flex items-center justify-center text-gray-700 text-sm font-bold">−</button>
                    <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id,1)} className="w-6 h-6 rounded-lg flex items-center justify-center text-white text-sm font-bold" style={{ background:"#1E3ABA" }}>+</button>
                  </div>
                  <span className="font-bold text-sm text-[#1E3ABA] min-w-[45px] text-right">{item.price*item.qty}</span>
                </div>
              ))}
              <div className="bg-white rounded-xl border border-gray-100 p-4 mt-4 shadow-sm">
                <label className="text-xs font-semibold text-gray-400 block mb-2">Special Notes</label>
                <textarea value={note} onChange={e => setNote(e.target.value)} rows={2} placeholder="e.g. Less ice, no sugar..." className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3ABA] resize-none"/>
                <div className="flex gap-2 mt-3">
                  <input value={promoInput} onChange={e => { setPromoInput(e.target.value); setPromoMsg(""); }} placeholder="🎟 Promo code" className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3ABA]"/>
                  <button onClick={applyPromo} className="bg-[#EEF1FF] text-[#1E3ABA] text-xs font-bold px-3 rounded-xl">Apply</button>
                </div>
                {promoMsg && <p className="text-xs mt-1 text-center">{promoMsg}</p>}
              </div>
              <div className="bg-white rounded-xl border border-gray-100 p-4 mt-3 shadow-sm">
                <div className="flex justify-between text-sm text-gray-500 mb-1"><span>Subtotal</span><span>{subtotal} EGP</span></div>
                {promoDiscount > 0 && <div className="flex justify-between text-sm text-green-600 mb-1"><span>Discount</span><span>−{promoDiscount} EGP</span></div>}
                <div className="flex justify-between font-bold"><span>Total</span><span className="text-xl text-[#1E3ABA] font-black" style={{ fontFamily:"'Outfit',sans-serif" }}>{total - promoDiscount} EGP</span></div>
              </div>
              <button onClick={placeOrder} className="w-full mt-4 py-4 rounded-2xl font-bold text-white text-sm shadow-lg" style={{ background:"#1E3ABA" }}>
                ✅ Place Order · Table {tableId}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sticky cart bar */}
      {step === "menu" && totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 shadow-lg">
          <div className="max-w-lg mx-auto">
            <button onClick={() => setStep("cart")} className="w-full py-4 rounded-2xl font-bold text-white flex items-center justify-between px-6" style={{ background:"#1E3ABA" }}>
              <span className="bg-white/20 rounded-lg px-2 py-0.5 text-sm">{totalItems}</span>
              <span>View Cart</span>
              <span className="font-black">{subtotal} EGP</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
