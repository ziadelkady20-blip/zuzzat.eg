"use client";
import StatCard from "@/components/ui/StatCard";

const members = [
  { rank:"🥇", name:"Ahmed Mohamed", points:4250, spend:4250, tier:"Gold ⭐" },
  { rank:"🥈", name:"Sara Khalil", points:3800, spend:3800, tier:"Gold ⭐" },
  { rank:"🥉", name:"Omar Youssef", points:2100, spend:2100, tier:"Silver" },
  { rank:"4", name:"Nour Hassan", points:1540, spend:1540, tier:"Silver" },
];
const rewards = [
  { icon:"🍵", name:"Free Mojito", desc:"Classic or Passion", pts:500 },
  { icon:"💰", name:"50 EGP Discount", desc:"Any order", pts:1000 },
  { icon:"☕", name:"Free Cold Brew", desc:"Premium offer", pts:750 },
];

export default function LoyaltyPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Loyalty Program</h1>
      <p className="text-sm text-gray-400 mb-5">Reward your best customers</p>
      <div className="grid grid-cols-3 gap-4 mb-5">
        <StatCard icon="⭐" iconBg="#EEF1FF" value="1,248" label="Active Members" change="↑ 34 this week" changeType="up" />
        <StatCard icon="🎁" iconBg="#FFF5E6" value="89,420" label="Points Issued" change="↑ 12% this month" changeType="up" />
        <StatCard icon="💎" iconBg="#F0F7E6" value="23,100" label="Points Redeemed" change="↑ 8% this month" changeType="up" />
      </div>
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Points Rules</p>
          {[{l:"Points per EGP spent",v:"1 pt / EGP"},{l:"Birthday bonus",v:"2× Points"},{l:"Referral bonus",v:"+100 pts"}].map(r=>(
            <div key={r.l} className="flex justify-between items-center bg-gray-50 rounded-lg px-3 py-2.5 mb-2 text-sm"><span>{r.l}</span><span className="font-bold text-[#1E3ABA]">{r.v}</span></div>
          ))}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-400 mb-3">Rewards</p>
          {rewards.map(r=>(
            <div key={r.name} className="flex justify-between items-center border border-[#C7CFFE] rounded-lg px-3 py-2.5 mb-2">
              <div><div className="font-bold text-sm">{r.icon} {r.name}</div><div className="text-xs text-gray-400">{r.desc}</div></div>
              <span className="bg-[#EEF1FF] text-[#1E3ABA] text-xs font-bold px-2.5 py-1 rounded-full">{r.pts} pts</span>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-100 font-semibold text-sm text-gray-600 uppercase tracking-wide text-xs">Top Loyalty Members</div>
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
            <th className="text-left px-4 py-2">Rank</th><th className="text-left px-4 py-2">Customer</th>
            <th className="text-left px-4 py-2">Points</th><th className="text-left px-4 py-2">Total Spend</th><th className="text-left px-4 py-2">Tier</th>
          </tr></thead>
          <tbody>
            {members.map(m=>(
              <tr key={m.name} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3">{m.rank}</td>
                <td className="px-4 py-3 font-semibold">{m.name}</td>
                <td className="px-4 py-3 font-bold text-[#1E3ABA]">{m.points.toLocaleString()}</td>
                <td className="px-4 py-3">{m.spend.toLocaleString()} EGP</td>
                <td className="px-4 py-3"><span className="bg-[#EEF1FF] text-[#1E3ABA] text-xs font-semibold px-2 py-0.5 rounded-full">{m.tier}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
