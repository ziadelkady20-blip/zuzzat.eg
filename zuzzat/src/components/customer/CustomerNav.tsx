"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ZuzzatLogo from "@/components/ui/ZuzzatLogo";

const LINKS = [
  { href: "/home", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/offers", label: "Offers" },
  { href: "/loyalty", label: "Loyalty" },
  { href: "/about", label: "About" },
];

export default function CustomerNav() {
  const path = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/home" className="flex items-center gap-2.5">
          <ZuzzatLogo size={36} />
          <span className="font-black text-xl text-[#1E3ABA]" style={{ fontFamily:"'Outfit',sans-serif" }}>ZUZZAT</span>
        </Link>

        <div className="hidden md:flex items-center gap-1">
          {LINKS.map(l => (
            <Link key={l.href} href={l.href}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${path === l.href ? "bg-[#EEF1FF] text-[#1E3ABA]" : "text-gray-600 hover:text-[#1E3ABA] hover:bg-gray-50"}`}>
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link href="/account"
            className="hidden md:flex items-center gap-2 text-sm font-semibold text-[#1E3ABA] border border-[#1E3ABA] px-4 py-2 rounded-xl hover:bg-[#EEF1FF] transition-colors">
            My Account
          </Link>
          <Link href="/menu"
            className="text-sm font-semibold text-white px-4 py-2 rounded-xl transition-colors"
            style={{ background: "#1E3ABA" }}>
            Order Now
          </Link>
          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            <div className="w-5 h-0.5 bg-gray-700 mb-1"/><div className="w-5 h-0.5 bg-gray-700 mb-1"/><div className="w-5 h-0.5 bg-gray-700"/>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden overflow-hidden border-t border-gray-100">
            <div className="px-6 py-4 flex flex-col gap-1">
              {LINKS.map(l => <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-sm font-medium text-gray-700">{l.label}</Link>)}
              <Link href="/account" onClick={() => setOpen(false)} className="py-2 text-sm font-semibold text-[#1E3ABA]">My Account</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
