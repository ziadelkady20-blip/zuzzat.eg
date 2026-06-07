"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const NAV = [
  { section: "Overview", items: [{ href: "/dashboard", icon: "📊", label: "Dashboard" }] },
  { section: "Operations", items: [
    { href: "/pos", icon: "🖥", label: "POS System" },
    { href: "/kds", icon: "👨‍🍳", label: "Kitchen Display", badge: 4 },
    { href: "/orders", icon: "📋", label: "Orders", badge: 12 },
    { href: "/tables", icon: "🪑", label: "Table Manager" },
    { href: "/qr", icon: "📱", label: "QR Ordering" },
  ]},
  { section: "Products", items: [
    { href: "/menu-admin", icon: "🍹", label: "Menu Manager" },
    { href: "/inventory", icon: "📦", label: "Inventory" },
  ]},
  { section: "Growth", items: [
    { href: "/loyalty-admin", icon: "⭐", label: "Loyalty Program" },
    { href: "/promos", icon: "🎟", label: "Promo Codes" },
    { href: "/delivery", icon: "🛵", label: "Delivery" },
  ]},
  { section: "Business", items: [
    { href: "/customers", icon: "👥", label: "Customers" },
    { href: "/analytics", icon: "📈", label: "Analytics" },
    { href: "/settings", icon: "⚙️", label: "Settings" },
  ]},
];

export default function Sidebar() {
  const path = usePathname();
  return (
    <aside className="w-[220px] bg-white border-r border-gray-200 flex flex-col flex-shrink-0 overflow-y-auto scrollbar-thin">
      {NAV.map((group) => (
        <div key={group.section}>
          <p className="px-4 pt-4 pb-2 text-[10px] font-semibold uppercase tracking-[1.5px] text-gray-400">{group.section}</p>
          {group.items.map((item) => {
            const active = path === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 2 }}
                  className={`flex items-center gap-2.5 mx-2 px-3 py-2.5 rounded-lg text-[13.5px] font-medium cursor-pointer transition-colors relative ${
                    active ? "bg-[#1E3ABA] text-white" : "text-gray-600 hover:bg-[#EEF1FF] hover:text-[#1E3ABA]"
                  }`}
                >
                  <span className="w-5 text-center text-base">{item.icon}</span>
                  <span className="flex-1">{item.label}</span>
                  {"badge" in item && item.badge && (
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${active ? "bg-white/30 text-white" : "bg-[#FF6B6B] text-white"}`}>
                      {item.badge}
                    </span>
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      ))}
    </aside>
  );
}
