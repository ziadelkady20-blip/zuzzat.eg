// Mock firebase modules before importing
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => [{ name: "test" }]),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
}));
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(() => ({})),
}));
jest.mock("firebase/firestore", () => {
  const batchUpdate = jest.fn();
  const batchCommit = jest.fn().mockResolvedValue(undefined);
  return {
    getFirestore: jest.fn(() => ({})),
    collection: jest.fn(),
    doc: jest.fn(),
    addDoc: jest.fn(),
    updateDoc: jest.fn(),
    deleteDoc: jest.fn(),
    getDocs: jest.fn(),
    getDoc: jest.fn(),
    onSnapshot: jest.fn(),
    query: jest.fn(),
    where: jest.fn(),
    orderBy: jest.fn(),
    limit: jest.fn(),
    serverTimestamp: jest.fn(() => "mock-ts"),
    increment: jest.fn((n: number) => n),
    writeBatch: jest.fn(() => ({ update: batchUpdate, commit: batchCommit })),
    Timestamp: { now: jest.fn() },
  };
});

import {
  addDoc,
  updateDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import {
  createOrder,
  subscribeOrders,
  updateOrderStatus,
  validatePromo,
  redeemPromo,
  redeemPoints,
  subscribeInventory,
  subscribeCustomers,
} from "@/lib/firebase/firestore";

beforeEach(() => {
  jest.clearAllMocks();
});

// ── createOrder ─────────────────────────────────────────
describe("createOrder", () => {
  it("adds order doc and returns id", async () => {
    (addDoc as jest.Mock).mockResolvedValue({ id: "order-1" });
    // getDocs for inventory deduction (no usage for unknown item)
    (getDocs as jest.Mock).mockResolvedValue({ docs: [] });

    const order = {
      orderNumber: 300,
      type: "dine-in" as const,
      tableId: 1,
      items: [{ id: "99", name: "Unknown Item", price: 10, qty: 1, emoji: "❓" }],
      subtotal: 10,
      discount: 0,
      total: 10,
      paymentMethod: "cash" as const,
      status: "new" as const,
      cashier: "Bot",
    };
    const id = await createOrder(order);
    expect(addDoc).toHaveBeenCalled();
    expect(id).toBe("order-1");
  });

  it("awards loyalty points when customerId is set", async () => {
    (addDoc as jest.Mock).mockResolvedValue({ id: "order-2" });
    (getDocs as jest.Mock).mockResolvedValue({ docs: [] });
    (updateDoc as jest.Mock).mockResolvedValue(undefined);

    const order = {
      orderNumber: 301,
      type: "pickup" as const,
      customerId: "cust-1",
      customerName: "Test",
      items: [{ id: "99", name: "Unknown", price: 50, qty: 1, emoji: "❓" }],
      subtotal: 50,
      discount: 0,
      total: 50,
      paymentMethod: "cash" as const,
      status: "new" as const,
      cashier: "Bot",
    };
    await createOrder(order);
    // addDoc called for order + loyalty transaction
    expect(addDoc).toHaveBeenCalledTimes(2);
    // updateDoc called for user points/orders/totalSpend
    expect(updateDoc).toHaveBeenCalled();
  });
});

// ── subscribeOrders ─────────────────────────────────────
describe("subscribeOrders", () => {
  it("calls onSnapshot and maps docs", () => {
    const unsub = jest.fn();
    (onSnapshot as jest.Mock).mockImplementation((_q, cb) => {
      cb({
        docs: [
          { id: "o1", data: () => ({ orderNumber: 1, status: "new" }) },
        ],
      });
      return unsub;
    });

    const callback = jest.fn();
    const result = subscribeOrders(callback);
    expect(callback).toHaveBeenCalledWith([
      expect.objectContaining({ id: "o1", orderNumber: 1 }),
    ]);
    expect(result).toBe(unsub);
  });
});

// ── updateOrderStatus ───────────────────────────────────
describe("updateOrderStatus", () => {
  it("updates the correct document", async () => {
    (updateDoc as jest.Mock).mockResolvedValue(undefined);
    await updateOrderStatus("o1", "completed");
    expect(updateDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({ status: "completed" })
    );
  });
});

// ── validatePromo ───────────────────────────────────────
describe("validatePromo", () => {
  it("returns null when no matching promo is found", async () => {
    (getDocs as jest.Mock).mockResolvedValue({ empty: true });
    const result = await validatePromo("INVALID", 100);
    expect(result).toBeNull();
  });

  it("returns null when promo is expired", async () => {
    const pastDate = new Date(Date.now() - 86400000).toISOString();
    (getDocs as jest.Mock).mockResolvedValue({
      empty: false,
      docs: [{ id: "p1", data: () => ({ type: "percent", value: 0.1, endDate: pastDate, uses: 0 }) }],
    });
    const result = await validatePromo("EXPIRED", 100);
    expect(result).toBeNull();
  });

  it("returns null when max uses reached", async () => {
    (getDocs as jest.Mock).mockResolvedValue({
      empty: false,
      docs: [{ id: "p2", data: () => ({ type: "percent", value: 0.1, maxUses: 5, uses: 5 }) }],
    });
    const result = await validatePromo("MAXED", 200);
    expect(result).toBeNull();
  });

  it("calculates percent discount correctly", async () => {
    (getDocs as jest.Mock).mockResolvedValue({
      empty: false,
      docs: [{ id: "p3", data: () => ({ type: "percent", value: 0.25, uses: 0 }) }],
    });
    const result = await validatePromo("PCT25", 200);
    expect(result).not.toBeNull();
    expect(result!.discount).toBe(50); // 200 * 0.25
  });

  it("calculates fixed discount correctly", async () => {
    (getDocs as jest.Mock).mockResolvedValue({
      empty: false,
      docs: [{ id: "p4", data: () => ({ type: "fixed", value: 30, uses: 0 }) }],
    });
    const result = await validatePromo("FIXED30", 200);
    expect(result).not.toBeNull();
    expect(result!.discount).toBe(30);
  });
});

// ── redeemPromo ─────────────────────────────────────────
describe("redeemPromo", () => {
  it("increments uses on the promo doc", async () => {
    (updateDoc as jest.Mock).mockResolvedValue(undefined);
    await redeemPromo("p1");
    expect(updateDoc).toHaveBeenCalled();
  });
});

// ── redeemPoints ────────────────────────────────────────
describe("redeemPoints", () => {
  it("creates a redeem transaction and decrements user points", async () => {
    (addDoc as jest.Mock).mockResolvedValue({ id: "lt-1" });
    (updateDoc as jest.Mock).mockResolvedValue(undefined);
    await redeemPoints("cust-1", 100, "order-1");
    expect(addDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({ points: -100, type: "redeem" })
    );
    expect(updateDoc).toHaveBeenCalled();
  });
});

// ── subscribeInventory ──────────────────────────────────
describe("subscribeInventory", () => {
  it("maps inventory documents", () => {
    const unsub = jest.fn();
    (onSnapshot as jest.Mock).mockImplementation((_col, cb) => {
      cb({ docs: [{ id: "inv1", data: () => ({ name: "Coffee Beans", stock: 500 }) }] });
      return unsub;
    });
    const callback = jest.fn();
    subscribeInventory(callback);
    expect(callback).toHaveBeenCalledWith([
      expect.objectContaining({ id: "inv1", name: "Coffee Beans" }),
    ]);
  });
});

// ── subscribeCustomers ──────────────────────────────────
describe("subscribeCustomers", () => {
  it("maps customer documents", () => {
    const unsub = jest.fn();
    (onSnapshot as jest.Mock).mockImplementation((_q, cb) => {
      cb({ docs: [{ id: "c1", data: () => ({ name: "Ahmed", role: "customer" }) }] });
      return unsub;
    });
    const callback = jest.fn();
    subscribeCustomers(callback);
    expect(callback).toHaveBeenCalledWith([
      expect.objectContaining({ id: "c1", name: "Ahmed" }),
    ]);
  });
});
