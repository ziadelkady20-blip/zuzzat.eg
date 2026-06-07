"use client";
import Button from "@/components/ui/Button";

const customers = [
  { initials:"AM", color:"#EEF1FF", tc:"#1E3ABA", name:"Ahmed Mohamed", email:"ahmed@gmail.com", phone:"010-2345-6789", orders:42, spend:4250, points:4250, last:"Today" },
  { initials:"SK", color:"#FFF0F0", tc:"#FF6B6B", name:"Sara Khalil", email:"sara@gmail.com", phone:"011-9876-5432", orders:38, spend:3800, points:3800, last:"Today" },
  { initials:"OY", color:"#F0F7E6", tc:"#5A7A1A", name:"Omar Youssef", email:"omar@gmail.com", phone:"012-5554-3333", orders:21, spend:2100, points:2100, last:"Yesterday" },
  { initials:"NH", color:"#FFF5E6", tc:"#B97A10", name:"Nour Hassan", email:"nour@gmail.com", phone:"015-1234-5678", orders:15, spend:1540, points:1540, last:"3 days ago" },
];

export default function CustomersPage() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-5">
        <div><h1 className="text-2xl font-bold">Customer Database</h1><p className="text-sm text-gray-400 mt-1">Manage and understand your customers</p></div>
        <Button variant="outline" size="sm">📤 Export</Button>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <th className="text-left px-4 py-3">Customer</th><th className="text-left px-4 py-3">Phone</th>
            <th className="text-left px-4 py-3">Orders</th><th className="text-left px-4 py-3">Total Spend</th>
            <th className="text-left px-4 py-3">Points</th><th className="text-left px-4 py-3">Last Visit</th><th className="text-left px-4 py-3">Action</th>
          </tr></thead>
          <tbody>
            {customers.map(c=>(
              <tr key={c.name} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3"><div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{background:c.color,color:c.tc}}>{c.initials}</div>
                  <div><div className="font-semibold text-sm">{c.name}</div><div className="text-xs text-gray-400">{c.email}</div></div>
                </div></td>
                <td className="px-4 py-3 text-gray-500">{c.phone}</td>
                <td className="px-4 py-3 font-bold">{c.orders}</td>
                <td className="px-4 py-3 font-bold">{c.spend.toLocaleString()} EGP</td>
                <td className="px-4 py-3"><span className="bg-[#EEF1FF] text-[#1E3ABA] text-xs font-semibold px-2 py-0.5 rounded-full">{c.points.toLocaleString()} pts</span></td>
                <td className="px-4 py-3 text-gray-500 text-xs">{c.last}</td>
                <td className="px-4 py-3"><Button variant="outline" size="sm">View</Button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
