"use client";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

const promos = [
  { code:"SUMMER25", type:"Percentage", value:"25% OFF", uses:"89 / 500", expires:"2 days", status:"active" as const },
  { code:"MATCHA10", type:"Percentage", value:"10% OFF", uses:"234 / 1000", expires:"Jun 30", status:"active" as const },
  { code:"WELCOME50", type:"Fixed", value:"50 EGP", uses:"56 / 200", expires:"Dec 31", status:"active" as const },
  { code:"RAMADAN30", type:"Percentage", value:"30% OFF", uses:"450 / 450", expires:"Expired", status:"expired" as const },
];

export default function PromosPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-5">
        <div><h1 className="text-2xl font-bold">Promo Codes</h1><p className="text-sm text-gray-400 mt-1">Create and manage discount campaigns</p></div>
        <Button size="sm" onClick={() => alert("Create promo code form")}>+ Create Promo</Button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <StatCard icon="✅" iconBg="#F0F7E6" value="8" label="Active Promos" />
        <StatCard icon="🎫" iconBg="#EEF1FF" value="342" label="Total Uses Today" />
        <StatCard icon="💵" iconBg="#FFF5E6" value="4,890 EGP" label="Discount Given Today" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <th className="text-left px-4 py-3">Code</th><th className="text-left px-4 py-3">Type</th>
            <th className="text-left px-4 py-3">Value</th><th className="text-left px-4 py-3">Uses</th>
            <th className="text-left px-4 py-3">Expires</th><th className="text-left px-4 py-3">Status</th><th className="text-left px-4 py-3">Action</th>
          </tr></thead>
          <tbody>
            {promos.map(p=>(
              <tr key={p.code} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3"><code className={`px-2 py-1 rounded text-xs font-bold ${p.status==="active"?"bg-[#EEF1FF] text-[#1E3ABA]":"bg-gray-100 text-gray-400"}`}>{p.code}</code></td>
                <td className="px-4 py-3 text-gray-500 text-xs">{p.type}</td>
                <td className="px-4 py-3 font-bold">{p.value}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">{p.uses}</td>
                <td className={`px-4 py-3 text-xs font-semibold ${p.expires==="Expired"?"text-gray-400":p.expires.includes("days")?"text-orange-500":"text-gray-600"}`}>{p.expires}</td>
                <td className="px-4 py-3"><Badge variant={p.status==="active"?"green":"gray"}>{p.status}</Badge></td>
                <td className="px-4 py-3"><Button variant="outline" size="sm">{p.status==="active"?"Edit":"View"}</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
