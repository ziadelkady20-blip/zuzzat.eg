"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

export default function IntroPage() {
  const [stage, setStage] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 400);
    const t2 = setTimeout(() => setStage(2), 1000);
    const t3 = setTimeout(() => setStage(3), 1600);
    const t4 = setTimeout(() => setStage(4), 2000);
    const t5 = setTimeout(() => router.push("/dashboard"), 3200);
    return () => [t1, t2, t3, t4, t5].forEach(clearTimeout);
  }, [router]);

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center overflow-hidden">
      <AnimatePresence>
        {stage >= 1 && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="mb-4"
          >
            <svg width="110" height="110" viewBox="0 0 110 110" fill="none">
              <circle cx="55" cy="50" r="36" fill="#EEF1FF" stroke="#1E3ABA" strokeWidth="2.5" />
              <path d="M40 47 Q40 34 55 34 Q70 34 70 47" stroke="#1E3ABA" strokeWidth="2.5" fill="none" strokeLinecap="round" />
              <ellipse cx="55" cy="51" rx="17" ry="19" fill="white" stroke="#1E3ABA" strokeWidth="2" />
              <circle cx="48" cy="49" r="2.8" fill="#1E3ABA" />
              <circle cx="62" cy="49" r="2.8" fill="#1E3ABA" />
              <path d="M48 57 Q55 65 62 57" stroke="#1E3ABA" strokeWidth="2" fill="none" strokeLinecap="round" />
              <ellipse cx="43" cy="53" rx="3.5" ry="4.5" fill="#FFCDD2" opacity="0.6" />
              <ellipse cx="67" cy="53" rx="3.5" ry="4.5" fill="#FFCDD2" opacity="0.6" />
              <path d="M35 23 Q55 8 75 23 L73 34 Q55 24 37 34Z" fill="#1E3ABA" />
              <ellipse cx="79" cy="28" rx="5.5" ry="7.5" fill="#1E3ABA" transform="rotate(20 79 28)" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage >= 2 && (
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-outfit font-black text-6xl tracking-tighter mb-2"
            style={{ color: "#1E3ABA" }}
          >
            ZUZZAT
          </motion.h1>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage >= 3 && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-medium tracking-widest uppercase text-gray-400"
          >
            Stay Cool · Drink Better
          </motion.p>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {stage >= 4 && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0"
          >
            <svg viewBox="0 0 800 120" preserveAspectRatio="none" width="100%" height="120">
              <path d="M0 60 Q200 20 400 60 Q600 100 800 60 L800 120 L0 120Z" fill="#1E3ABA" opacity="0.15" />
              <path d="M0 75 Q200 40 400 75 Q600 110 800 75 L800 120 L0 120Z" fill="#1E3ABA" opacity="0.25" />
              <path d="M0 90 Q200 65 400 85 Q600 105 800 90 L800 120 L0 120Z" fill="#1E3ABA" opacity="0.6" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
