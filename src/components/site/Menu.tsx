import { Reveal } from "./Reveal";
import farrouj from "@/assets/farrouj.jpg";
import sandwiches from "@/assets/sandwiches.jpg";
import sweets from "@/assets/sweets.jpg";
import juices from "@/assets/juicesAR.jpg";

const items = [
  { img: farrouj, title: "الفروج", desc: "فروج ذهبي مشوي بتتبيلتنا الخاصة مع الثوم والمخللات." },
  { img: sandwiches, title: "الشطائر", desc: "شطائر فاخرة بخبز طازج وحشوات شهية ومتنوعة." },
  { img: sweets, title: "الحلويات", desc: "حلويات شرقية وعالمية بلمسة عصرية تختم وجبتك." },
  { img: juices, title: "العصائر", desc: "عصائر طبيعية طازجة وموكتيلات منعشة على مدار اليوم." },
];

export function Menu() {
  return (
    <section id="menu" className="relative bg-card px-6 py-28 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <Reveal>
            <span className="text-xs tracking-[0.4em] text-gold">قائمتنا</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.15]">
              أطباق <span className="bg-gradient-gold">مختارة</span> بعناية
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="gold-divider mx-auto my-8 w-24" />
          </Reveal>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it, i) => (
            <Reveal key={it.title} delay={i * 0.08}>
              <article className="group relative h-[420px] overflow-hidden rounded-sm bg-background shadow-deep">
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  width={1024}
                  height={1024}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-right">
                  <div className="h-px w-10 bg-gold transition-all duration-500 group-hover:w-20" />
                  <h3 className="mt-3 font-display text-3xl text-foreground">{it.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{it.desc}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
