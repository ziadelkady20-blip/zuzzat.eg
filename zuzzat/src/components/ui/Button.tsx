"use client";
import { motion } from "framer-motion";
type Variant = "primary" | "outline" | "danger" | "ghost";
const styles: Record<Variant, string> = {
  primary: "bg-[#1E3ABA] text-white hover:bg-[#2847D4]",
  outline: "bg-white text-[#1E3ABA] border border-[#1E3ABA] hover:bg-[#EEF1FF]",
  danger: "bg-[#FF6B6B] text-white hover:opacity-85",
  ghost: "text-gray-600 hover:bg-gray-100",
};
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> { variant?: Variant; size?: "sm" | "md"; }
export default function Button({ variant = "primary", size = "md", className = "", children, ...props }: Props) {
  return (
    <motion.button whileTap={{ scale: 0.97 }}
      className={`inline-flex items-center gap-2 font-semibold rounded-xl transition-colors cursor-pointer font-poppins ${size === "sm" ? "px-3.5 py-1.5 text-xs" : "px-4 py-2.5 text-sm"} ${styles[variant]} ${className}`}
      {...(props as any)}
    >{children}</motion.button>
  );
}
