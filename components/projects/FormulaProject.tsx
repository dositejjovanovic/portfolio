"use client";

import Image from "next/image";
import Link from "next/link";
import { animate, motion, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, CalendarDays, MapPin, Users } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { formula, type FormulaStatistic } from "@/data/formula";
import GlassCard from "@/components/ui/GlassCard";

function AnimatedStatistic({ statistic }: { statistic: FormulaStatistic }) {
  const reference = useRef<HTMLSpanElement>(null);
  const isVisible = useInView(reference, { once: true, amount: 0.6 });
  const reduceMotion = useReducedMotion();
  const value = useMotionValue(0);
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isVisible || reduceMotion) return;

    return animate(value, statistic.value, {
      duration: 1.25,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(String(Math.round(latest))),
    }).stop;
  }, [isVisible, reduceMotion, statistic.value, value]);

  return (
    <span ref={reference}>
      {reduceMotion && isVisible ? statistic.value : display}
      {statistic.suffix}
    </span>
  );
}

function SectionTitle({ eyebrow, title, children }: { eyebrow?: string; title: string; children?: ReactNode }) {
  return (
    <div className="max-w-2xl">
      {eyebrow && <p className="text-[11px] font-medium uppercase tracking-[.2em] text-muted">{eyebrow}</p>}
      <h2 className="mt-2 text-2xl font-semibold tracking-[-.04em] text-foreground sm:text-3xl">{title}</h2>
      {children}
    </div>
  );
}

function FormulaPlaceholder({ label = "Formula visuals" }: { label?: string }) {
  return (
    <div className="grid min-h-64 place-items-center rounded-[1.5rem] border border-border bg-[radial-gradient(circle_at_72%_18%,var(--glass-highlight),transparent_25%),linear-gradient(135deg,color-mix(in_srgb,var(--glow)_28%,transparent),transparent_72%)] p-5 text-center">
      <div>
        <p className="font-medium text-foreground">{label}</p>
        <p className="mt-1 text-sm text-muted">More visuals coming soon</p>
      </div>
    </div>
  );
}

