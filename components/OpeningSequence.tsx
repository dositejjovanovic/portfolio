"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";
import AnimatedName from "@/components/AnimatedName";
import { OrganizationText } from "@/components/OrganizationLink";
import { getCopy, type Locale } from "@/data/locale";

type RuleStep = [letter: string, title: string, description: string];

type OpeningContent = {
  hero: { identity: string; intro: string; supporting: string };
  about: { lead: string; paragraphs: string[] };
  currently: { items: string[] };
  story: { description: string; steps: RuleStep[] };
};

type SequenceLayerProps = {
  progress: MotionValue<number>;
  start: number;
  end: number;
  children: ReactNode;
  className?: string;
  sectionId?: string;
};

function SequenceLayer({ progress, start, end, children, className = "", sectionId }: SequenceLayerProps) {
  const enter = start + (end - start) * 0.2;
  const leave = end - (end - start) * 0.2;
  const opacity = useTransform(progress, [start, enter, leave, end], [0, 1, 1, 0]);
  const y = useTransform(progress, [start, enter, leave, end], [64, 0, 0, -64]);
  const scale = useTransform(progress, [start, enter, leave, end], [0.97, 1, 1, 1.025]);

  return <motion.div id={sectionId} style={{ opacity, y, scale }} className={`absolute inset-0 flex items-center justify-center ${className}`}>{children}</motion.div>;
}

function TypedLead({ text, progress, start, end }: { text: string; progress: MotionValue<number>; start: number; end: number }) {
  const words = text.split(" ");

  return (
    <p className="max-w-[19ch] text-[clamp(2.8rem,6.2vw,6.6rem)] font-bold leading-[0.93] tracking-[-0.065em] text-foreground">
      {words.map((word, index) => <TypedWord key={`${word}-${index}`} word={word} index={index} total={words.length} progress={progress} start={start} end={end} />)}
    </p>
  );
}

function TypedWord({ word, index, total, progress, start, end }: { word: string; index: number; total: number; progress: MotionValue<number>; start: number; end: number }) {
  const writingStart = start + (end - start) * (0.08 + (index / total) * 0.58);
  const writingEnd = writingStart + (end - start) * 0.12;
  const opacity = useTransform(progress, [writingStart, writingEnd], [0.08, 1]);
  const y = useTransform(progress, [writingStart, writingEnd], [16, 0]);

  return <motion.span style={{ opacity, y }} className="mr-[0.22em] inline-block">{word}</motion.span>;
}

function CurrentFocus({ item, index, total, progress, start, end }: { item: string; index: number; total: number; progress: MotionValue<number>; start: number; end: number }) {
  const itemStart = start + (end - start) * (index / total);
  const itemEnd = start + (end - start) * ((index + 1) / total);
  const enter = itemStart + (itemEnd - itemStart) * 0.2;
  const leave = itemEnd - (itemEnd - itemStart) * 0.2;
  const opacity = useTransform(progress, [itemStart, enter, leave, itemEnd], [0, 1, 1, 0]);
  const y = useTransform(progress, [itemStart, enter, leave, itemEnd], [52, 0, 0, -52]);

  return <motion.p style={{ opacity, y }} className="absolute max-w-[13ch] text-[clamp(3rem,7.3vw,7.4rem)] font-bold leading-[0.9] tracking-[-0.065em] text-foreground"><OrganizationText>{item}</OrganizationText></motion.p>;
}

