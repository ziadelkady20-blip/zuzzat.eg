"use client";
import { useState } from "react";
import { MENU_ITEMS } from "@/lib/data";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ToggleSwitch from "@/components/ui/ToggleSwitch";

export default function MenuPage() {
  const [items, setItems] = useState(MENU_ITEMS);
  const toggle = (id: string) => setItems(its => its.map(i => i.id === id ? { ...i, available: !i.available } : i));
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-5">
        <div><h1 className="text-2xl font-bold">Menu Manager</h1><p className="text-sm text-gray-400 mt-1">Manage your drink and food offerings</p></div>
        <Button size="sm" onClick={() => alert("Add product form")}>+ Add Product</Button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <th className="text-left px-4 py-3">Product</th><th className="text-left px-4 py-3">Category</th>
            <th className="text-left px-4 py-3">Price</th><th className="text-left px-4 py-3">Available</th><th className="text-left px-4 py-3">Actions</th>
          </tr></thead>
          <tbody>
            {items.map(item => (
              <tr key={item.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3"><div className="flex items-center gap-2.5"><span className="text-xl">{item.emoji}</span><div><div className="font-semibold text-sm">{item.name}</div><div className="text-xs text-gray-400">{item.description}</div></div></div></td>
                <td className="px-4 py-3"><Badge variant="blue">{item.category}</Badge></td>
                <td className="px-4 py-3 font-bold">{item.price} EGP</td>
                <td className="px-4 py-3">
                  <ToggleSwitch checked={item.available} onChange={() => toggle(item.id)} />
                </td>
                <td className="px-4 py-3"><Button variant="outline" size="sm">Edit</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
