"use client";
import { useStore } from "@/store";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Order } from "@/types";

const statusVariant: Record<Order["status"], "red"|"orange"|"green"|"blue"|"gray"> = {
  new: "red", preparing: "orange", ready: "green", completed: "gray", delivered: "gray", cancelled: "gray"
};
const typeVariant: Record<Order["type"], "blue"|"green"|"orange"> = { "dine-in": "blue", pickup: "green", delivery: "orange" };

export default function OrdersPage() {
  const { orders } = useStore();
  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-sm text-gray-400 mt-1">All orders today</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">📤 Export</Button>
        </div>
      </div>
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead><tr className="bg-gray-50 text-xs text-gray-500 uppercase tracking-wide">
            <th className="text-left px-4 py-3">#</th><th className="text-left px-4 py-3">Customer</th>
            <th className="text-left px-4 py-3">Type</th><th className="text-left px-4 py-3">Items</th>
            <th className="text-left px-4 py-3">Total</th><th className="text-left px-4 py-3">Payment</th>
            <th className="text-left px-4 py-3">Status</th>
          </tr></thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id} className="border-t border-gray-50 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-bold">#{order.orderNumber}</td>
                <td className="px-4 py-3">{order.type === "dine-in" ? `Table ${order.tableId}` : order.customerName}</td>
                <td className="px-4 py-3"><Badge variant={typeVariant[order.type]}>{order.type === "dine-in" ? "Dine In" : order.type === "pickup" ? "Pickup" : "Delivery"}</Badge></td>
                <td className="px-4 py-3 text-xs text-gray-500 max-w-[200px] truncate">{order.items.map(i=>`${i.emoji} ${i.name} ×${i.qty}`).join(", ")}</td>
                <td className="px-4 py-3 font-bold">{order.total} EGP</td>
                <td className="px-4 py-3 capitalize text-xs">{order.paymentMethod}</td>
                <td className="px-4 py-3"><Badge variant={statusVariant[order.status]}>{order.status}</Badge></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
