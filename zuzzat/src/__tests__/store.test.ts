import { useStore } from "@/store";

// Reset store between tests
beforeEach(() => {
  useStore.setState({
    role: "superadmin",
    cart: [],
    promoCode: "",
    promoDiscount: 0,
    orders: [],
    sidebarOpen: true,
  });
});

// ── Cart ────────────────────────────────────────────────
describe("cart management", () => {
  const item = { id: "1", name: "Ice Cold Brew", price: 55, emoji: "☕" };

  it("adds an item with qty 1", () => {
    useStore.getState().addToCart(item);
    const cart = useStore.getState().cart;
    expect(cart).toHaveLength(1);
    expect(cart[0]).toEqual({ ...item, qty: 1 });
  });

  it("increments qty when adding the same item twice", () => {
    const { addToCart } = useStore.getState();
    addToCart(item);
    useStore.getState().addToCart(item);
    const cart = useStore.getState().cart;
    expect(cart).toHaveLength(1);
    expect(cart[0].qty).toBe(2);
  });

  it("adds different items separately", () => {
    const item2 = { id: "2", name: "Iced Americano", price: 45, emoji: "🧋" };
    useStore.getState().addToCart(item);
    useStore.getState().addToCart(item2);
    expect(useStore.getState().cart).toHaveLength(2);
  });

  it("removes an item by id", () => {
    useStore.getState().addToCart(item);
    useStore.getState().removeFromCart("1");
    expect(useStore.getState().cart).toHaveLength(0);
  });

  it("updates quantity for an existing item", () => {
    useStore.getState().addToCart(item);
    useStore.getState().updateQty("1", 5);
    expect(useStore.getState().cart[0].qty).toBe(5);
  });

  it("removes item when quantity is set to 0", () => {
    useStore.getState().addToCart(item);
    useStore.getState().updateQty("1", 0);
    expect(useStore.getState().cart).toHaveLength(0);
  });

  it("removes item when quantity is set to negative", () => {
    useStore.getState().addToCart(item);
    useStore.getState().updateQty("1", -1);
    expect(useStore.getState().cart).toHaveLength(0);
  });

  it("clearCart empties cart and resets promo", () => {
    useStore.getState().addToCart(item);
    useStore.getState().setPromo("SUMMER25", 0.25);
    useStore.getState().clearCart();
    const s = useStore.getState();
    expect(s.cart).toHaveLength(0);
    expect(s.promoCode).toBe("");
    expect(s.promoDiscount).toBe(0);
  });
});

// ── Promo ───────────────────────────────────────────────
describe("promo management", () => {
  it("sets promo code and discount", () => {
    useStore.getState().setPromo("MATCHA10", 0.1);
    const s = useStore.getState();
    expect(s.promoCode).toBe("MATCHA10");
    expect(s.promoDiscount).toBe(0.1);
  });
});

// ── Orders ──────────────────────────────────────────────
describe("order management", () => {
  const order = {
    id: "test-1",
    orderNumber: 200,
    type: "dine-in" as const,
    tableId: 1,
    items: [{ id: "1", name: "Ice Cold Brew", price: 55, qty: 1, emoji: "☕" }],
    subtotal: 55,
    discount: 0,
    total: 55,
    paymentMethod: "cash" as const,
    status: "new" as const,
    createdAt: new Date(),
    cashier: "Test",
  };

  it("adds an order to the front of the list", () => {
    useStore.getState().addOrder(order);
    const orders = useStore.getState().orders;
    expect(orders).toHaveLength(1);
    expect(orders[0].id).toBe("test-1");
  });

  it("prepends new orders", () => {
    useStore.getState().addOrder(order);
    const order2 = { ...order, id: "test-2", orderNumber: 201 };
    useStore.getState().addOrder(order2);
    expect(useStore.getState().orders[0].id).toBe("test-2");
  });

  it("updates order status", () => {
    useStore.getState().addOrder(order);
    useStore.getState().updateOrderStatus("test-1", "preparing");
    expect(useStore.getState().orders[0].status).toBe("preparing");
  });

  it("does not affect other orders when updating status", () => {
    const order2 = { ...order, id: "test-2", orderNumber: 201 };
    useStore.getState().addOrder(order);
    useStore.getState().addOrder(order2);
    useStore.getState().updateOrderStatus("test-1", "completed");
    expect(useStore.getState().orders.find((o) => o.id === "test-2")?.status).toBe("new");
  });
});

// ── Role ────────────────────────────────────────────────
describe("role management", () => {
  it("defaults to superadmin", () => {
    expect(useStore.getState().role).toBe("superadmin");
  });

  it("sets role", () => {
    useStore.getState().setRole("cashier");
    expect(useStore.getState().role).toBe("cashier");
  });
});

// ── Sidebar ─────────────────────────────────────────────
describe("sidebar toggle", () => {
  it("defaults to open", () => {
    expect(useStore.getState().sidebarOpen).toBe(true);
  });

  it("toggles sidebar closed then open", () => {
    useStore.getState().toggleSidebar();
    expect(useStore.getState().sidebarOpen).toBe(false);
    useStore.getState().toggleSidebar();
    expect(useStore.getState().sidebarOpen).toBe(true);
  });
});
