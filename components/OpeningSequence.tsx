"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Locale } from "@/data/locale";

type OpeningContent = {
  hero: { identity: string; intro: string; supporting: string };
  about: { lead: string; paragraphs: string[] };
  currently: { items: string[] };
  story: { description: string; steps: [string, string, string][] };
};

const cloudWords = {
  en: [
    "student",
    "designer",
    "youth representative",
    "organizer",
    "activist",
    "researcher",
    "strategist",
    "communicator",
    "learner",
    "leader",
    "creator",
    "editor",
    "technologist",
    "student rights",
    "Europe",
    "education",
    "media",
    "science",
  ],
  sr: [
    "učenik",
    "dizajner",
    "omladinski predstavnik",
    "organizator",
    "aktivista",
    "istraživač",
    "strateg",
    "komunikator",
    "onaj koji uči",
    "lider",
    "stvaralac",
    "urednik",
    "tehnolog",
    "prava učenika",
    "Evropa",
    "obrazovanje",
    "mediji",
    "nauka",
  ],
} as const;

const introCopy = {
  en: {
    continuation: "Well",
    conclusion: "a lot of things.",
    cloudLabel: "A moving definition",
    cloudLead: "I am never just one thing.",
    cloudNote: "Scroll through the orbit",
  },
  sr: {
    continuation: "Pa",
    conclusion: "mnogo toga.",
    cloudLabel: "Definicija u pokretu",
    cloudLead: "Nikada nisam samo jedna stvar.",
    cloudNote: "Prođi kroz orbitu",
  },
} as const;

function WordOrb({ locale }: { locale: Locale }) {
  const words = cloudWords[locale];

  return (
    <div className="opening-word-orb" aria-label={locale === "sr" ? "Reči koje opisuju Dositeja" : "Words that describe Dositej"}>
      <div className="opening-orb-halo" />
      <div className="opening-orb-meridian opening-orb-meridian-one" />
      <div className="opening-orb-meridian opening-orb-meridian-two" />
      <div className="opening-orb-equator" />
      {words.map((word, index) => {
        const angle = (360 / words.length) * index;
        const radius = index % 3 === 0 ? 41 : index % 3 === 1 ? 35 : 29;
        const x = 50 + Math.cos((angle * Math.PI) / 180) * radius;
        const y = 50 + Math.sin((angle * Math.PI) / 180) * radius * 0.66;

        return (
          <motion.span
            key={word}
            className={`opening-orb-word opening-orb-word-${index % 4}`}
            initial={{ opacity: 0, filter: "blur(16px)", scale: 0.8 }}
            whileInView={{ opacity: 1, filter: "blur(0px)", scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ delay: 0.12 + index * 0.045, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            {word}
          </motion.span>
        );
      })}
      <span className="opening-orb-core">DJ</span>
    </div>
  );
}

export default function OpeningSequence({ locale }: { locale: Locale; content: OpeningContent }) {
  const reduceMotion = useReducedMotion();
  const copy = introCopy[locale];

  const reveal = {
    hidden: { opacity: 0, y: 56, filter: "blur(14px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  };

  return (
    <section className="opening-sequence relative overflow-hidden bg-background text-foreground" aria-label={locale === "sr" ? "Uvod" : "Introduction"}>
      <div className="opening-grain pointer-events-none absolute inset-0" />

      <section className="relative flex min-h-[100svh] items-start px-5 pb-16 pt-32 sm:px-8 md:px-12 lg:px-16 lg:pt-40">
        <motion.div
          className="max-w-[12ch]"
          initial={reduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
          variants={reveal}
          transition={{ duration: 1.05, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.26em] text-muted">Dositej Jovanović · 2026</p>
          <h1 className="opening-display text-[clamp(5.4rem,18vw,19rem)] leading-[0.72] tracking-[-0.09em]">I am</h1>
        </motion.div>
        <p className="absolute bottom-8 right-5 max-w-[16ch] text-right text-xs leading-relaxed text-muted sm:right-8 md:right-12 lg:right-16">{locale === "sr" ? "Portfolio u nastajanju" : "A portfolio in motion"}</p>
      </section>

      <section id="about" className="relative flex min-h-[118svh] flex-col justify-center overflow-hidden px-5 py-24 sm:px-8 md:px-12 lg:px-16">
        <motion.p
          className="opening-display self-start text-[clamp(5.2rem,16vw,17rem)] leading-[0.73] tracking-[-0.1em]"
          initial={reduceMotion ? false : { opacity: 0, x: "-32vw", filter: "blur(14px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{ duration: 1.25, ease: [0.16, 1, 0.3, 1] }}
        >
          {copy.continuation}
        </motion.p>
        <motion.p
          className="opening-display mt-8 max-w-[7.5ch] self-end text-right text-[clamp(4.3rem,13vw,14rem)] leading-[0.76] tracking-[-0.1em]"
          initial={reduceMotion ? false : { opacity: 0, x: "32vw", filter: "blur(14px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, amount: 0.42 }}
          transition={{ duration: 1.25, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
        >
          {copy.conclusion}
        </motion.p>
        <motion.p
          className="mt-14 max-w-sm text-base leading-relaxed text-muted sm:text-lg"
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.24 }}
        >
          {locale === "sr" ? "Niti jedna titula nije dovoljna da objasni smer u kom idem." : "No single title can explain the direction I am moving in."}
        </motion.p>
      </section>

      <section id="currently" className="relative flex min-h-[130svh] items-center overflow-hidden px-5 py-24 sm:px-8 md:px-12 lg:px-16">
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 42 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.26em] text-muted">{copy.cloudLabel}</p>
            <h2 className="opening-display max-w-[7ch] text-[clamp(3.7rem,7vw,8.4rem)] leading-[0.8] tracking-[-0.08em]">{copy.cloudLead}</h2>
            <p className="mt-8 max-w-xs text-sm leading-relaxed text-muted">{locale === "sr" ? "Reči se približavaju, gube fokus i ponovo se povezuju — baš kao rad koji se razvija između ljudi, ideja i projekata." : "Words move closer, fall out of focus and reconnect — like work that develops between people, ideas and projects."}</p>
          </motion.div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, scale: 0.88, filter: "blur(22px)" }}
            whileInView={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: true, amount: 0.22 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <WordOrb locale={locale} />
          </motion.div>
        </div>
        <p className="absolute bottom-8 left-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-muted sm:left-8 md:left-12 lg:left-16">{copy.cloudNote}</p>
      </section>
    </section>
  );
}
