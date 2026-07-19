import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Lock, Plus, Save, Trash2, Upload, RotateCcw, EyeOff, Eye } from "lucide-react";
import {
  menuStore,
  useMenuData,
  isCustomItem,
  type CustomMenuItem,
} from "@/lib/menu-store";
import {
  MENU as BASE_MENU,
  CATEGORY_ORDER,
  CATEGORY_META,
  categoryOf,
  type MenuCategory,
} from "@/lib/menu-items";
import type { MenuItem } from "@/lib/cart";

const PASSWORD = "7777";
const AUTH_KEY = "tobize_admin_auth_v1";

export const Route = createFileRoute("/admin")({
  component: AdminPage,
  head: () => ({
    meta: [
      { title: "Admin · Tobize" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
});

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(AUTH_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  if (!authed) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-background px-4">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (password === PASSWORD) {
              sessionStorage.setItem(AUTH_KEY, "1");
              setAuthed(true);
            } else {
              setErr(true);
            }
          }}
          className="w-full max-w-sm rounded-2xl border border-gold/30 bg-card p-8 shadow-deep"
        >
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gold/10 text-gold">
              <Lock className="h-6 w-6" />
            </div>
            <h1 className="mt-4 font-display text-2xl">Admin Access</h1>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter password to manage the menu
            </p>
          </div>
          <input
            type="password"
            inputMode="numeric"
            autoFocus
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setErr(false);
            }}
            placeholder="••••"
            className="w-full rounded-lg border border-border bg-background px-4 py-3 text-center text-lg tracking-widest text-foreground outline-none focus:border-gold"
          />
          {err && (
            <p className="mt-3 text-center text-xs text-destructive">Wrong password</p>
          )}
          <button
            type="submit"
            className="mt-5 w-full rounded-full bg-gold py-3 text-sm font-semibold text-primary-foreground transition-transform active:scale-95"
          >
            Enter
          </button>
          <div className="mt-4 text-center">
            <Link to="/" className="text-xs text-muted-foreground hover:text-gold">
              ← Back to site
            </Link>
          </div>
        </form>
      </main>
    );
  }

  return <AdminDashboard onLogout={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { byCategory, state } = useMenuData();
  const [activeCat, setActiveCat] = useState<MenuCategory>("mains");
  const [showAdd, setShowAdd] = useState(false);

  const hiddenBaseItems = useMemo(
    () => BASE_MENU.filter((m) => state.hidden.includes(m.id)),
    [state.hidden],
  );

  const items = byCategory[activeCat] ?? [];

  return (
    <main className="min-h-screen bg-background px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <header className="mb-6 flex items-center justify-between gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold"
          >
            <ArrowLeft className="h-4 w-4" /> Site
          </Link>
          <h1 className="font-display text-xl sm:text-2xl">Menu Admin</h1>
          <button
            type="button"
            onClick={onLogout}
            className="text-xs text-muted-foreground hover:text-destructive"
          >
            Logout
          </button>
        </header>

        <div className="mb-4 flex flex-wrap gap-2">
          {CATEGORY_ORDER.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCat(cat)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeCat === cat
                  ? "border-gold bg-gold text-primary-foreground"
                  : "border-border bg-background text-foreground hover:border-gold/60"
              }`}
            >
              {CATEGORY_META[cat].title} ({byCategory[cat]?.length ?? 0})
            </button>
          ))}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-xs uppercase tracking-widest text-gold">
            {CATEGORY_META[activeCat].title}
          </span>
          <button
            type="button"
            onClick={() => setShowAdd((v) => !v)}
            className="inline-flex items-center gap-1.5 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-primary-foreground active:scale-95"
          >
            <Plus className="h-3.5 w-3.5" /> Add item
          </button>
        </div>

        {showAdd && (
          <AddItemForm
            category={activeCat}
            onDone={() => setShowAdd(false)}
          />
        )}

        <ul className="flex flex-col gap-3">
          {items.map((it) => (
            <EditableRow key={it.id} item={it} />
          ))}
          {items.length === 0 && (
            <li className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No items in this category yet.
            </li>
          )}
        </ul>

        {hiddenBaseItems.length > 0 && (
          <div className="mt-10">
            <h2 className="mb-2 text-xs uppercase tracking-widest text-muted-foreground">
              Hidden items ({hiddenBaseItems.length})
            </h2>
            <ul className="flex flex-col gap-2">
              {hiddenBaseItems.map((it) => (
                <li
                  key={it.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-border/60 bg-card/50 p-3"
                >
                  <div className="min-w-0">
                    <div className="truncate text-sm">{it.name}</div>
                    <div className="text-[10px] text-muted-foreground">
                      {CATEGORY_META[categoryOf(it.id)].title}
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => menuStore.unhideItem(it.id)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 px-3 py-1 text-xs text-gold hover:bg-gold/10"
                  >
                    <Eye className="h-3.5 w-3.5" /> Restore
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-12 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-sm font-semibold text-destructive">Reset all changes</div>
              <div className="text-xs text-muted-foreground">
                Restores original menu (removes all edits, hidden items, and custom items).
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                if (confirm("Reset ALL menu changes to defaults?")) menuStore.resetAll();
              }}
              className="rounded-full border border-destructive px-3 py-1.5 text-xs font-semibold text-destructive hover:bg-destructive/10"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

function EditableRow({ item }: { item: MenuItem }) {
  const isCustom = isCustomItem(item.id);
  const [name, setName] = useState(item.name);
  const [desc, setDesc] = useState(item.desc);
  const [price, setPrice] = useState(String(item.price));
  const [image, setImage] = useState(item.image);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    setName(item.name);
    setDesc(item.desc);
    setPrice(String(item.price));
    setImage(item.image);
    setDirty(false);
  }, [item.id, item.name, item.desc, item.price, item.image]);

  function markDirty() { setDirty(true); }

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const dataUrl = await fileToDataUrl(file);
    setImage(dataUrl);
    setDirty(true);
  }

  function save() {
    const p = parseFloat(price);
    if (!name.trim() || isNaN(p) || p < 0) return;
    const patch = { name: name.trim(), desc: desc.trim(), price: p, image };
    if (isCustom) menuStore.updateCustom(item.id, patch);
    else menuStore.editItem(item.id, patch);
    setDirty(false);
  }

  return (
    <li className="flex flex-col gap-3 rounded-xl border border-border bg-card p-3 sm:flex-row">
      <div className="relative flex-none">
        <img
          src={image}
          alt={name}
          className="h-24 w-24 rounded-lg object-cover sm:h-28 sm:w-28"
        />
        <label className="absolute inset-x-0 bottom-0 flex cursor-pointer items-center justify-center gap-1 rounded-b-lg bg-black/60 py-1 text-[10px] text-white hover:bg-black/80">
          <Upload className="h-3 w-3" /> Change
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
        </label>
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <input
          value={name}
          onChange={(e) => { setName(e.target.value); markDirty(); }}
          className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm font-semibold outline-none focus:border-gold"
          placeholder="Name"
        />
        <textarea
          value={desc}
          onChange={(e) => { setDesc(e.target.value); markDirty(); }}
          rows={2}
          className="w-full resize-none rounded-md border border-border bg-background px-2 py-1.5 text-xs outline-none focus:border-gold"
          placeholder="Description"
        />
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1">
            <input
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => { setPrice(e.target.value); markDirty(); }}
              className="w-20 rounded-md border border-border bg-background px-2 py-1.5 text-sm outline-none focus:border-gold"
            />
            <span className="text-xs text-gold">QAR</span>
          </div>
          <div className="ml-auto flex items-center gap-1.5">
            {dirty && (
              <button
                type="button"
                onClick={save}
                className="inline-flex items-center gap-1 rounded-full bg-gold px-3 py-1.5 text-xs font-semibold text-primary-foreground active:scale-95"
              >
                <Save className="h-3.5 w-3.5" /> Save
              </button>
            )}
            {!isCustom && (
              <button
                type="button"
                onClick={() => menuStore.resetItem(item.id)}
                title="Reset to original"
                className="inline-flex items-center gap-1 rounded-full border border-border px-2.5 py-1.5 text-xs text-muted-foreground hover:border-gold hover:text-gold"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
            {isCustom ? (
              <button
                type="button"
                onClick={() => {
                  if (confirm(`Delete "${item.name}"?`)) menuStore.deleteCustom(item.id);
                }}
                className="inline-flex items-center gap-1 rounded-full border border-destructive/50 px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => menuStore.hideItem(item.id)}
                title="Hide from menu"
                className="inline-flex items-center gap-1 rounded-full border border-destructive/40 px-2.5 py-1.5 text-xs text-destructive hover:bg-destructive/10"
              >
                <EyeOff className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

function AddItemForm({ category, onDone }: { category: MenuCategory; onDone: () => void }) {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState<string>("");

  async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImage(await fileToDataUrl(file));
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const p = parseFloat(price);
    if (!name.trim() || isNaN(p) || p < 0 || !image) return;
    const id = `custom-${Date.now()}`;
    const item: CustomMenuItem = {
      id,
      name: name.trim(),
      desc: desc.trim(),
      price: p,
      image,
      category,
    };
    menuStore.addCustom(item);
    onDone();
  }

  return (
    <form
      onSubmit={submit}
      className="mb-4 flex flex-col gap-2 rounded-xl border border-gold/40 bg-card p-4"
    >
      <div className="text-xs uppercase tracking-widest text-gold">
        New item in {CATEGORY_META[category].title}
      </div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
      />
      <textarea
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        placeholder="Short description"
        rows={2}
        className="resize-none rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
      />
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
          className="w-24 rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:border-gold"
        />
        <span className="text-xs text-gold">QAR</span>
        <label className="ml-auto inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs hover:border-gold">
          <Upload className="h-3.5 w-3.5" />
          {image ? "Change image" : "Upload image"}
          <input type="file" accept="image/*" className="hidden" onChange={onFile} />
        </label>
      </div>
      {image && (
        <img src={image} alt="preview" className="h-24 w-24 rounded-md object-cover" />
      )}
      <div className="mt-1 flex justify-end gap-2">
        <button
          type="button"
          onClick={onDone}
          className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground hover:border-foreground/40"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={!name.trim() || !price || !image}
          className="rounded-full bg-gold px-4 py-2 text-xs font-semibold text-primary-foreground disabled:opacity-50"
        >
          Add item
        </button>
      </div>
    </form>
  );
}

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const r = new FileReader();
    r.onload = () => resolve(String(r.result));
    r.onerror = reject;
    r.readAsDataURL(file);
  });
}
