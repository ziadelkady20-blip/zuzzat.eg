import { Role } from "@/types";

export const BRAND_COLOR = "#1E3ABA";
export const BRAND_COLOR_LIGHT = "#EEF1FF";
export const BRAND_COLOR_HOVER = "#2847D4";

export const ROLE_HOME_PATHS: Record<Role, string> = {
  superadmin: "/dashboard",
  admin: "/dashboard",
  cashier: "/pos",
  kitchen: "/kds",
  inventory: "/inventory",
  customer: "/home",
};

export const TABLE_STATUS_STYLES: Record<string, string> = {
  available: "bg-green-50 border-green-200 text-green-700",
  occupied: "bg-red-50 border-red-200 text-red-500",
  reserved: "bg-orange-50 border-orange-200 text-orange-600",
  pickup: "bg-[#EEF1FF] border-[#C7CFFE] text-[#1E3ABA]",
};

export const TABLE_STATUS_ICONS: Record<string, string> = {
  available: "🪑",
  occupied: "🍹",
  reserved: "📅",
  pickup: "📦",
};
