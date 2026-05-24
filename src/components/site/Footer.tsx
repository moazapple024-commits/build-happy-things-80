export function Footer() {
  return (
    <footer className="border-t border-border bg-background px-6 py-14">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
        <div>
          <div className="font-display text-3xl text-gold">Tobize</div>
          <div className="mt-1 text-[10px] tracking-[0.3em] text-muted-foreground">
            INTERCONTINENTAL RESTAURANT
          </div>
          <p className="mt-5 max-w-xs text-sm leading-loose text-muted-foreground">
            A modern dining experience in the heart of Doha, bringing the flavors of the world to one table.
          </p>
        </div>
        <div>
          <div className="text-xs tracking-[0.3em] text-gold">LINKS</div>
          <ul className="mt-5 space-y-3 text-sm">
            {[
              ["Menu", "#menu"],
              ["Contact", "#reserve"],
            ].map(([l, h]) => (
              <li key={h}>
                <a className="text-foreground/80 transition-colors hover:text-gold" href={h}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xs tracking-[0.3em] text-gold">CONTACT</div>
          <ul className="mt-5 space-y-3 text-sm text-foreground/80">
            <li>+974 7444 4386</li>
            <li>Freej Kulaib, Doha, Qatar</li>
            <li className="flex gap-4 pt-2">
              {["Instagram", "Facebook", "TikTok"].map((s) => (
                <a key={s} href="#" className="hover:text-gold transition-colors">
                  {s}
                </a>
              ))}
            </li>
          </ul>
        </div>
      </div>
      <div className="gold-divider mx-auto mt-12 max-w-7xl" />
      <p className="mx-auto mt-6 max-w-7xl text-center text-xs tracking-[0.2em] text-muted-foreground">
        © {new Date().getFullYear()} TOBIZE INTERCONTINENTAL · DOHA
      </p>
    </footer>
  );
}
