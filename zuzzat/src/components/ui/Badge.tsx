type Variant = "blue" | "green" | "orange" | "red" | "gray";
const styles: Record<Variant, string> = {
  blue: "bg-[#EEF1FF] text-[#1E3ABA]",
  green: "bg-green-50 text-green-700",
  orange: "bg-orange-50 text-orange-600",
  red: "bg-red-50 text-red-500",
  gray: "bg-gray-100 text-gray-500",
};
export default function Badge({ children, variant = "gray" }: { children: React.ReactNode; variant?: Variant }) {
  return <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${styles[variant]}`}>{children}</span>;
}
