"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";
import Section from "@/components/ui/Section";

const work = [
  ["Visual identities", "Logo systems & branding", "from-neutral-900/70 via-neutral-600/60 to-stone-300/70", "md:col-span-2"],
  ["Editorial posters", "Culture & events", "from-stone-800/70 via-neutral-600/60 to-stone-300/70", ""],
  ["Social visuals", "Campaign storytelling", "from-neutral-700/70 via-stone-500/60 to-stone-300/70", ""],
  ["Digital interfaces", "UI design", "from-neutral-900/70 via-neutral-500/60 to-stone-400/70", "md:col-span-2"],
] as const;

export default function DesignPortfolio() {
  return <Section id="design" eyebrow="Selected direction" title="Design portfolio" description="A flexible gallery for visual identities, posters, social campaigns and interfaces.">
    <div className="grid auto-rows-[220px] gap-5 md:grid-cols-3">
      {work.map(([title, category, gradient, span], index) => <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.08 }} className={span}>
        <GlassCard className="group h-full p-0"><div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-75 transition duration-700 group-hover:scale-110`} /><div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(255,255,255,.65),transparent_28%)]" />
          <div className="relative flex h-full flex-col justify-end p-6 text-white"><span className="text-sm opacity-80">{category}</span><div className="mt-1 flex items-center justify-between"><h3 className="text-2xl font-semibold">{title}</h3><ArrowUpRight className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></div></div>
        </GlassCard>
      </motion.div>)}
    </div>
  </Section>;
}
