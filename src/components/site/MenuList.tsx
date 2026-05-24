import { memo, useSyncExternalStore, useCallback } from "react";
import { Plus, Minus, Flame, Utensils, Leaf, Salad, IceCream, GlassWater } from "lucide-react";
import { Reveal } from "./Reveal";
import { MENU, MENU_BY_CATEGORY, CATEGORY_ORDER, CATEGORY_META, type MenuCategory } from "@/lib/menu-items";
import { cart, type MenuItem } from "@/lib/cart";

const FEATURED_IDS = [
  "lamb-chop",
  "lamb-kebab",
  "lamb-kofta-plate",
  "majboos-lamb",
  "grill-catfish",
  "tilapia-grill",
  "calamari-shrimp",
  "beef-burger-new",
  "chicken-bbq",
  "shish-tawook",
];

const FEATURED = FEATURED_IDS
  .map((id) => MENU.find((m) => m.id === id))
  .filter((m): m is MenuItem => Boolean(m));

function scrollToCategory(cat: string) {
  const el = document.getElementById(`cat-${cat}`);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top: y, behavior: "smooth" });
}

const FeaturedCard = memo(function FeaturedCard({ it }: { it: MenuItem }) {
  const q = useItemQty(it.id);
  const onAdd = useCallback(() => cart.add(it.id), [it.id]);
  return (
    <article className="relative h-56 w-44 flex-none overflow-hidden rounded-xl shadow-deep sm:h-64 sm:w-52">
      <img
        src={it.image}
        alt={it.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 p-3">
        <h4 className="font-display text-sm leading-tight text-foreground sm:text-base">
          {it.name}
        </h4>
        <div className="mt-1 flex items-center justify-between">
          <span className="text-xs font-semibold text-gold sm:text-sm">
            {it.price} QAR
          </span>
          <button
            type="button"
            aria-label={`Add ${it.name}`}
            onPointerDown={onAdd}
            className="flex h-7 w-7 touch-manipulation items-center justify-center rounded-full bg-gold text-primary-foreground active:scale-95"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
        {q > 0 && (
          <span className="absolute right-2 top-2 rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
            ×{q}
          </span>
        )}
      </div>
    </article>
  );
});

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

        {/* Featured premium dishes */}
        <Reveal delay={0.25}>
          <div className="mt-10">
            <div className="mb-3 flex items-baseline justify-between px-1">
              <span className="text-[10px] tracking-[0.35em] text-gold sm:text-xs">
                CHEF'S PICKS
              </span>
              <span className="text-[10px] text-muted-foreground">
                swipe →
              </span>
            </div>
            <div className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:-mx-6 sm:px-6">
              {FEATURED.map((it) => (
                <div key={it.id} className="snap-start">
                  <FeaturedCard it={it} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Category quick-nav */}
        <Reveal delay={0.3}>
          <div className="sticky top-2 z-20 mt-8 -mx-4 px-4 sm:-mx-6 sm:px-6">
            <div className="flex gap-2 overflow-x-auto rounded-full border border-border/70 bg-background/90 p-1.5 shadow-deep backdrop-blur [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {CATEGORY_ORDER.map((cat) => {
                const items = MENU_BY_CATEGORY[cat];
                if (!items?.length) return null;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => scrollToCategory(cat)}
                    className="flex-none touch-manipulation whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold text-foreground transition-colors hover:bg-gold/15 hover:text-gold active:scale-95 sm:text-sm"
                  >
                    {CATEGORY_META[cat].title}
                  </button>
                );
              })}
            </div>
          </div>
        </Reveal>



        <div className="mt-10 flex flex-col gap-14">
          {CATEGORY_ORDER.map((cat) => {
            const items = MENU_BY_CATEGORY[cat];
            if (!items?.length) return null;
            const meta = CATEGORY_META[cat];
            const isAfrican = cat === "african";
            return (
              <div key={cat} id={`cat-${cat}`} className={`scroll-mt-24 ${isAfrican ? "opacity-95" : ""}`}>
                <Reveal>
                  <div className="mb-5 text-center">
                    <span className="text-[10px] tracking-[0.4em] text-gold sm:text-xs">
                      {meta.kicker.toUpperCase()}
                    </span>
                    <h3
                      className={`mt-2 font-display font-bold leading-tight ${
                        isAfrican
                          ? "text-xl sm:text-2xl"
                          : "text-2xl sm:text-3xl"
                      }`}
                    >
                      {meta.title}
                    </h3>
                    {meta.subtitle && (
                      <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
                        {meta.subtitle}
                      </p>
                    )}
                    <div className="gold-divider mx-auto mt-3 w-12" />
                  </div>
                </Reveal>
                <ul className="flex flex-col gap-3">
                  {items.map((it) => (
                    <MenuRow key={it.id} it={it} />
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
