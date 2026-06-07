import CustomerNav from "@/components/customer/CustomerNav";
import CustomerFooter from "@/components/customer/CustomerFooter";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col" style={{ fontFamily: "'Poppins',sans-serif" }}>
      <CustomerNav />
      <main className="flex-1">{children}</main>
      <CustomerFooter />
    </div>
  );
}
