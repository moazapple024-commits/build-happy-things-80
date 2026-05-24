import { Reveal } from "./Reveal";

export function About() {
  return (
    <section id="about" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-4xl text-center">
        <Reveal>
          <span className="text-xs tracking-[0.4em] text-gold">قصتنا</span>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 font-display text-[clamp(2rem,5vw,3.75rem)] font-bold leading-[1.15]">
            مكان يجمع <span className="bg-gradient-gold">العالم</span> على مائدة واحدة
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="gold-divider mx-auto my-10 w-32" />
        </Reveal>
        <Reveal delay={0.3}>
          <p className="mx-auto max-w-2xl text-lg leading-loose text-muted-foreground">
            يجمع مطعم توبايز إنتركونتيننتال بين النكهات العالمية والضيافة الدافئة
            والأجواء العصرية، ليقدّم لك في قلب الدوحة تجربة طعام راقية تجمع العائلة
            والأصدقاء حول أطباق محضّرة بشغف وعناية.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 gap-8 md:grid-cols-4">
          {[
            ["+50", "صنف مميز"],
            ["يومياً", "مكوّنات طازجة"],
            ["حتى الفجر", "خدمة مستمرة"],
            ["عائلي", "أجواء دافئة"],
          ].map(([k, v]) => (
            <Reveal key={v}>
              <div className="border-r border-border pr-5 text-right">
                <div className="font-display text-3xl text-gold md:text-4xl">{k}</div>
                <div className="mt-2 text-xs tracking-[0.15em] text-muted-foreground">{v}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
