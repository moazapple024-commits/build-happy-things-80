import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart, cartCount, cartTotal } from "@/lib/cart";
import { MENU } from "@/lib/menu-items";

export function CartBar() {
  const lines = useCart();
  const count = cartCount(lines);
  const total = cartTotal(lines, MENU);
  if (count === 0) return null;
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 px-3 pb-3 pt-2">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full border border-gold/40 bg-background/95 p-2 pl-5 shadow-[0_20px_60px_-20px_oklch(0.78_0.14_78_/_0.4)] backdrop-blur">
        <div className="flex items-center gap-3">
          <div className="relative">
            <ShoppingBag className="h-6 w-6 text-gold" />
            <span className="absolute -right-2 -top-2 flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-[10px] font-bold text-primary-foreground">
              {count}
            </span>
          </div>
          <div className="text-xs leading-tight">
            <div className="text-muted-foreground">Total</div>
            <div className="font-semibold text-foreground">{total} QAR</div>
          </div>
        </div>
        <Link
          to="/checkout"
          className="rounded-full bg-gold px-6 py-3 text-sm font-medium text-primary-foreground transition-transform active:scale-95"
        >
          Order Now
        </Link>
      </div>
    </div>
  );
}
