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
    const l = state.find((x) => x.id === id);
    if (l) l.qty += 1;
    else state = [...state, { id, qty: 1 }];
    save();
  },
  dec(id: string) {
    const l = state.find((x) => x.id === id);
    if (!l) return;
    l.qty -= 1;
    state = state.filter((x) => x.qty > 0);
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
    () => [] as CartLine[],
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