export default function FormulaProject() {
  const gallery = formula.gallery.filter((group) => group.images.length > 0);

  return (
    <main className="min-h-screen bg-background px-5 pb-14 pt-28 text-foreground sm:px-8 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        <Link href="/#work" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
          <ArrowLeft size={16} />
          Back to Projects
        </Link>

        <header className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_.9fr] lg:items-end">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[.2em] text-muted">Science · Education · Youth</p>
            <h1 className="mt-3 text-5xl font-bold tracking-[-.065em] sm:text-6xl">{formula.title}</h1>
            <p className="mt-2 text-xl font-medium text-glow sm:text-2xl">{formula.subtitle}</p>
            <p className="mt-5 max-w-xl leading-relaxed text-muted">{formula.summary}</p>
            <div className="mt-6 grid gap-2 text-sm text-muted sm:grid-cols-3">
              <span className="inline-flex items-center gap-2"><CalendarDays size={15} className="text-glow" />{formula.date}</span>
              <span className="inline-flex items-center gap-2"><MapPin size={15} className="text-glow" />{formula.location}</span>
              <span className="inline-flex items-center gap-2"><Users size={15} className="text-glow" />Co-created with Anđela Gavrilović</span>
            </div>
          </div>
          {formula.cover ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] border border-border">
              <Image src={formula.cover.src} alt={formula.cover.alt} fill unoptimized sizes="(max-width: 1024px) 100vw, 40vw" className="object-contain" priority />
            </div>
          ) : <FormulaPlaceholder label="Formula — Young Researchers Forum" />}
        </header>

        <section className="mt-10">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {formula.statistics.map((statistic, index) => (
              <motion.div key={statistic.label} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }} className={index === 4 ? "sm:col-span-2 lg:col-span-1" : ""}>
                <GlassCard className="h-full p-4 text-center">
                  <p className="text-3xl font-semibold tracking-[-.06em] text-foreground"><AnimatedStatistic statistic={statistic} /></p>
                  <p className="mt-1 text-xs text-muted">{statistic.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-[1.1fr_.9fr]">
          <div>
            <SectionTitle eyebrow="What Formula is" title="A forum for young research">
              <p className="mt-4 leading-relaxed text-muted">Formula is a youth science forum created at the Mathematical Grammar School in Belgrade to give students a space to present their research, projects and ideas to a wider audience.</p>
              <p className="mt-3 leading-relaxed text-muted">The event connected young researchers, students, teachers, university lecturers and visitors through project exhibitions, academic lectures and direct exchange. It was designed to show the process behind discovery: curiosity, experimentation, collaboration and the courage to present an idea publicly.</p>
            </SectionTitle>
          </div>
          <GlassCard className="p-4 sm:p-5">
            <p className="text-sm font-medium text-foreground">Why Formula?</p>
            <div className="mt-4 grid gap-2">
              {formula.goals.map((goal, index) => <div key={goal} className="flex gap-3 rounded-xl border border-border px-3 py-2.5 text-sm text-muted"><span className="font-medium text-glow">0{index + 1}</span>{goal}</div>)}
            </div>
          </GlassCard>
        </section>

        <section className="mt-14">
          <SectionTitle eyebrow="Event format" title="Research, exchange and discovery" />
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            {formula.format.map((item) => (
              <GlassCard key={item.title} className="p-4">
                <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-muted">
                  {item.facts.map((fact) => <li key={fact} className="flex gap-2"><span className="text-glow">•</span>{fact}</li>)}
                </ul>
              </GlassCard>
            ))}
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <GlassCard className="p-4 sm:p-5">
            <SectionTitle eyebrow="Behind Formula" title="Built through collaboration">
              <p className="mt-4 text-sm leading-relaxed text-muted">Formula was co-created and organized by {formula.organizers}, with the support of students, teachers, lecturers and the wider school community.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">The work involved developing the concept, shaping the format, coordinating participants and stands, organizing program elements, promotion, logistics, event-day coordination and feedback collection.</p>
            </SectionTitle>
          </GlassCard>
          <div>
            <SectionTitle eyebrow="What Formula achieved" title="A shared platform for science">
              <p className="mt-4 text-sm leading-relaxed text-muted">Students received a public platform for their work, while visitors could engage directly with young researchers. The forum connected scientific disciplines and brought secondary and university education into closer conversation.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">The response showed the potential for Formula to grow into a recurring platform without assuming that future editions are confirmed.</p>
            </SectionTitle>
          </div>
        </section>

        <section className="mt-14">
          <SectionTitle eyebrow="Formula journey" title="From idea to evaluation" />
          <div className="mt-5 grid gap-3 md:grid-cols-5">
            {formula.timeline.map((item, index) => (
              <motion.div key={item.title} initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.06 }}>
                <GlassCard className="h-full p-4">
                  <p className="text-[10px] font-medium uppercase tracking-[.16em] text-glow">0{index + 1}</p>
                  <h3 className="mt-2 text-base font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted">{item.text}</p>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="mt-14">
          <SectionTitle eyebrow="Visual gallery" title="Formula in practice" />
          <div className="mt-5">
            {gallery.length === 0 ? <FormulaPlaceholder /> : (
              <div className="grid gap-5">
                {gallery.map((group) => <div key={group.title}><h3 className="mb-3 text-sm font-medium text-foreground">{group.title}</h3><div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{group.images.map((image, index) => <motion.figure key={image.src} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ delay: index * 0.035 }} className={index === 0 ? "sm:col-span-2 lg:col-span-2" : ""}><div className={`group relative overflow-hidden rounded-[1.25rem] border border-border bg-card ${index === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}><img src={image.src} alt={image.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" /></div></motion.figure>)}</div></div>)}
              </div>
            )}
          </div>
        </section>

        <section className="mt-14 grid gap-5 lg:grid-cols-2">
          <GlassCard className="p-4 sm:p-5">
            <SectionTitle eyebrow="What comes next?" title="A model for greater visibility">
              <p className="mt-4 text-sm leading-relaxed text-muted">Formula was designed not only as a single event, but as a model for giving young researchers greater visibility and creating stronger connections between schools, universities and the wider community.</p>
              <p className="mt-3 text-sm leading-relaxed text-muted">Its future development may include new editions, a broader network of participants and more opportunities for students to present and develop their work.</p>
            </SectionTitle>
          </GlassCard>
          <GlassCard className="p-4 sm:p-5">
            <SectionTitle eyebrow="Related content" title="Continue exploring">
              <p className="mt-4 text-sm leading-relaxed text-muted">Discover further projects, design work and public activities across the portfolio.</p>
              <Link href="/#work" className="mt-5 inline-flex items-center gap-2 text-sm font-medium transition-colors hover:text-glow">Back to Projects <ArrowUpRight size={16} /></Link>
            </SectionTitle>
          </GlassCard>
        </section>

        <Link href="/#work" className="mt-12 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground">
          <ArrowLeft size={16} />
          Back to Projects
        </Link>
      </div>
    </main>
  );
}
