import { useEffect, useState } from "react";
import { WHATSAPP_URL } from "@/lib/contact";

const links = [
  { href: "#menu", label: "Menu" },
  { href: "#reserve", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-500 ${
        scrolled ? "bg-background border-b border-border" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#top" className="flex items-center gap-3">
          <span className="font-display text-2xl tracking-wide text-gold">Tobize</span>
          <span className="hidden text-[10px] uppercase tracking-[0.3em] text-muted-foreground sm:inline">
            Intercontinental
          </span>
        </a>
        <ul className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm text-foreground/80 transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noreferrer"
          className="hidden rounded-full border border-gold/40 px-5 py-2 text-xs text-gold transition-all hover:bg-gold hover:text-primary-foreground md:inline-block"
        >
          Book via WhatsApp
        </a>
        <button aria-label="Menu" onClick={() => setOpen((v) => !v)} className="md:hidden text-gold">
          <span className="block h-px w-7 bg-current" />
          <span className="mt-1.5 block h-px w-7 bg-current" />
          <span className="mt-1.5 block h-px w-5 bg-current" />
        </button>
      </nav>
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <ul className="flex flex-col px-6 py-6">
            {links.map((l) => (
              <li key={l.href} className="py-3 border-b border-border/40 last:border-0">
                <a onClick={() => setOpen(false)} href={l.href} className="text-base text-foreground/80">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
