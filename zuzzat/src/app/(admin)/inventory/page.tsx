"use client";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

const INVENTORY = [
  { id:"1", name:"☕ Coffee Beans", cat:"Coffee", stock:12.5, unit:"kg", min:5, status:"good" as const },
  { id:"2", name:"🥛 Full Cream Milk", cat:"Dairy", stock:15, unit:"L", min:8, status:"good" as const },
  { id:"3", name:"🥛 Oat Milk", cat:"Dairy Alt.", stock:5, unit:"L", min:6, status:"low" as const },
  { id:"4", name:"🍵 Matcha Powder", cat:"Matcha", stock:300, unit:"g", min:500, status:"critical" as const },
  { id:"5", name:"🧊 Ice", cat:"Supplies", stock:2, unit:"bags", min:4, status:"low" as const },
  { id:"6", name:"🍋 Passion Fruit", cat:"Fruits", stock:8, unit:"pcs", min:20, status:"critical" as const },
  { id:"7", name:"🌿 Fresh Mint", cat:"Herbs", stock:4, unit:"bunches", min:3, status:"good" as const },
  { id:"8", name:"🍓 Strawberry Syrup", cat:"Syrups", stock:2, unit:"bottles", min:3, status:"low" as const },
];
const sv: Record<string,"green"|"orange"|"red"> = { good:"green", low:"orange", critical:"red" };

export default function InventoryPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-5">
        <div><h1 className="text-2xl font-bold">Inventory Management</h1><p className="text-sm text-gray-400 mt-1">Track stock levels and usage</p></div>
        <div className="flex gap-2"><Button variant="outline" size="sm">📊 Usage Log</Button><Button size="sm">+ Add Stock</Button></div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <th className="text-left px-4 py-3">Item</th><th className="text-left px-4 py-3">Category</th>
            <th className="text-left px-4 py-3">Stock</th><th className="text-left px-4 py-3">Unit</th>
            <th className="text-left px-4 py-3">Min Level</th><th className="text-left px-4 py-3">Status</th><th className="text-left px-4 py-3">Action</th>
          </tr></thead>
          <tbody>
            {INVENTORY.map(i => (
              <tr key={i.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-semibold">{i.name}</td>
                <td className="px-4 py-3 text-gray-500">{i.cat}</td>
                <td className="px-4 py-3 font-bold">{i.stock}</td>
                <td className="px-4 py-3 text-gray-500">{i.unit}</td>
                <td className="px-4 py-3 text-gray-500">{i.min} {i.unit}</td>
                <td className="px-4 py-3"><Badge variant={sv[i.status]}>{i.status}</Badge></td>
                <td className="px-4 py-3">
                  <Button variant={i.status === "good" ? "outline" : "primary"} size="sm">
                    {i.status === "good" ? "+ Restock" : "⚡ Restock"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
