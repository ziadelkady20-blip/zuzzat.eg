import { create } from "zustand";
import { CartItem, Order, Role } from "@/types";

interface AppState {
  role: Role;
  setRole: (role: Role) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "qty">) => void;
  removeFromCart: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clearCart: () => void;
  promoCode: string;
  promoDiscount: number;
  setPromo: (code: string, discount: number) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (id: string, status: Order["status"]) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
}

export const useStore = create<AppState>((set) => ({
  role: "superadmin",
  setRole: (role) => set({ role }),
  cart: [],
  addToCart: (item) =>
    set((state) => {
      const existing = state.cart.find((c) => c.id === item.id);
      if (existing) return { cart: state.cart.map((c) => c.id === item.id ? { ...c, qty: c.qty + 1 } : c) };
      return { cart: [...state.cart, { ...item, qty: 1 }] };
    }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter((c) => c.id !== id) })),
  updateQty: (id, qty) =>
    set((state) => ({
      cart: qty <= 0 ? state.cart.filter((c) => c.id !== id) : state.cart.map((c) => c.id === id ? { ...c, qty } : c),
    })),
  clearCart: () => set({ cart: [], promoCode: "", promoDiscount: 0 }),
  promoCode: "",
  promoDiscount: 0,
  setPromo: (code, discount) => set({ promoCode: code, promoDiscount: discount }),
  orders: [
    { id: "o1", orderNumber: 142, type: "dine-in", tableId: 7, items: [{ id: "4", name: "Ice Matcha Latte", price: 70, qty: 2, emoji: "🍵" }, { id: "6", name: "Mojito Classic", price: 50, qty: 1, emoji: "🧃" }], subtotal: 190, discount: 0, total: 190, paymentMethod: "cash", status: "new", createdAt: new Date(), cashier: "Admin" },
    { id: "o2", orderNumber: 141, type: "pickup", customerName: "Ahmed Mohamed", items: [{ id: "1", name: "Ice Cold Brew", price: 55, qty: 1, emoji: "☕" }], subtotal: 55, discount: 0, total: 55, paymentMethod: "vodafone", status: "preparing", createdAt: new Date(), cashier: "Admin" },
    { id: "o3", orderNumber: 140, type: "delivery", customerName: "Sara Khalil", phone: "011-9876-5432", address: "Heliopolis, Cairo", items: [{ id: "12", name: "Strawberry Milkshake", price: 75, qty: 1, emoji: "🍓" }, { id: "7", name: "Passion Mojito", price: 55, qty: 1, emoji: "🧃" }], subtotal: 130, discount: 0, total: 130, paymentMethod: "instapay", status: "preparing", createdAt: new Date(), cashier: "Admin" },
    { id: "o4", orderNumber: 139, type: "dine-in", tableId: 2, items: [{ id: "3", name: "Caramel Ice Latte", price: 65, qty: 1, emoji: "☕" }, { id: "9", name: "Oreo Frappe", price: 70, qty: 2, emoji: "🥤" }], subtotal: 205, discount: 0, total: 205, paymentMethod: "cash", status: "ready", createdAt: new Date(), cashier: "Admin" },
  ],
  addOrder: (order) => set((state) => ({ orders: [order, ...state.orders] })),
  updateOrderStatus: (id, status) =>
    set((state) => ({ orders: state.orders.map((o) => o.id === id ? { ...o, status } : o) })),
  sidebarOpen: true,
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
}));
