export const MENU_ITEMS = [
  { id: "1", name: "Ice Cold Brew", category: "coffee", price: 55, emoji: "☕", available: true, description: "Cold Brew Coffee, Ice" },
  { id: "2", name: "Iced Americano", category: "coffee", price: 45, emoji: "🧋", available: true, description: "Espresso, Water, Ice" },
  { id: "3", name: "Caramel Ice Latte", category: "coffee", price: 65, emoji: "☕", available: true, description: "Espresso, Milk, Caramel" },
  { id: "4", name: "Ice Matcha Latte", category: "matcha", price: 70, emoji: "🍵", available: true, description: "Matcha, Oat Milk, Ice" },
  { id: "5", name: "Matcha Frappe", category: "matcha", price: 75, emoji: "🍵", available: true, description: "Matcha, Ice Cream, Ice" },
  { id: "6", name: "Mojito Classic", category: "mojito", price: 50, emoji: "🧃", available: true, description: "Lime, Mint, Soda" },
  { id: "7", name: "Passion Mojito", category: "mojito", price: 55, emoji: "🧃", available: true, description: "Passion, Mint, Lime" },
  { id: "8", name: "Mango Frappe", category: "frappe", price: 65, emoji: "🥤", available: true, description: "Mango, Vanilla Ice Cream" },
  { id: "9", name: "Oreo Frappe", category: "frappe", price: 70, emoji: "🥤", available: true, description: "Oreo, Milk, Ice Cream" },
  { id: "10", name: "Fresh Orange Juice", category: "juice", price: 45, emoji: "🍊", available: true, description: "Fresh Oranges" },
  { id: "11", name: "Mango Juice", category: "juice", price: 50, emoji: "🥭", available: true, description: "Fresh Mango" },
  { id: "12", name: "Strawberry Milkshake", category: "milkshake", price: 75, emoji: "🍓", available: true, description: "Strawberry, Milk, Ice Cream" },
];

export const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "coffee", label: "☕ Ice Coffee" },
  { id: "matcha", label: "🍵 Matcha" },
  { id: "mojito", label: "🧃 Mojito" },
  { id: "frappe", label: "🥤 Frappe" },
  { id: "juice", label: "🍊 Juices" },
  { id: "milkshake", label: "🥛 Milkshakes" },
];

export const TABLES = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  label: i < 13 ? `Table ${i + 1}` : `P${i - 12}`,
  status: ["available", "occupied", "reserved", "available", "available", "occupied", "occupied", "available", "occupied", "available", "reserved", "available", "available", "pickup", "pickup"][i] as "available" | "occupied" | "reserved" | "pickup",
  seats: [4, 4, 4, 6, 2, 4, 4, 2, 6, 4, 4, 4, 4, 0, 0][i],
  orderId: ["", "#139", "", "", "", "#133", "#142", "", "#130", "", "", "", "", "", ""][i],
}));

export const PROMO_CODES: Record<string, { type: "percent" | "fixed"; value: number }> = {
  SUMMER25: { type: "percent", value: 0.25 },
  MATCHA10: { type: "percent", value: 0.10 },
  WELCOME50: { type: "fixed", value: 50 },
};
