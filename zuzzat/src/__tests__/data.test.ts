import { MENU_ITEMS, CATEGORIES, TABLES, PROMO_CODES } from "@/lib/data";

describe("MENU_ITEMS", () => {
  it("has at least one item", () => {
    expect(MENU_ITEMS.length).toBeGreaterThan(0);
  });

  it("each item has required fields", () => {
    for (const item of MENU_ITEMS) {
      expect(item).toHaveProperty("id");
      expect(item).toHaveProperty("name");
      expect(item).toHaveProperty("category");
      expect(item).toHaveProperty("price");
      expect(item).toHaveProperty("emoji");
      expect(item).toHaveProperty("available");
      expect(item).toHaveProperty("description");
    }
  });

  it("all ids are unique", () => {
    const ids = MENU_ITEMS.map((i) => i.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all prices are positive numbers", () => {
    for (const item of MENU_ITEMS) {
      expect(item.price).toBeGreaterThan(0);
    }
  });

  it("each item belongs to a known category", () => {
    const categoryIds = CATEGORIES.map((c) => c.id).filter((id) => id !== "all");
    for (const item of MENU_ITEMS) {
      expect(categoryIds).toContain(item.category);
    }
  });
});

describe("CATEGORIES", () => {
  it("starts with 'all'", () => {
    expect(CATEGORIES[0].id).toBe("all");
  });

  it("each category has id and label", () => {
    for (const cat of CATEGORIES) {
      expect(cat.id).toBeTruthy();
      expect(cat.label).toBeTruthy();
    }
  });

  it("has unique ids", () => {
    const ids = CATEGORIES.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

describe("TABLES", () => {
  it("has 15 tables", () => {
    expect(TABLES).toHaveLength(15);
  });

  it("each table has required fields", () => {
    for (const table of TABLES) {
      expect(table).toHaveProperty("id");
      expect(table).toHaveProperty("label");
      expect(table).toHaveProperty("status");
      expect(table).toHaveProperty("seats");
    }
  });

  it("status is a valid value", () => {
    const validStatuses = ["available", "occupied", "reserved", "pickup"];
    for (const table of TABLES) {
      expect(validStatuses).toContain(table.status);
    }
  });

  it("pickup tables have 0 seats", () => {
    const pickups = TABLES.filter((t) => t.status === "pickup");
    for (const t of pickups) {
      expect(t.seats).toBe(0);
    }
  });

  it("labels P-prefix tables as pickup", () => {
    const pTables = TABLES.filter((t) => t.label.startsWith("P"));
    expect(pTables.length).toBeGreaterThan(0);
    for (const t of pTables) {
      expect(t.status).toBe("pickup");
    }
  });
});

describe("PROMO_CODES", () => {
  it("contains SUMMER25, MATCHA10, WELCOME50", () => {
    expect(PROMO_CODES).toHaveProperty("SUMMER25");
    expect(PROMO_CODES).toHaveProperty("MATCHA10");
    expect(PROMO_CODES).toHaveProperty("WELCOME50");
  });

  it("percent promos have values between 0 and 1", () => {
    for (const [, promo] of Object.entries(PROMO_CODES)) {
      if (promo.type === "percent") {
        expect(promo.value).toBeGreaterThan(0);
        expect(promo.value).toBeLessThanOrEqual(1);
      }
    }
  });

  it("fixed promos have positive values", () => {
    for (const [, promo] of Object.entries(PROMO_CODES)) {
      if (promo.type === "fixed") {
        expect(promo.value).toBeGreaterThan(0);
      }
    }
  });
});
