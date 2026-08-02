"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { useEffect } from "react";
import AnimatedName from "@/components/AnimatedName";
import HeroStats from "@/components/HeroStats";
import { getCopy, type Locale } from "@/data/locale";

type HeroContent = {
  identity: string;
  intro: string;
  supporting: string;
};

const organizationMarks = [
  { src: "/logos/timeline/matematicka.png", alt: "Mathematical Grammar School", position: "-left-6 top-5" },
  { src: "/logos/timeline/sustainable-development-logo.png", alt: "Sustainable Development Section", position: "-right-5 top-14" },
  { src: "/logos/timeline/studenti.png", alt: "Student-led movements", position: "-left-8 top-1/2" },
  { src: "/logos/timeline/mgtv-logo.png", alt: "MGTV", position: "-right-6 bottom-16" },
  { src: "/logos/timeline/unss-logo.png", alt: "Union of High School Students of Serbia", position: "left-1/4 -bottom-6" },
];

const heroDestinations = [
  { id: "about", en: "About", sr: "O meni" },
  { id: "journey", en: "Journey", sr: "Put" },
  { id: "work", en: "Work", sr: "Rad" },
  { id: "contact", en: "Contact", sr: "Kontakt" },
];

const roleRibbon = {
  en: "STUDENT · DESIGNER · YOUTH REPRESENTATIVE · ",
  sr: "UČENIK · DIZAJNER · PREDSTAVNIK MLADIH · ",
};

