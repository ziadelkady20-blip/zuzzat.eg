"use client";
import { useState } from "react";
import Button from "@/components/ui/Button";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

export default function SettingsPage() {
  const [form, setForm] = useState({ name:"ZUZZAT Coffee Shop", tagline:"Stay Cool, Drink Better", address:"123 Tahrir Square, Cairo", phone:"010-ZUZZAT-01" });
  const [notifs, setNotifs] = useState({ orderSound:true, lowStock:true, delivery:true, promoExpiry:true });
  const update = (k: keyof typeof form, v: string) => setForm(f => ({...f,[k]:v}));
  const toggleN = (k: keyof typeof notifs) => setNotifs(n => ({...n,[k]:!n[k]}));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Settings</h1>
      <p className="text-sm text-gray-400 mb-5">Configure your ZUZZAT platform</p>
      <div className="grid grid-cols-2 gap-5">
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Brand Settings</p>
            {[{l:"Brand Name",k:"name"},{l:"Tagline",k:"tagline"}].map(f=>(
              <div key={f.k} className="mb-3">
                <label className="text-xs font-semibold text-gray-500 block mb-1">{f.l}</label>
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3ABA]" value={form[f.k as keyof typeof form]} onChange={e=>update(f.k as any,e.target.value)}/>
              </div>
            ))}
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 block mb-1">Primary Color</label>
              <input type="color" className="h-10 w-full rounded-xl border border-gray-200 cursor-pointer" defaultValue="#1E3ABA"/>
            </div>
            <Button size="sm" onClick={()=>alert("Settings saved!")}>Save Changes</Button>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Receipt Settings</p>
            {[{l:"Shop Address",k:"address"},{l:"Phone",k:"phone"}].map(f=>(
              <div key={f.k} className="mb-3">
                <label className="text-xs font-semibold text-gray-500 block mb-1">{f.l}</label>
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3ABA]" value={form[f.k as keyof typeof form]} onChange={e=>update(f.k as any,e.target.value)}/>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Notifications</p>
            {[{l:"New order sound alert",k:"orderSound"},{l:"Low stock alerts",k:"lowStock"},{l:"Delivery updates",k:"delivery"},{l:"Promo expiry alerts",k:"promoExpiry"}].map(n=>(
              <div key={n.k} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-sm">{n.l}</span>
                <ToggleSwitch checked={notifs[n.k as keyof typeof notifs]} onChange={()=>toggleN(n.k as any)} />
              </div>
            ))}
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">User Management</p>
            <div className="mb-3"><label className="text-xs font-semibold text-gray-500 block mb-1">Staff Email</label><input className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#1E3ABA]" placeholder="staff@zuzzat.com"/></div>
            <div className="mb-4"><label className="text-xs font-semibold text-gray-500 block mb-1">Role</label>
              <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm outline-none"><option>Admin</option><option>Cashier</option><option>Kitchen</option><option>Inventory Manager</option></select>
            </div>
            <Button size="sm">+ Add Staff Member</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
