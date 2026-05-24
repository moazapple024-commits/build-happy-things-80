import { memo, useSyncExternalStore, useCallback } from "react";
import { Plus, Minus } from "lucide-react";
import { Reveal } from "./Reveal";
import { MENU } from "@/lib/menu-items";
import { cart, type MenuItem } from "@/lib/cart";

function useItemQty(id: string) {
  return useSyncExternalStore(
    cart.subscribe,
    () => cart.get().find((l) => l.id === id)?.qty ?? 0,
    () => 0,
  );
}

const MenuRow = memo(function MenuRow({ it }: { it: MenuItem }) {
  const q = useItemQty(it.id);
  const onAdd = useCallback(() => cart.add(it.id), [it.id]);
  const onDec = useCallback(() => cart.dec(it.id), [it.id]);

  return (
    <li className="flex items-stretch gap-3 rounded-lg border border-border/70 bg-background p-3 shadow-deep transition-colors hover:border-gold/50">
      <img
        src={it.image}
        alt={it.name}
        loading="lazy"
        className="h-24 w-24 flex-none rounded-md object-cover sm:h-28 sm:w-28"
      />
      <div className="flex min-w-0 flex-1 flex-col justify-between">
        <div>
          <h3 className="font-display text-lg leading-tight text-foreground sm:text-xl">
            {it.name}
          </h3>
          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground sm:text-sm">
            {it.desc}
          </p>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-gold">
            {it.price} QAR
          </span>
          {q === 0 ? (
            <button
              type="button"
              aria-label={`Add ${it.name}`}
              onPointerDown={onAdd}
              className="flex h-9 w-9 touch-manipulation items-center justify-center rounded-full bg-gold text-primary-foreground transition-transform active:scale-95"
            >
              <Plus className="h-5 w-5" />
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease"
                onPointerDown={onDec}
                className="flex h-8 w-8 touch-manipulation items-center justify-center rounded-full border border-gold/60 text-gold active:scale-95"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-5 text-center text-sm font-semibold tabular-nums">
                {q}
              </span>
              <button
                type="button"
                aria-label="Increase"
                onPointerDown={onAdd}
                className="flex h-8 w-8 touch-manipulation items-center justify-center rounded-full bg-gold text-primary-foreground active:scale-95"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  );
});

export function MenuList() {
  return (
    <section id="menu" className="relative bg-card px-4 pt-16 pb-40 sm:px-6 md:py-28">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <Reveal>
            <span className="text-xs tracking-[0.4em] text-gold">OUR MENU</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[1.15]">
              Order <span className="bg-gradient-gold">Now</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="gold-divider mx-auto my-6 w-20" />
          </Reveal>
        </div>

        <ul className="mt-6 flex flex-col gap-3">
          {MENU.map((it) => (
            <MenuRow key={it.id} it={it} />
          ))}
        </ul>
      </div>
    </section>
  );
}
