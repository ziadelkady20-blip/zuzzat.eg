"use client";
import StatCard from "@/components/ui/StatCard";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";

const weekRevenue = [7200, 9100, 6400, 10800, 8500, 12840, 9700];
const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const maxRev = Math.max(...weekRevenue);

const categories = [
  { name:"🍵 Matcha", pct:32, val:4109, color:"#A4B55A" },
  { name:"☕ Coffee", pct:28, val:3595, color:"#1E3ABA" },
  { name:"🧃 Mojito", pct:20, val:2568, color:"#F5A623" },
  { name:"🥤 Frappe", pct:12, val:1541, color:"#FF6B6B" },
  { name:"🍊 Juices", pct:8, val:1027, color:"#9BA5CC" },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-5">
        <div><h1 className="text-2xl font-bold">Analytics & Reports</h1><p className="text-sm text-gray-400 mt-1">Data-driven insights for ZUZZAT</p></div>
        <div className="flex gap-2">
          <select className="text-xs border border-gray-200 rounded-xl px-3 py-2 outline-none"><option>Today</option><option>This Week</option><option>This Month</option><option>This Year</option></select>
          <Button variant="outline" size="sm">📊 PDF</Button>
          <Button variant="outline" size="sm">📊 Excel</Button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard icon="💰" iconBg="#EEF1FF" value="12,840 EGP" label="Today's Revenue" change="↑ 18%" changeType="up" />
        <StatCard icon="📋" iconBg="#FFF5E6" value="84" label="Total Orders" change="↑ 12" changeType="up" />
        <StatCard icon="💳" iconBg="#F0F7E6" value="152.8 EGP" label="Avg Order Value" change="↑ 5%" changeType="up" />
        <StatCard icon="✅" iconBg="#EEF1FF" value="89%" label="Completion Rate" change="↓ 2%" changeType="down" />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Revenue by Day (This Week)</p>
          <div className="flex items-end gap-2 h-32">
            {weekRevenue.map((v,i)=>(
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="text-[9px] font-bold text-gray-500">{Math.round(v/1000)}k</div>
                <div className="w-full rounded-t-md" style={{height:`${(v/maxRev)*100}%`,background:i===5?"#1E3ABA":"#C7CFFE"}}/>
                <span className={`text-[10px] ${i===5?"text-[#1E3ABA] font-bold":"text-gray-400"}`}>{weekDays[i]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-4">Category Revenue Breakdown</p>
          {categories.map(c=>(
            <div key={c.name} className="flex items-center gap-2.5 mb-3">
              <span className="w-24 text-xs text-gray-600 flex-shrink-0">{c.name}</span>
              <div className="flex-1"><ProgressBar percent={c.pct} color={c.color} /></div>
              <span className="text-xs font-bold text-gray-700 min-w-[70px] text-right">{c.val.toLocaleString()} EGP</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
