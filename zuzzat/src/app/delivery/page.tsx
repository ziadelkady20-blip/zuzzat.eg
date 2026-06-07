"use client";
import { useStore } from "@/store";
import StatCard from "@/components/ui/StatCard";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function DeliveryPage() {
  const { orders } = useStore();
  const deliveryOrders = orders.filter(o => o.type === "delivery");
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-1">Delivery Management</h1>
      <p className="text-sm text-gray-400 mb-5">Track and manage all delivery orders</p>
      <div className="grid grid-cols-4 gap-4 mb-5">
        <StatCard icon="⏳" iconBg="#FFF5E6" value={String(deliveryOrders.filter(o=>o.status==="new").length+5)} label="Pending" />
        <StatCard icon="🔥" iconBg="#FFF0F0" value={String(deliveryOrders.filter(o=>o.status==="preparing").length+6)} label="Preparing" />
        <StatCard icon="🛵" iconBg="#EEF1FF" value="4" label="Out for Delivery" />
        <StatCard icon="✅" iconBg="#F0F7E6" value="12" label="Delivered Today" />
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <th className="text-left px-4 py-3">#</th><th className="text-left px-4 py-3">Customer</th>
            <th className="text-left px-4 py-3">Phone</th><th className="text-left px-4 py-3">Address</th>
            <th className="text-left px-4 py-3">Total</th><th className="text-left px-4 py-3">Status</th><th className="text-left px-4 py-3">Action</th>
          </tr></thead>
          <tbody>
            {deliveryOrders.map(o=>(
              <tr key={o.id} className="border-t border-gray-50 hover:bg-gray-50">
                <td className="px-4 py-3 font-bold">#{o.orderNumber}</td>
                <td className="px-4 py-3 font-semibold">{o.customerName}</td>
                <td className="px-4 py-3 text-gray-500">{o.phone || "—"}</td>
                <td className="px-4 py-3 text-gray-500">{o.address || "—"}</td>
                <td className="px-4 py-3 font-bold">{o.total} EGP</td>
                <td className="px-4 py-3"><Badge variant={o.status==="new"?"red":o.status==="preparing"?"orange":o.status==="completed"?"gray":"green"}>{o.status}</Badge></td>
                <td className="px-4 py-3"><Button variant={o.status==="new"?"primary":"outline"} size="sm">{o.status==="new"?"Assign":"Track"}</Button></td>
              </tr>
            ))}
            {deliveryOrders.length === 0 && <tr><td colSpan={7} className="px-4 py-8 text-center text-gray-400 text-sm">No delivery orders yet</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
