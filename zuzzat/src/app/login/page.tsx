"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { loginUser } from "@/lib/firebase/auth";
import { Role } from "@/types";
import { ROLE_HOME_PATHS } from "@/lib/constants";
import ZuzzatLogo from "@/components/ui/ZuzzatLogo";

// Demo credentials for testing without Firebase
const DEMO_USERS: Record<string, { password: string; role: Role; name: string }> = {
  "admin@zuzzat.com":     { password: "zuzzat123", role: "superadmin", name: "Super Admin" },
  "cashier@zuzzat.com":   { password: "zuzzat123", role: "cashier",    name: "Cashier" },
  "kitchen@zuzzat.com":   { password: "zuzzat123", role: "kitchen",    name: "Kitchen Staff" },
  "customer@zuzzat.com":  { password: "zuzzat123", role: "customer",   name: "Customer" },
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(""); setLoading(true);
    try {
      // Try demo login first
      const demo = DEMO_USERS[email.toLowerCase()];
      if (demo && demo.password === password) {
        if (typeof window !== "undefined") {
          localStorage.setItem("zuzzat_role", demo.role);
          localStorage.setItem("zuzzat_name", demo.name);
        }
        router.push(ROLE_HOME_PATHS[demo.role]);
        return;
      }
      // Try Firebase
      const { role } = await loginUser(email, password);
      router.push(ROLE_HOME_PATHS[role]);
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'Poppins', sans-serif" }}>
      {/* Left panel */}
      <div className="hidden lg:flex flex-col justify-between w-[420px] flex-shrink-0 p-10" style={{ background: "#1E3ABA" }}>
        <div>
          <div className="flex items-center gap-3 mb-16">
            <ZuzzatLogo size={44} variant="white" />
            <div>
              <div className="text-white font-black text-2xl tracking-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>ZUZZAT</div>
              <div className="text-white/50 text-xs">Coffee Shop Platform</div>
            </div>
          </div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <h2 className="text-white text-3xl font-bold leading-tight mb-4">Welcome back to ZUZZAT ☕</h2>
            <p className="text-white/60 text-sm leading-relaxed">Your all-in-one platform for orders, inventory, loyalty, and more.</p>
          </motion.div>
        </div>
        {/* Demo accounts */}
        <div className="bg-white/10 rounded-2xl p-5">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wider mb-3">Demo Accounts</p>
          {Object.entries(DEMO_USERS).map(([email, { role }]) => (
            <button key={email} onClick={() => { setEmail(email); setPassword("zuzzat123"); }}
              className="w-full flex items-center gap-2 py-2 text-left hover:bg-white/10 rounded-lg px-2 transition-colors">
              <span className="text-white text-xs font-semibold">{email}</span>
              <span className="ml-auto text-white/40 text-[10px] capitalize">{role}</span>
            </button>
          ))}
          <p className="text-white/40 text-[10px] mt-2">Password: zuzzat123</p>
        </div>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8 bg-gray-50">
        <motion.div className="w-full max-w-sm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
            <ZuzzatLogo size={36} />
            <span className="font-black text-2xl text-[#1E3ABA]" style={{ fontFamily: "'Outfit',sans-serif" }}>ZUZZAT</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-1">Sign in</h1>
          <p className="text-sm text-gray-400 mb-8">Enter your credentials to continue</p>

          {error && <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-4 border border-red-100">{error}</div>}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">Email Address</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1E3ABA] focus:ring-2 focus:ring-[#1E3ABA]/10 transition-all"
                placeholder="you@zuzzat.com"/>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#1E3ABA] focus:ring-2 focus:ring-[#1E3ABA]/10 transition-all"
                placeholder="••••••••"/>
            </div>
            <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
              className="w-full py-3 rounded-xl font-semibold text-white text-sm transition-all mt-2 disabled:opacity-60"
              style={{ background: "#1E3ABA" }}>
              {loading ? "Signing in..." : "Sign In →"}
            </motion.button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            New customer?{" "}
            <Link href="/register" className="text-[#1E3ABA] font-semibold hover:underline">Create account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
