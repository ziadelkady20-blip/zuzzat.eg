import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ZUZZAT — Stay Cool, Drink Better",
  description: "Enterprise Cafe & Beverage Management Platform",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
