"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { registerCustomer } from "@/lib/firebase/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = form.name.trim();
    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      setError("Name must be between 2 and 100 characters"); return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setError("Please enter a valid email address"); return;
    }
    const phoneRegex = /^[\d\s\-+()]{7,20}$/;
    if (form.phone && !phoneRegex.test(form.phone)) {
      setError("Please enter a valid phone number"); return;
    }
    if (form.password.length < 8) {
      setError("Password must be at least 8 characters"); return;
    }
    if (!/[A-Z]/.test(form.password) || !/[a-z]/.test(form.password) || !/\d/.test(form.password)) {
      setError("Password must contain uppercase, lowercase, and a number"); return;
    }
    if (form.password !== form.confirm) { setError("Passwords don't match"); return; }
    setError(""); setLoading(true);
    try {
      await registerCustomer(trimmedName, form.email.trim(), form.password, form.phone.trim());
      router.push("/home");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Registration failed";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6" style={{ fontFamily: "'Poppins',sans-serif" }}>
      <motion.div className="w-full max-w-md bg-white rounded-2xl shadow-sm border border-gray-200 p-8" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-2 mb-8">
          <svg width="36" height="36" viewBox="0 0 110 110" fill="none">
            <circle cx="55" cy="50" r="36" fill="#EEF1FF" stroke="#1E3ABA" strokeWidth="2.5"/>
            <ellipse cx="55" cy="51" rx="17" ry="19" fill="white" stroke="#1E3ABA" strokeWidth="2"/>
            <circle cx="48" cy="49" r="2.8" fill="#1E3ABA"/><circle cx="62" cy="49" r="2.8" fill="#1E3ABA"/>
            <path d="M48 57 Q55 65 62 57" stroke="#1E3ABA" strokeWidth="2" fill="none" strokeLinecap="round"/>
            <path d="M35 23 Q55 8 75 23 L73 34 Q55 24 37 34Z" fill="#1E3ABA"/>
          </svg>
          <span className="font-black text-2xl text-[#1E3ABA]" style={{ fontFamily:"'Outfit',sans-serif" }}>ZUZZAT</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Create Account</h1>
        <p className="text-sm text-gray-400 mb-6">Join ZUZZAT and start earning points</p>

        {error && <div className="bg-red-50 text-red-500 text-sm px-4 py-3 rounded-xl mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {[
            { label: "Full Name", key: "name", type: "text", placeholder: "Ahmed Mohamed" },
            { label: "Email", key: "email", type: "email", placeholder: "ahmed@gmail.com" },
            { label: "Phone", key: "phone", type: "tel", placeholder: "010-XXXX-XXXX" },
            { label: "Password", key: "password", type: "password", placeholder: "min. 8 chars, upper+lower+number" },
            { label: "Confirm Password", key: "confirm", type: "password", placeholder: "repeat password" },
          ].map(f => (
            <div key={f.key}>
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">{f.label}</label>
              <input type={f.type} placeholder={f.placeholder} value={form[f.key as keyof typeof form]}
                onChange={e => set(f.key, e.target.value)} required
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#1E3ABA] focus:ring-2 focus:ring-[#1E3ABA]/10 transition-all"/>
            </div>
          ))}
          <motion.button type="submit" disabled={loading} whileTap={{ scale: 0.98 }}
            className="w-full py-3 rounded-xl font-semibold text-white text-sm mt-2 disabled:opacity-60"
            style={{ background: "#1E3ABA" }}>
            {loading ? "Creating account..." : "Create Account →"}
          </motion.button>
        </form>
        <p className="text-center text-sm text-gray-400 mt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-[#1E3ABA] font-semibold hover:underline">Sign in</Link>
        </p>
      </motion.div>
    </div>
  );
}
