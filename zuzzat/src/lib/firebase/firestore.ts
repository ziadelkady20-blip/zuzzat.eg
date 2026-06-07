import {
  collection, doc, addDoc, updateDoc, deleteDoc,
  getDocs, getDoc, onSnapshot, query, where, orderBy,
  limit, serverTimestamp, increment, writeBatch,
  Timestamp,
} from "firebase/firestore";
import { db } from "./config";
import { Order, CartItem } from "@/types";

// ── ORDERS ──────────────────────────────────────────────
export async function createOrder(order: Omit<Order, "id" | "createdAt">) {
  const ref = await addDoc(collection(db, "orders"), {
    ...order,
    createdAt: serverTimestamp(),
  });
  // deduct inventory
  for (const item of order.items) {
    await deductInventoryForItem(item);
  }
  // add loyalty points
  if (order.customerId) {
    await addDoc(collection(db, "loyaltyTransactions"), {
      customerId: order.customerId,
      orderId: ref.id,
      points: Math.floor(order.total),
      type: "earn",
      createdAt: serverTimestamp(),
    });
    await updateDoc(doc(db, "users", order.customerId), {
      points: increment(Math.floor(order.total)),
      orders: increment(1),
      totalSpend: increment(order.total),
    });
  }
  return ref.id;
}

export function subscribeOrders(cb: (orders: Order[]) => void) {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"), limit(100));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order)));
  });
}

export async function updateOrderStatus(id: string, status: Order["status"]) {
  await updateDoc(doc(db, "orders", id), { status, updatedAt: serverTimestamp() });
}

// ── INVENTORY ────────────────────────────────────────────
async function deductInventoryForItem(item: CartItem) {
  // Mapping product → ingredient usage (simplified)
  const usageMap: Record<string, Array<{ name: string; amount: number }>> = {
    "Ice Matcha Latte":   [{ name: "Matcha Powder", amount: 15 }, { name: "Oat Milk", amount: 200 }],
    "Mojito Classic":     [{ name: "Fresh Mint", amount: 5 }, { name: "Ice", amount: 100 }],
    "Ice Cold Brew":      [{ name: "Coffee Beans", amount: 20 }],
    "Iced Americano":     [{ name: "Coffee Beans", amount: 18 }],
    "Mango Frappe":       [{ name: "Mango Puree", amount: 150 }],
    "Strawberry Milkshake": [{ name: "Strawberry Syrup", amount: 30 }, { name: "Full Cream Milk", amount: 250 }],
  };
  const usage = usageMap[item.name];
  if (!usage) return;
  const q = query(collection(db, "inventory"), where("name", "in", usage.map((u) => u.name)));
  const snap = await getDocs(q);
  const batch = writeBatch(db);
  snap.docs.forEach((d) => {
    const u = usage.find((x) => x.name === d.data().name);
    if (u) batch.update(d.ref, { stock: increment(-u.amount * item.qty) });
  });
  await batch.commit();
}

export function subscribeInventory(cb: (items: any[]) => void) {
  return onSnapshot(collection(db, "inventory"), (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}

// ── PROMO CODES ──────────────────────────────────────────
export async function validatePromo(code: string, subtotal: number) {
  const q = query(collection(db, "promoCodes"), where("code", "==", code.toUpperCase()), where("active", "==", true));
  const snap = await getDocs(q);
  if (snap.empty) return null;
  const promo = snap.docs[0].data();
  if (promo.endDate && new Date(promo.endDate) < new Date()) return null;
  if (promo.maxUses && promo.uses >= promo.maxUses) return null;
  const discount = promo.type === "percent" ? Math.round(subtotal * promo.value) : promo.value;
  return { id: snap.docs[0].id, code, discount, promo };
}

export async function redeemPromo(promoId: string) {
  await updateDoc(doc(db, "promoCodes", promoId), { uses: increment(1) });
}

// ── LOYALTY ──────────────────────────────────────────────
export async function redeemPoints(customerId: string, points: number, orderId: string) {
  await addDoc(collection(db, "loyaltyTransactions"), {
    customerId, orderId, points: -points, type: "redeem", createdAt: serverTimestamp(),
  });
  await updateDoc(doc(db, "users", customerId), { points: increment(-points) });
}

// ── CUSTOMERS ────────────────────────────────────────────
export function subscribeCustomers(cb: (customers: any[]) => void) {
  const q = query(collection(db, "users"), where("role", "==", "customer"), orderBy("totalSpend", "desc"));
  return onSnapshot(q, (snap) => {
    cb(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
  });
}
