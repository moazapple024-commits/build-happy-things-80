import { Reveal } from "./Reveal";
import farrouj from "@/assets/farrouj.jpg";
import sandwiches from "@/assets/sandwiches.jpg";
import sweets from "@/assets/sweets.jpg";
import juices from "@/assets/juicesAR.jpg";

const shots = [
  { src: farrouj, alt: "فروج مشوي", h: "row-span-2" },
  { src: sandwiches, alt: "شطائر", h: "" },
  { src: juices, alt: "عصائر طازجة", h: "" },
  { src: sweets, alt: "حلويات", h: "row-span-2" },
];

export function Gallery() {
  return (
    <section id="gallery" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <Reveal>
            <span className="text-xs tracking-[0.4em] text-gold">المعرض</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.15]">
              لحظات من <span className="bg-gradient-gold">توبايز</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="gold-divider mx-auto my-8 w-24" />
          </Reveal>
        </div>

        <div className="mt-12 grid auto-rows-[180px] grid-cols-2 gap-4 md:auto-rows-[240px] md:grid-cols-3">
          {shots.map((s, i) => (
            <Reveal key={i} delay={i * 0.07} className={s.h}>
              <div className="group relative h-full w-full overflow-hidden rounded-sm">
                <img
                  src={s.src}
                  alt={s.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-all duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 transition-all group-hover:ring-gold/40" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
