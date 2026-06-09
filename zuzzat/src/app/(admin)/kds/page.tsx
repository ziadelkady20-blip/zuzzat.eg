"use client";
import { useStore } from "@/store";
import { Order } from "@/types";
import Button from "@/components/ui/Button";

const statusCols: { status: Order["status"]; label: string; color: string; bg: string; borderColor: string }[] = [
  { status: "new", label: "New", color: "#FF6B6B", bg: "bg-red-50", borderColor: "border-t-[#FF6B6B]" },
  { status: "preparing", label: "Preparing", color: "#F5A623", bg: "bg-orange-50", borderColor: "border-t-[#F5A623]" },
  { status: "ready", label: "Ready", color: "#A4B55A", bg: "bg-green-50", borderColor: "border-t-[#A4B55A]" },
];

export default function KDSPage() {
  const { orders, updateOrderStatus } = useStore();
  const activeOrders = orders.filter(o => ["new", "preparing", "ready"].includes(o.status));

  return (
    <div className="p-6">
      <div className="flex justify-between items-start mb-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Kitchen Display 👨‍🍳</h1>
          <p className="text-sm text-gray-400 mt-1">Real-time order management</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500"><div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />Live</div>
          <Button variant="outline" size="sm">🔊 Sound On</Button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {statusCols.map(col => {
          const colOrders = activeOrders.filter(o => o.status === col.status);
          return (
            <div key={col.status}>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs font-bold px-2.5 py-1 rounded-full" style={{ background: col.bg.replace("bg-","#").replace("-50","1A"), color: col.color }}>
                  ● {col.label} ({colOrders.length})
                </span>
              </div>
              <div className="flex flex-col gap-3">
                {colOrders.length === 0 && <div className="bg-white border border-gray-100 rounded-xl p-6 text-center text-xs text-gray-400">No {col.label.toLowerCase()} orders</div>}
                {colOrders.map(order => (
                  <div key={order.id} className={`bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm border-t-4 ${col.borderColor}`}>
                    <div className="flex justify-between items-start p-3">
                      <div>
                        <div className="font-bold text-sm">Order #{order.orderNumber}</div>
                        <div className="text-xs text-gray-400 mt-0.5">
                          {order.type === "dine-in" ? `Table ${order.tableId}` : order.type === "pickup" ? `Pickup • ${order.customerName}` : `Delivery • ${order.customerName}`}
                        </div>
                      </div>
                      <span className="text-xs font-bold px-2 py-1 rounded-full" style={{ background: `${col.color}20`, color: col.color }}>
                        {new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </span>
                    </div>
                    <div className="border-t border-gray-50 px-3 py-2">
                      {order.items.map(item => (
                        <div key={item.id} className="flex justify-between py-1.5 border-b border-gray-50 text-xs">
                          <span>{item.emoji} {item.name}</span>
                          <span className="font-bold">×{item.qty}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 p-3">
                      {col.status === "new" && <Button variant="primary" size="sm" className="flex-1" onClick={() => updateOrderStatus(order.id, "preparing")}>Start Preparing</Button>}
                      {col.status === "preparing" && <button onClick={() => updateOrderStatus(order.id, "ready")} className="flex-1 text-xs font-bold py-1.5 rounded-lg bg-orange-50 text-orange-600 hover:bg-orange-100 transition-colors">Mark Ready ✓</button>}
                      {col.status === "ready" && <button onClick={() => updateOrderStatus(order.id, "completed")} className="flex-1 text-xs font-bold py-1.5 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">Complete ✓</button>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
