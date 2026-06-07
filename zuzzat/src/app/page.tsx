"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const [stage, setStage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 300);
    const t2 = setTimeout(() => setStage(2), 900);
    const t3 = setTimeout(() => setStage(3), 1500);
    const t4 = setTimeout(() => setStage(4), 1900);
    const t5 = setTimeout(() => {
      const role = typeof window !== "undefined" ? localStorage.getItem("zuzzat_role") : null;
      if (role) {
        const paths: Record<string, string> = {
          superadmin: "/dashboard", admin: "/dashboard",
          cashier: "/pos", kitchen: "/kds",
          inventory: "/inventory", customer: "/home",
        };
        router.push(paths[role] ?? "/login");
      } else {
        router.push("/login");
      }
    }, 3000);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center overflow-hidden" style={{ fontFamily:"'Poppins',sans-serif" }}>
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div key="mascot"
            initial={{ scale: 0.4, opacity: 0, rotate: -10 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="mb-5"
          >
            <svg width="120" height="120" viewBox="0 0 110 110" fill="none">
              <circle cx="55" cy="50" r="36" fill="#EEF1FF" stroke="#1E3ABA" strokeWidth="2.5"/>
              <path d="M40 47 Q40 34 55 34 Q70 34 70 47" stroke="#1E3ABA" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
              <ellipse cx="55" cy="51" rx="17" ry="19" fill="white" stroke="#1E3ABA" strokeWidth="2"/>
              <circle cx="48" cy="49" r="2.8" fill="#1E3ABA"/>
              <circle cx="62" cy="49" r="2.8" fill="#1E3ABA"/>
              <path d="M48 57 Q55 65 62 57" stroke="#1E3ABA" strokeWidth="2" fill="none" strokeLinecap="round"/>
              <ellipse cx="43" cy="53" rx="3.5" ry="4.5" fill="#FFCDD2" opacity="0.6"/>
              <ellipse cx="67" cy="53" rx="3.5" ry="4.5" fill="#FFCDD2" opacity="0.6"/>
              <path d="M35 23 Q55 8 75 23 L73 34 Q55 24 37 34Z" fill="#1E3ABA"/>
              <ellipse cx="79" cy="28" rx="5.5" ry="7.5" fill="#1E3ABA" transform="rotate(20 79 28)"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage >= 2 && (
          <motion.h1 key="logo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-black text-6xl tracking-tighter mb-2"
            style={{ fontFamily:"'Outfit',sans-serif", color:"#1E3ABA" }}
          >
            ZUZZAT
          </motion.h1>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage >= 3 && (
          <motion.p key="tagline"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium tracking-[3px] uppercase text-gray-400 mb-2"
          >
            Stay Cool · Drink Better
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage >= 4 && (
          <motion.div key="dots" initial={{ opacity:0 }} animate={{ opacity:1 }} className="flex gap-1.5 mt-4">
            {[0,1,2].map(i => (
              <motion.div key={i} className="w-2 h-2 rounded-full" style={{ background:"#1E3ABA" }}
                animate={{ opacity:[0.3,1,0.3] }} transition={{ duration:1, repeat:Infinity, delay:i*0.2 }}/>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage >= 4 && (
          <motion.div key="wave" initial={{ opacity:0, y:30 }} animate={{ opacity:1, y:0 }} className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 800 100" preserveAspectRatio="none" width="100%" height="100">
              <path d="M0 60 Q200 20 400 60 Q600 100 800 60 L800 100 L0 100Z" fill="#1E3ABA" opacity="0.12"/>
              <path d="M0 72 Q200 40 400 72 Q600 104 800 72 L800 100 L0 100Z" fill="#1E3ABA" opacity="0.22"/>
              <path d="M0 85 Q200 65 400 82 Q600 100 800 85 L800 100 L0 100Z" fill="#1E3ABA" opacity="0.55"/>
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
