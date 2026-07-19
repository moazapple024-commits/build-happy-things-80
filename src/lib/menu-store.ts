import { useSyncExternalStore } from "react";
import type { MenuItem } from "./cart";
import {
  MENU as BASE_MENU,
  CATEGORY_ORDER,
  categoryOf,
  type MenuCategory,
} from "./menu-items";

export type MenuOverride = Partial<Pick<MenuItem, "name" | "desc" | "price" | "image">>;

export type CustomMenuItem = MenuItem & { category: MenuCategory };

type State = {
  edits: Record<string, MenuOverride>;
  hidden: string[];
  custom: CustomMenuItem[];
};

const KEY = "tobize_menu_overrides_v1";
const EMPTY: State = { edits: {}, hidden: [], custom: [] };

const listeners = new Set<() => void>();
let state: State = load();

function load(): State {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return EMPTY;
    const parsed = JSON.parse(raw);
    return {
      edits: parsed.edits ?? {},
      hidden: Array.isArray(parsed.hidden) ? parsed.hidden : [],
      custom: Array.isArray(parsed.custom) ? parsed.custom : [],
    };
  } catch {
    return EMPTY;
  }
}

function save() {
  if (typeof window !== "undefined") {
    localStorage.setItem(KEY, JSON.stringify(state));
  }
  cachedMenu = null;
  cachedByCategory = null;
  cachedSnapshot = { menu: getMenu(), byCategory: getByCategory(), state };
  listeners.forEach((l) => l());
}

let cachedMenu: MenuItem[] | null = null;
let cachedByCategory: Record<MenuCategory, MenuItem[]> | null = null;

function getMenu(): MenuItem[] {
  if (cachedMenu) return cachedMenu;
  const hidden = new Set(state.hidden);
  const edits = state.edits;
  const overridden = BASE_MENU.filter((m) => !hidden.has(m.id)).map((m) => {
    const e = edits[m.id];
    if (!e) return m;
    return { ...m, ...e };
  });
  const customItems = state.custom.map(({ category: _c, ...rest }) => rest as MenuItem);
  cachedMenu = [...overridden, ...customItems];
  return cachedMenu;
}

function getByCategory(): Record<MenuCategory, MenuItem[]> {
  if (cachedByCategory) return cachedByCategory;
  const result = CATEGORY_ORDER.reduce((acc, cat) => {
    acc[cat] = [];
    return acc;
  }, {} as Record<MenuCategory, MenuItem[]>);
  const hidden = new Set(state.hidden);
  BASE_MENU.forEach((m) => {
    if (hidden.has(m.id)) return;
    const cat = categoryOf(m.id);
    const e = state.edits[m.id];
    result[cat].push(e ? { ...m, ...e } : m);
  });
  state.custom.forEach((c) => {
    const { category, ...rest } = c;
    (result[category] ??= []).push(rest as MenuItem);
  });
  cachedByCategory = result;
  return cachedByCategory;
}

let cachedSnapshot = { menu: getMenu(), byCategory: getByCategory(), state };
const EMPTY_SNAPSHOT = cachedSnapshot;

export const menuStore = {
  subscribe(cb: () => void) {
    listeners.add(cb);
    return () => listeners.delete(cb);
  },
  getSnapshot() {
    return cachedSnapshot;
  },
  getState() {
    return state;
  },
  editItem(id: string, override: MenuOverride) {
    state = { ...state, edits: { ...state.edits, [id]: { ...state.edits[id], ...override } } };
    save();
  },
  resetItem(id: string) {
    const { [id]: _, ...rest } = state.edits;
    state = { ...state, edits: rest };
    save();
  },
  hideItem(id: string) {
    if (state.hidden.includes(id)) return;
    state = { ...state, hidden: [...state.hidden, id] };
    save();
  },
  unhideItem(id: string) {
    state = { ...state, hidden: state.hidden.filter((x) => x !== id) };
    save();
  },
  addCustom(item: CustomMenuItem) {
    state = { ...state, custom: [...state.custom, item] };
    save();
  },
  updateCustom(id: string, patch: Partial<CustomMenuItem>) {
    state = {
      ...state,
      custom: state.custom.map((c) => (c.id === id ? { ...c, ...patch } : c)),
    };
    save();
  },
  deleteCustom(id: string) {
    state = { ...state, custom: state.custom.filter((c) => c.id !== id) };
    save();
  },
  resetAll() {
    state = EMPTY;
    save();
  },
};

export function useMenuData() {
  return useSyncExternalStore(
    menuStore.subscribe,
    menuStore.getSnapshot,
    () => EMPTY_SNAPSHOT,
  );
}

export function useMenu(): MenuItem[] {
  return useMenuData().menu;
}

export function useMenuByCategory() {
  return useMenuData().byCategory;
}

export function isCustomItem(id: string): boolean {
  return state.custom.some((c) => c.id === id);
}

export function isHiddenItem(id: string): boolean {
  return state.hidden.includes(id);
}