export default function Hero({ locale, content }: { locale: Locale; content?: HeroContent }) {
  const copy = getCopy(locale).hero;
  const values = { ...copy, ...content };
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 50, damping: 25 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 50, damping: 25 });

  useEffect(() => {
    const move = (event: MouseEvent) => {
      mouseX.set(event.clientX / window.innerWidth - 0.5);
      mouseY.set(event.clientY / window.innerHeight - 0.5);
    };

    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [mouseX, mouseY]);

  const circleOneX = useTransform(smoothMouseX, [-0.5, 0.5], [58, -58]);
  const circleOneY = useTransform(smoothMouseY, [-0.5, 0.5], [58, -58]);
  const orbitRotate = useTransform(smoothMouseX, [-0.5, 0.5], [-14, 14]);
  const portraitX = useTransform(smoothMouseX, [-0.5, 0.5], [-10, 10]);
  const portraitY = useTransform(smoothMouseY, [-0.5, 0.5], [-8, 8]);

  return (
    <section className="relative flex min-h-0 items-center overflow-hidden bg-background px-5 pb-12 pt-28 sm:px-8 md:min-h-[42rem] md:pb-12 md:pt-28">
      <div className="editorial-frame pointer-events-none absolute inset-0 opacity-50" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/10 blur-[120px] sm:h-[500px] sm:w-[500px]" />
      <motion.div
        style={{ x: circleOneX, y: circleOneY }}
        className="pointer-events-none absolute -right-40 -top-40 hidden h-[460px] w-[460px] rounded-full border border-border bg-card/30 backdrop-blur-3xl lg:block"
      />
      <motion.div
        style={{ rotate: orbitRotate }}
        className="pointer-events-none absolute left-[68%] top-1/2 hidden h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border/50 xl:block"
      />

      <div className="pointer-events-none absolute inset-x-0 top-[18%] hidden overflow-hidden xl:block">
        <motion.p initial={{ opacity: 0, x: -56 }} animate={{ opacity: 0.055, x: 0 }} transition={{ delay: 0.18, duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="hero-role-line text-foreground">
          {roleRibbon[locale]}{roleRibbon[locale]}
        </motion.p>
      </div>
      <div className="pointer-events-none absolute inset-x-0 bottom-[5%] hidden overflow-hidden xl:block">
        <motion.p initial={{ opacity: 0, x: 64 }} animate={{ opacity: 0.045, x: 0 }} transition={{ delay: 0.32, duration: 1.1, ease: [0.16, 1, 0.3, 1] }} className="hero-role-line text-foreground">
          {roleRibbon[locale]}{roleRibbon[locale]}
        </motion.p>
      </div>

      <div className="relative z-20 mx-auto w-full max-w-7xl xl:max-w-6xl">
        <div className="relative lg:max-w-[60%]">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
            className="text-xs font-semibold uppercase tracking-[0.16em] text-foreground/80"
          >
            {values.identity}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 max-w-[11ch] text-[clamp(2.9rem,11vw,3.65rem)] font-medium leading-[0.95] tracking-[-0.065em] text-foreground sm:max-w-none sm:text-[clamp(3.25rem,5.3vw,5.5rem)] md:whitespace-nowrap"
          >
            {copy.greeting}&nbsp;
            <span className="whitespace-nowrap">
              <AnimatedName />.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.55 }}
            className="mt-6 max-w-xl text-[0.95rem] leading-relaxed text-muted sm:text-lg"
          >
            {values.intro}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.86, duration: 0.55 }}
            className="mt-2 max-w-xl text-[0.82rem] leading-relaxed text-muted sm:text-base"
          >
            {values.supporting}
          </motion.p>
        </div>

        <HeroStats mouseX={smoothMouseX} mouseY={smoothMouseY} />

        <motion.div
          initial={{ opacity: 0, y: 24, rotate: 3 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: portraitX, y: portraitY }}
          className="relative z-0 mx-auto mt-2 w-[min(82vw,21rem)] lg:absolute lg:right-0 lg:top-1/2 lg:mt-0 lg:w-[17rem] lg:-translate-y-1/2 xl:right-[1rem] xl:w-[17rem]"
        >
          <div className="relative aspect-[5/6] overflow-hidden rounded-[2rem] border border-border bg-card/70 p-2 shadow-[0_24px_80px_color-mix(in_srgb,var(--foreground)_15%,transparent)] backdrop-blur-xl">
            <div className="relative h-full overflow-hidden rounded-[1.55rem]">
              <Image
                src="/portrait/dositej-portrait-cutout.png"
                alt="Dositej Jovanović"
                fill
                priority
                unoptimized
                sizes="(max-width: 1023px) 82vw, (max-width: 1279px) 18rem, 20.5rem"
                className="object-contain object-center"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-background/45 to-transparent" />
            </div>
            <div className="pointer-events-none absolute inset-3 rounded-[1.55rem] border border-white/20" />
          </div>
          <div className="absolute inset-0 hidden lg:block" aria-label="Organizations and initiatives">
            {organizationMarks.map((mark, index) => (
              <motion.div
                key={mark.src}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: [0, index % 2 ? 3 : -3, 0], y: [0, index % 2 ? 5 : -5, 0] }}
                transition={{ delay: 0.75 + index * 0.06, duration: 4.5 + index * 0.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ x: -3, scale: 1.06 }}
                title={mark.alt}
                className={`absolute grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-glow/30 bg-card/90 p-1.5 shadow-[0_10px_24px_var(--shadow)] backdrop-blur-xl ${mark.position}`}
              >
                <Image src={mark.src} alt={mark.alt} width={36} height={36} unoptimized className="h-full w-full object-contain" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.55 }}
          className="relative z-20 mt-5 flex flex-wrap items-center gap-3 lg:max-w-[60%]"
        >
          <a
            href="mailto:dositejjovanovic@gmail.com"
            aria-label="Email Dositej Jovanović"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]"
          >
            <Mail size={17} />
            {copy.email}
          </a>
          <a
            href={locale === "sr" ? "/sr/#work" : "#work"}
            className="rounded-full border border-border px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-foreground hover:text-background"
          >
            {copy.explore}
          </a>
          <span className="inline-flex items-center gap-2 py-2 text-sm text-muted">
            <MapPin size={15} className="text-glow" />
            {copy.location}
          </span>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.12, duration: 0.6 }}
          aria-label={locale === "sr" ? "Brza navigacija" : "Quick navigation"}
          className="relative z-20 mt-8 hidden w-fit items-center gap-1 border-y border-border py-2 lg:flex"
        >
          {heroDestinations.map((destination) => (
            <a
              key={destination.id}
              href={locale === "sr" ? `/sr/#${destination.id}` : `#${destination.id}`}
              className="px-4 py-2 text-xs font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-glow"
            >
              {locale === "sr" ? destination.sr : destination.en}
            </a>
          ))}
        </motion.nav>
      </div>
    </section>
  );
}
