import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { cart, useCart, cartTotal } from "@/lib/cart";
import { MENU } from "@/lib/menu-items";
import { ADDRESS_EN } from "@/lib/contact";

export const Route = createFileRoute("/checkout")({
  component: CheckoutPage,
  head: () => ({
    meta: [
      { title: "Checkout · Tobize Intercontinental" },
      { name: "description", content: "Complete your order from Tobize Intercontinental Restaurant and send it via WhatsApp." },
    ],
  }),
});

type Delivery = "delivery" | "pickup" | "dinein";
const DELIVERY_LABEL: Record<Delivery, string> = {
  delivery: "Delivery",
  pickup: "Pickup",
  dinein: "Dine-in",
};

function CheckoutPage() {
  const lines = useCart();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [method, setMethod] = useState<Delivery>("delivery");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);

  const detailed = useMemo(
    () =>
      lines
        .map((l) => {
          const it = MENU.find((m) => m.id === l.id);
          return it ? { ...it, qty: l.qty } : null;
        })
        .filter(Boolean) as (typeof MENU[number] & { qty: number })[],
    [lines],
  );
  const total = cartTotal(lines, MENU);

  function validatePhone(p: string) {
    const v = p.trim().replace(/\s+/g, "");
    return /^\+974\d{7,8}$/.test(v);
  }

  function send() {
    setError(null);
    if (!name.trim() || name.trim().length < 2) {
      setError("Please enter your name");
      return;
    }
    if (!validatePhone(phone)) {
      setError("Phone must start with +974 followed by 7-8 digits");
      return;
    }
    if (detailed.length === 0) {
      setError("Your cart is empty");
      return;
    }

    const lineText = detailed
      .map((d) => `• ${d.name} x ${d.qty} = ${d.price * d.qty} QAR`)
      .join("\n");
    const msg = [
      "*New Order - Tobize Restaurant*",
      "",
      `Name: ${name.trim()}`,
      `Phone: ${phone.trim()}`,
      `Order type: ${DELIVERY_LABEL[method]}`,
      "",
      "*Order details:*",
      lineText,
      "",
      `*Total: ${total} QAR*`,
      notes.trim() ? `\nNotes: ${notes.trim()}` : "",
      method === "delivery" ? `\nDelivery address to be confirmed. Restaurant location: ${ADDRESS_EN}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const url = `https://wa.me/97474444386?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank", "noopener");
  }

  return (
    <main className="min-h-screen bg-background px-4 pb-24 pt-8 text-foreground sm:px-6">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs tracking-[0.2em] text-muted-foreground hover:text-gold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to menu
        </Link>

        <h1 className="mt-6 font-display text-3xl font-bold sm:text-4xl">
          Complete your <span className="bg-gradient-gold">order</span>
        </h1>

        {/* Summary */}
        <section className="mt-6 rounded-lg border border-border/70 bg-card p-4">
          <div className="text-xs tracking-[0.3em] text-gold">ORDER SUMMARY</div>
          {detailed.length === 0 ? (
            <p className="mt-4 text-sm text-muted-foreground">
              Your cart is empty.{" "}
              <button onClick={() => navigate({ to: "/" })} className="text-gold underline">
                Browse the menu
              </button>
            </p>
          ) : (
            <ul className="mt-4 divide-y divide-border/60">
              {detailed.map((d) => (
                <li key={d.id} className="flex items-center gap-3 py-3">
                  <img src={d.image} alt={d.name} className="h-14 w-14 flex-none rounded-md object-cover" />
                  <div className="flex-1">
                    <div className="font-medium">{d.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {d.price} × {d.qty} = {d.price * d.qty} QAR
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      aria-label="Decrease"
                      onClick={() => cart.dec(d.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-gold/60 text-gold"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-5 text-center text-sm tabular-nums">{d.qty}</span>
                    <button
                      aria-label="Increase"
                      onClick={() => cart.add(d.id)}
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-gold text-primary-foreground"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                    <button
                      aria-label="Remove"
                      onClick={() => cart.remove(d.id)}
                      className="ml-1 flex h-7 w-7 items-center justify-center rounded-full text-muted-foreground hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {detailed.length > 0 && (
            <div className="mt-3 flex items-center justify-between border-t border-border/60 pt-3 text-sm">
              <span className="text-muted-foreground">Total</span>
              <span className="font-semibold text-gold">{total} QAR</span>
            </div>
          )}
        </section>

        {/* Form */}
        <section className="mt-6 space-y-4">
          <Field label="Full name">
            <input
              value={name}
              onChange={(e) => setName(e.target.value.slice(0, 60))}
              className="w-full rounded-md border border-border bg-background px-3 py-3 outline-none focus:border-gold"
              placeholder="Your full name"
            />
          </Field>
          <Field label="Phone number (+974)">
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value.slice(0, 15))}
              className="w-full rounded-md border border-border bg-background px-3 py-3 outline-none focus:border-gold"
              placeholder="+97470000000"
              inputMode="tel"
            />
          </Field>
          <Field label="Order type">
            <select
              value={method}
              onChange={(e) => setMethod(e.target.value as Delivery)}
              className="w-full rounded-md border border-border bg-background px-3 py-3 outline-none focus:border-gold"
            >
              <option value="delivery">Delivery</option>
              <option value="pickup">Pickup</option>
              <option value="dinein">Dine-in</option>
            </select>
          </Field>
          <Field label="Notes (optional)">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value.slice(0, 300))}
              rows={3}
              className="w-full rounded-md border border-border bg-background px-3 py-3 outline-none focus:border-gold"
              placeholder="Any special instructions..."
            />
          </Field>

          {error && (
            <p className="rounded-md border border-destructive/40 bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </p>
          )}

          <button
            onClick={send}
            disabled={detailed.length === 0}
            className="w-full rounded-full bg-gold px-6 py-4 text-base font-medium text-primary-foreground transition-transform active:scale-[0.98] disabled:opacity-50"
          >
            Send Order via WhatsApp
          </button>
        </section>
      </div>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs tracking-[0.2em] text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
