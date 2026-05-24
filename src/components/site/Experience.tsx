import { Reveal } from "./Reveal";
import img from "@/assets/experience.jpg";

const pillars = [
  { t: "Elegant Atmosphere", d: "Soft ambient lighting, intimate seating and refined service." },
  { t: "Family Dining", d: "Spacious tables that welcome celebrations of every size." },
  { t: "International Cuisine", d: "From the Levant to East Asia — under one curated roof." },
  { t: "Late Night Dining", d: "Open into the evening for unhurried, lingering meals." },
];

export function Experience() {
  return (
    <section id="experience" className="relative overflow-hidden px-6 py-32 md:py-44">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-2 lg:items-center">
        <Reveal>
          <div className="relative overflow-hidden rounded-sm shadow-deep">
            <img
              src={img}
              alt="Luxurious dining room"
              loading="lazy"
              width={1600}
              height={1024}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-gold/20" />
          </div>
        </Reveal>

        <div>
          <Reveal>
            <span className="text-xs uppercase tracking-[0.4em] text-gold">The Experience</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,4.5vw,3.75rem)] font-light leading-[1.1]">
              Designed for evenings <br />
              <em className="bg-gradient-gold not-italic">worth remembering.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 max-w-lg text-muted-foreground">
              Every detail at Tobize is composed — from the warm amber glow to the rhythm
              of service — so the food becomes the centerpiece of an evening that lingers.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-px bg-border sm:grid-cols-2">
            {pillars.map((p, i) => (
              <Reveal key={p.t} delay={0.05 * i}>
                <div className="h-full bg-background p-6 transition-colors hover:bg-card">
                  <h3 className="font-display text-xl text-gold">{p.t}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
