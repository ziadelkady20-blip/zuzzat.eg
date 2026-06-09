// Mock firebase modules before importing anything
jest.mock("firebase/app", () => ({
  initializeApp: jest.fn(),
  getApps: jest.fn(() => [{ name: "test" }]),
}));
jest.mock("firebase/auth", () => ({
  getAuth: jest.fn(() => ({})),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(),
  updateProfile: jest.fn(),
}));
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(() => ({})),
  doc: jest.fn(),
  setDoc: jest.fn(),
  getDoc: jest.fn(),
  serverTimestamp: jest.fn(() => "mock-timestamp"),
  collection: jest.fn(),
  addDoc: jest.fn(),
  updateDoc: jest.fn(),
  deleteDoc: jest.fn(),
  getDocs: jest.fn(),
  onSnapshot: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  orderBy: jest.fn(),
  limit: jest.fn(),
  increment: jest.fn((n: number) => n),
  writeBatch: jest.fn(),
  Timestamp: { now: jest.fn() },
}));
jest.mock("firebase/storage", () => ({
  getStorage: jest.fn(() => ({})),
}));

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
} from "firebase/auth";
import { setDoc, getDoc } from "firebase/firestore";
import { loginUser, registerCustomer, logoutUser, onAuthChange, getUserRole } from "@/lib/firebase/auth";

beforeEach(() => {
  jest.clearAllMocks();
});

describe("loginUser", () => {
  it("returns user, role, and name on success", async () => {
    const fakeUser = { uid: "u1" };
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({ user: fakeUser });
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ role: "cashier", name: "Ali" }),
    });

    const result = await loginUser("ali@test.com", "pass123");
    expect(signInWithEmailAndPassword).toHaveBeenCalledWith(
      expect.anything(),
      "ali@test.com",
      "pass123"
    );
    expect(result).toEqual({ user: fakeUser, role: "cashier", name: "Ali" });
  });

  it("defaults to customer role when Firestore doc has no role", async () => {
    (signInWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: { uid: "u2" },
    });
    (getDoc as jest.Mock).mockResolvedValue({ data: () => ({}) });

    const result = await loginUser("x@test.com", "pw");
    expect(result.role).toBe("customer");
    expect(result.name).toBe("");
  });
});

describe("registerCustomer", () => {
  it("creates user, updates profile, and writes Firestore doc", async () => {
    const fakeUser = { uid: "u3" };
    (createUserWithEmailAndPassword as jest.Mock).mockResolvedValue({
      user: fakeUser,
    });
    (updateProfile as jest.Mock).mockResolvedValue(undefined);
    (setDoc as jest.Mock).mockResolvedValue(undefined);

    const result = await registerCustomer("Sara", "sara@t.com", "pw", "012");
    expect(createUserWithEmailAndPassword).toHaveBeenCalled();
    expect(updateProfile).toHaveBeenCalledWith(fakeUser, { displayName: "Sara" });
    expect(setDoc).toHaveBeenCalledWith(
      undefined,
      expect.objectContaining({
        name: "Sara",
        email: "sara@t.com",
        phone: "012",
        role: "customer",
        points: 0,
      })
    );
    expect(result).toBe(fakeUser);
  });
});

describe("logoutUser", () => {
  it("calls signOut", async () => {
    (signOut as jest.Mock).mockResolvedValue(undefined);
    await logoutUser();
    expect(signOut).toHaveBeenCalled();
  });
});

describe("onAuthChange", () => {
  it("wraps onAuthStateChanged", () => {
    const cb = jest.fn();
    const unsub = jest.fn();
    (onAuthStateChanged as jest.Mock).mockReturnValue(unsub);

    const result = onAuthChange(cb);
    expect(onAuthStateChanged).toHaveBeenCalledWith(expect.anything(), cb);
    expect(result).toBe(unsub);
  });
});

describe("getUserRole", () => {
  it("returns role from Firestore doc", async () => {
    (getDoc as jest.Mock).mockResolvedValue({
      data: () => ({ role: "admin" }),
    });
    const role = await getUserRole("u4");
    expect(role).toBe("admin");
  });

  it("defaults to customer when doc has no role", async () => {
    (getDoc as jest.Mock).mockResolvedValue({ data: () => ({}) });
    const role = await getUserRole("u5");
    expect(role).toBe("customer");
  });
});
