import { Reveal } from "./Reveal";
import { WHATSAPP_URL, PHONE_INTL, PHONE_DISPLAY, ADDRESS_EN, MAP_EMBED, MAP_LINK } from "@/lib/contact";

export function Reserve() {
  return (
    <section id="reserve" className="relative bg-card px-6 py-28 md:py-40">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Reveal>
            <span className="text-xs tracking-[0.4em] text-gold">RESERVATIONS & CONTACT</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.15]">
              Book your <span className="bg-gradient-gold">table</span> via WhatsApp
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
              To reserve or inquire, message us directly on WhatsApp or give us a call.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="group rounded-sm border border-gold/40 bg-background p-8 text-center transition-all hover:border-gold hover:bg-gold/5"
            >
              <div className="text-xs tracking-[0.3em] text-muted-foreground">WHATSAPP</div>
              <div className="mt-4 font-display text-2xl text-gold transition-transform group-hover:scale-105">
                Message us on WhatsApp
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{PHONE_DISPLAY}</div>
            </a>
            <a
              href={`tel:${PHONE_INTL}`}
              className="group rounded-sm border border-gold/40 bg-background p-8 text-center transition-all hover:border-gold hover:bg-gold/5"
            >
              <div className="text-xs tracking-[0.3em] text-muted-foreground">CALL US</div>
              <div className="mt-4 font-display text-2xl text-gold transition-transform group-hover:scale-105">
                Give us a call
              </div>
              <div className="mt-2 text-sm text-muted-foreground">{PHONE_DISPLAY}</div>
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-10 grid gap-px overflow-hidden rounded-sm bg-border sm:grid-cols-2">
            <div className="bg-background p-8">
              <div className="text-xs tracking-[0.3em] text-gold">OPENING HOURS</div>
              <ul className="mt-5 space-y-2 text-sm text-foreground/90">
                <li className="flex justify-between">
                  <span>Daily</span>
                  <span className="text-muted-foreground">9:00 AM — 1:00 AM</span>
                </li>
              </ul>
            </div>
            <div className="bg-background p-8">
              <div className="text-xs tracking-[0.3em] text-gold">ADDRESS</div>
              <p className="mt-5 text-sm leading-loose text-foreground/90">{ADDRESS_EN}</p>
              <a
                href={MAP_LINK}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-block text-xs text-gold underline underline-offset-4 hover:opacity-80"
              >
                Open in Google Maps ↗
              </a>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 overflow-hidden rounded-sm border border-border shadow-deep">
            <iframe
              title="Tobize Restaurant location on the map"
              src={MAP_EMBED}
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full grayscale-[30%] contrast-[1.05]"
              style={{ border: 0 }}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
