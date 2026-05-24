import { useSyncExternalStore } from "react";

export type MenuItem = {
  id: string;
  name: string;
  desc: string;
  price: number; // QAR
  image: string;
};

export type CartLine = { id: string; qty: number };

const KEY = "tobize_cart_v1";
const listeners = new Set<() => void>();
const EMPTY_CART: CartLine[] = [];
let state: CartLine[] = load();

function load(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}
function save() {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(state));
  }
  listeners.forEach((l) => l());
}

export const cart = {
  add(id: string) {
    const exists = state.some((x) => x.id === id);
    state = exists
      ? state.map((x) => (x.id === id ? { ...x, qty: x.qty + 1 } : x))
      : [...state, { id, qty: 1 }];
    save();
  },
  dec(id: string) {
    if (!state.some((x) => x.id === id)) return;
    state = state
      .map((x) => (x.id === id ? { ...x, qty: x.qty - 1 } : x))
      .filter((x) => x.qty > 0);
    save();
  },
  remove(id: string) {
    state = state.filter((x) => x.id !== id);
    save();
  },
  clear() {
    state = [];
    save();
  },
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  get(): CartLine[] {
    return state;
  },
};

export function useCart() {
  return useSyncExternalStore(
    cart.subscribe,
    cart.get,
    () => EMPTY_CART,
  );
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((s, l) => s + l.qty, 0);
}
export function cartTotal(lines: CartLine[], items: MenuItem[]) {
  return lines.reduce((s, l) => {
    const it = items.find((i) => i.id === l.id);
    return s + (it ? it.price * l.qty : 0);
  }, 0);
}
