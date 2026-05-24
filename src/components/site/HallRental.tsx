import { Reveal } from "./Reveal";
import { MessageCircle } from "lucide-react";
import hall1 from "@/assets/hall-1.jpg";
import hall2 from "@/assets/hall-2.jpg";

const WHATSAPP_URL = `https://wa.me/97474444386?text=${encodeURIComponent(
  "Hello, I'd like to book the private hall at Tobize Intercontinental Restaurant (200 QAR / hour).",
)}`;

export function HallRental() {
  return (
    <section id="hall" className="relative bg-background px-4 py-20 sm:px-6 md:py-28">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <Reveal>
            <span className="text-xs tracking-[0.4em] text-gold">EXCLUSIVE SPACE</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-4 font-display text-[clamp(1.75rem,5vw,3rem)] font-bold leading-[1.15]">
              Private <span className="bg-gradient-gold">Hall Rental</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="gold-divider mx-auto my-6 w-20" />
          </Reveal>
          <Reveal delay={0.25}>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Available for private events and gatherings — birthdays, business
              meetings and family occasions in an elegant, intimate setting.
            </p>
          </Reveal>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {[hall1, hall2].map((src, i) => (
            <Reveal key={src} delay={i * 0.08}>
              <div className="group relative h-64 overflow-hidden rounded-lg shadow-deep sm:h-72">
                <img
                  src={src}
                  alt={`Private hall view ${i + 1}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="mt-10 flex flex-col items-center gap-5 rounded-xl border border-gold/30 bg-card p-6 text-center shadow-deep sm:p-8">
            <div>
              <p className="text-xs tracking-[0.3em] text-muted-foreground">
                STARTING FROM
              </p>
              <p className="mt-2 font-display text-3xl font-bold sm:text-4xl">
                <span className="bg-gradient-gold">200 QAR</span>
                <span className="ml-2 text-base font-normal text-muted-foreground">
                  / hour
                </span>
              </p>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-gold px-7 py-3 text-sm font-semibold text-primary-foreground shadow-deep transition-transform active:scale-95 sm:text-base"
            >
              <MessageCircle className="h-5 w-5" />
              Book via WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
