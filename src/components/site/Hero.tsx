import { motion } from "motion/react";
import hero from "@/assets/heroAR.jpg";
import { WHATSAPP_URL } from "@/lib/contact";

export function Hero() {
  return (
    <section id="top" className="relative h-screen min-h-[640px] w-full overflow-hidden">
      <img
        src={hero}
        alt="Tobize Intercontinental Restaurant"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/75 via-background/45 to-background" />

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-6 text-xs tracking-[0.4em] text-gold"
        >
          DOHA · QATAR
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-[clamp(2.75rem,8.5vw,7rem)] font-bold leading-[1.05] text-foreground"
        >
          Flavors <span className="bg-gradient-gold">Beyond</span>
          <br />
          Borders
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="mt-8 max-w-xl text-base text-muted-foreground sm:text-lg"
        >
          A modern dining experience in the heart of Doha — farrouj, sandwiches, desserts and fresh juices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.9 }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4"
        >
          <a
            href="#menu"
            className="rounded-full bg-gold px-8 py-3.5 text-sm text-primary-foreground transition-all hover:scale-[1.03] hover:shadow-[0_20px_60px_-20px_oklch(0.78_0.14_78_/_0.6)]"
          >
            Browse Menu
          </a>
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-gold/50 px-8 py-3.5 text-sm text-gold transition-all hover:bg-gold hover:text-primary-foreground"
          >
            Book via WhatsApp
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.6, delay: 1.4 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-float"
        >
          <div className="h-12 w-px bg-gradient-to-b from-gold to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
