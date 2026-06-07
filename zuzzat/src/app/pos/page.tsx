"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MENU_ITEMS, CATEGORIES, PROMO_CODES } from "@/lib/data";
import { useStore } from "@/store";
import Button from "@/components/ui/Button";

export default function POSPage() {
  const { cart, addToCart, updateQty, clearCart, addOrder, orders } = useStore();
  const [activeCat, setActiveCat] = useState("all");
  const [search, setSearch] = useState("");
  const [promoInput, setPromoInput] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoMsg, setPromoMsg] = useState("");
  const [orderType, setOrderType] = useState("Dine In");
  const [tableNum, setTableNum] = useState("1");
  const [payMethod, setPayMethod] = useState("cash");

  const filtered = MENU_ITEMS.filter(i =>
    (activeCat === "all" || i.category === activeCat) &&
    i.name.toLowerCase().includes(search.toLowerCase())
  );

  const subtotal = cart.reduce((a, c) => a + c.price * c.qty, 0);
  const discountAmt = promoInput.toUpperCase() in PROMO_CODES
    ? PROMO_CODES[promoInput.toUpperCase()].type === "percent"
      ? Math.round(subtotal * PROMO_CODES[promoInput.toUpperCase()].value)
      : PROMO_CODES[promoInput.toUpperCase()].value
    : 0;
  const total = subtotal - discountAmt;

  const applyPromo = () => {
    const code = promoInput.toUpperCase();
    if (code in PROMO_CODES) { setPromoDiscount(discountAmt); setPromoMsg("✅ Promo applied!"); }
    else { setPromoDiscount(0); setPromoMsg("❌ Invalid code"); }
  };

  const checkout = () => {
    if (!cart.length) return alert("Add items first!");
    const orderNum = (orders.length ? Math.max(...orders.map(o => o.orderNumber)) : 141) + 1;
    addOrder({ id: Date.now().toString(), orderNumber: orderNum, type: orderType === "Dine In" ? "dine-in" : orderType === "Pickup" ? "pickup" : "delivery", tableId: orderType === "Dine In" ? parseInt(tableNum) : undefined, items: cart, subtotal, discount: promoDiscount, total: total - promoDiscount, promoCode: promoDiscount > 0 ? promoInput.toUpperCase() : undefined, paymentMethod: payMethod as any, status: "new", createdAt: new Date(), cashier: "Admin" });
    clearCart(); setPromoInput(""); setPromoDiscount(0); setPromoMsg("");
    alert(`✅ Order #${orderNum} placed!\nTotal: ${total - promoDiscount} EGP\nSent to kitchen!`);
  };

  return (
    <div className="p-6 h-[calc(100vh-56px)] flex flex-col">
      <h1 className="text-2xl font-bold text-gray-800 mb-1">POS System</h1>
      <p className="text-sm text-gray-400 mb-3">Create orders quickly and efficiently</p>
      <div className="flex gap-2 mb-3 flex-wrap">
        {CATEGORIES.map(c => (
          <button key={c.id} onClick={() => setActiveCat(c.id)}
            className={`px-4 py-1.5 rounded-full border text-xs font-medium transition-all ${activeCat === c.id ? "bg-[#1E3ABA] text-white border-[#1E3ABA]" : "bg-white text-gray-600 border-gray-200 hover:border-[#1E3ABA]"}`}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="flex gap-5 flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <input className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm mb-3 outline-none focus:border-[#1E3ABA]" placeholder="🔍 Search products..." value={search} onChange={e => setSearch(e.target.value)} />
          <div className="grid grid-cols-3 gap-3 overflow-y-auto scrollbar-thin pr-1">
            {filtered.map(item => (
              <motion.div key={item.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => addToCart({ id: item.id, name: item.name, price: item.price, emoji: item.emoji })}
                className="bg-white rounded-xl p-4 border-2 border-transparent hover:border-[#1E3ABA] cursor-pointer text-center shadow-sm">
                <div className="text-3xl mb-2">{item.emoji}</div>
                <div className="text-xs font-semibold text-gray-800">{item.name}</div>
                <div className="text-sm font-bold text-[#1E3ABA] mt-1">{item.price} EGP</div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-80 bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden shadow-sm">
          <div className="p-4 border-b border-gray-100 flex items-center gap-2 font-bold text-sm">
            🛒 Order <span className="bg-[#FF6B6B] text-white text-[10px] rounded-full px-2 py-0.5">{cart.reduce((a,c)=>a+c.qty,0)}</span>
          </div>
          <div className="flex gap-2 p-3 border-b border-gray-100">
            <select className="flex-1 text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none" value={orderType} onChange={e=>setOrderType(e.target.value)}>
              <option>Dine In</option><option>Pickup</option><option>Delivery</option>
            </select>
            {orderType === "Dine In" && <select className="w-20 text-xs border border-gray-200 rounded-lg px-2 py-1.5 outline-none" value={tableNum} onChange={e=>setTableNum(e.target.value)}>
              {Array.from({length:15},(_,i)=><option key={i+1}>{i+1}</option>)}
            </select>}
          </div>
          <div className="flex-1 overflow-y-auto p-3 scrollbar-thin">
            {cart.length === 0 ? <div className="text-center py-8 text-gray-400 text-xs">No items yet.<br/>Click products to add</div> :
              cart.map(item => (
                <div key={item.id} className="flex items-center gap-2 p-2 rounded-lg bg-gray-50 mb-2">
                  <span>{item.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold truncate">{item.name}</div>
                    <div className="text-[11px] text-gray-400">{item.price} EGP</div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQty(item.id, item.qty - 1)} className="w-5 h-5 rounded-full bg-[#1E3ABA] text-white text-xs flex items-center justify-center">−</button>
                    <span className="text-xs font-bold w-4 text-center">{item.qty}</span>
                    <button onClick={() => updateQty(item.id, item.qty + 1)} className="w-5 h-5 rounded-full bg-[#1E3ABA] text-white text-xs flex items-center justify-center">+</button>
                  </div>
                  <span className="text-xs font-bold text-[#1E3ABA] min-w-[40px] text-right">{item.price * item.qty}</span>
                </div>
              ))
            }
          </div>
          <div className="p-3 border-t border-gray-100">
            <div className="flex gap-2 mb-2">
              <input className="flex-1 text-xs border border-gray-200 rounded-lg px-3 py-1.5 outline-none" placeholder="🎟 Promo code" value={promoInput} onChange={e=>{setPromoInput(e.target.value);setPromoMsg("");}} />
              <button onClick={applyPromo} className="text-xs bg-[#EEF1FF] text-[#1E3ABA] font-semibold px-3 rounded-lg">Apply</button>
            </div>
            {promoMsg && <p className="text-[11px] mb-2 text-center">{promoMsg}</p>}
            <select className="w-full text-xs border border-gray-200 rounded-lg px-3 py-1.5 mb-3 outline-none" value={payMethod} onChange={e=>setPayMethod(e.target.value)}>
              <option value="cash">💵 Cash</option><option value="vodafone">📱 Vodafone Cash</option><option value="instapay">💳 Instapay</option>
            </select>
            <div className="flex justify-between text-xs text-gray-500 mb-1"><span>Subtotal</span><span>{subtotal} EGP</span></div>
            {promoDiscount > 0 && <div className="flex justify-between text-xs text-green-600 mb-1"><span>Discount</span><span>−{promoDiscount} EGP</span></div>}
            <div className="flex justify-between font-bold text-sm mb-3"><span>Total</span><span className="text-xl font-black text-[#1E3ABA] font-outfit">{total - promoDiscount} EGP</span></div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1" onClick={clearCart}>Clear</Button>
              <Button variant="primary" className="flex-[2]" onClick={checkout}>💳 Checkout</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