export default function OpeningSequence({ locale, content }: { locale: Locale; content: OpeningContent }) {
  const copy = getCopy(locale);
  const sequenceRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: sequenceRef, offset: ["start start", "end end"] });
  const portraitY = useTransform(scrollYProgress, [0, 0.2], [0, -42]);
  const portraitRotate = useTransform(scrollYProgress, [0, 0.2], [-2, 3]);

  return (
    <section ref={sequenceRef} className="relative hidden bg-background lg:block" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden px-8 pt-28 xl:px-12">
        <div className="pointer-events-none absolute left-[12%] top-[20%] h-[26rem] w-[26rem] rounded-full bg-glow/15 blur-[130px]" />
        <div className="pointer-events-none absolute -right-36 top-1/2 h-[40rem] w-[40rem] -translate-y-1/2 rounded-full border border-border/60" />
        <div className="pointer-events-none absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="relative mx-auto h-full max-w-7xl">
          <SequenceLayer progress={scrollYProgress} start={0} end={0.2}>
            <motion.div style={reduceMotion ? undefined : { y: portraitY, rotate: portraitRotate }} className="relative h-[min(68vh,43rem)] w-[min(38vw,30rem)] min-w-[22rem]">
              <div className="absolute inset-0 rounded-[3rem] border border-border bg-card/55 shadow-[0_38px_100px_color-mix(in_srgb,var(--foreground)_18%,transparent)] backdrop-blur-2xl" />
              <div className="absolute inset-3 overflow-hidden rounded-[2.35rem] bg-[radial-gradient(circle_at_52%_34%,color-mix(in_srgb,var(--glow)_24%,transparent),transparent_58%)]">
                <Image src="/portrait/dositej-portrait-cutout.png" alt="Dositej Jovanović" fill priority unoptimized sizes="30rem" className="object-contain object-bottom" />
              </div>
              <p className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.28em] text-muted">{locale === "sr" ? "Skroluj kroz priču" : "Scroll through the story"}</p>
            </motion.div>
          </SequenceLayer>

          <SequenceLayer progress={scrollYProgress} start={0.16} end={0.37}>
            <div className="text-center">
              <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-glow">{content.hero.identity}</p>
              <h1 className="text-[clamp(4.6rem,11vw,11rem)] font-bold leading-[0.82] tracking-[-0.085em] text-foreground">
                {copy.hero.greeting}&nbsp;<span className="whitespace-nowrap"><AnimatedName />.</span>
              </h1>
              <p className="mx-auto mt-9 max-w-xl text-lg leading-relaxed text-muted">{content.hero.intro}</p>
            </div>
          </SequenceLayer>

          <SequenceLayer progress={scrollYProgress} start={0.34} end={0.58} sectionId="about">
            <div className="w-full max-w-6xl">
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-glow">{copy.about.eyebrow}</p>
              <TypedLead text={content.about.lead} progress={scrollYProgress} start={0.34} end={0.58} />
              <div className="mt-9 grid max-w-4xl gap-5 border-t border-border pt-6 md:grid-cols-2">
                {content.about.paragraphs.map((paragraph) => <p key={paragraph} className="text-sm leading-relaxed text-muted"><OrganizationText>{paragraph}</OrganizationText></p>)}
              </div>
            </div>
          </SequenceLayer>

          <SequenceLayer progress={scrollYProgress} start={0.56} end={0.79} sectionId="currently">
            <div className="w-full max-w-6xl">
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.28em] text-glow">{copy.currently.eyebrow}</p>
              <h2 className="mb-9 text-[clamp(3.1rem,7vw,7rem)] font-bold leading-[0.86] tracking-[-0.075em] text-foreground">{copy.currently.title}</h2>
              <div className="relative h-[min(30vh,19rem)] border-t border-border pt-7">
                {content.currently.items.map((item, index) => <CurrentFocus key={item} item={item} index={index} total={content.currently.items.length} progress={scrollYProgress} start={0.56} end={0.79} />)}
              </div>
            </div>
          </SequenceLayer>

          <SequenceLayer progress={scrollYProgress} start={0.77} end={1} sectionId="three-d-rule">
            <div className="w-full max-w-6xl">
              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.28em] text-glow">{copy.story.eyebrow}</p>
              <div className="flex items-end justify-between border-b border-border pb-6">
                <h2 className="text-[clamp(3rem,7vw,7.8rem)] font-bold leading-[0.82] tracking-[-0.09em] text-foreground">3<span className="text-glow">D</span><span className="ml-[0.08em] text-muted/80">ositej</span></h2>
                <p className="mb-1 max-w-sm text-right text-sm leading-relaxed text-muted">{content.story.description}</p>
              </div>
              <div className="mt-7 grid grid-cols-3 gap-4">
                {content.story.steps.map(([letter, title, description]) => (
                  <div key={title} className="relative overflow-hidden rounded-[1.6rem] border border-border bg-card/55 p-6 shadow-[0_16px_44px_var(--shadow)] backdrop-blur-xl">
                    <span className="absolute -right-3 -top-9 text-[8rem] font-bold leading-none tracking-[-0.16em] text-glow/10">{letter}</span>
                    <p className="relative text-5xl font-bold leading-none tracking-[-0.12em] text-glow">{letter}</p>
                    <p className="relative mt-8 text-xl font-semibold tracking-[-0.04em] text-foreground">{title}</p>
                    <p className="relative mt-2 text-sm leading-relaxed text-muted">{description}</p>
                  </div>
                ))}
              </div>
            </div>
          </SequenceLayer>
        </div>
      </div>
    </section>
  );
}
