export type Role = "superadmin" | "admin" | "cashier" | "kitchen" | "inventory" | "customer";

export interface CartItem {
  id: string;
  name: string;
  price: number;
  qty: number;
  emoji: string;
  notes?: string;
}

export interface Order {
  id: string;
  orderNumber: number;
  type: "dine-in" | "pickup" | "delivery";
  tableId?: number;
  customerId?: string;
  customerName?: string;
  phone?: string;
  address?: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  total: number;
  promoCode?: string;
  paymentMethod: "cash" | "vodafone" | "instapay";
  status: "new" | "preparing" | "ready" | "completed" | "delivered" | "cancelled";
  createdAt: Date;
  cashier: string;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  unit: string;
  minLevel: number;
  emoji: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  totalSpend: number;
  points: number;
  lastVisit: string;
}

export interface PromoCode {
  id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  uses: number;
  maxUses: number;
  expiresAt: string;
  active: boolean;
  description: string;
}
