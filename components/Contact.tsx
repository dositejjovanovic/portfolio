"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, Mail } from "lucide-react";
import { FaInstagram, FaLinkedin } from "react-icons/fa";
import type { Locale } from "@/data/locale";
import ContactSignalField from "@/components/ui/ContactSignalField";

export default function Contact({ locale, content }: { locale: Locale; content?: { title: string; description: string } }) {
  const [activeSignal, setActiveSignal] = useState<0 | 1 | 2 | null>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);
  const fallback = locale === "sr"
    ? { title: "Kontakt", description: "Otvoren sam za smislene razgovore, nove saradnje i projekte koji stvaraju stvarnu vrednost." }
    : { title: "Contact", description: "Interested in education, youth participation, international cooperation or visual communication? Let’s connect." };
  const values = content ?? fallback;
  const actions = [
    { label: locale === "sr" ? "Pošalji e-mail" : "Send an email", href: "mailto:dositejjovanovic@gmail.com", icon: Mail, external: false },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/dositej-jovanović-b91b3235a/", icon: FaLinkedin, external: true },
    { label: "Instagram", href: "https://www.instagram.com/_dositej/", icon: FaInstagram, external: true },
  ];

  return <section id="contact" onPointerMove={(event) => setPointer({ x: event.clientX, y: event.clientY })} onPointerLeave={() => { setActiveSignal(null); setPointer(null); }} className="relative overflow-hidden border-t border-border bg-[#0c0c0b] px-5 py-24 text-[#f5f5f1] sm:px-8 md:px-12 md:py-36">
    <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-white/15" />
    <div className="pointer-events-none absolute bottom-0 left-[8%] h-52 w-52 rounded-full bg-white/10 blur-[100px]" />
    <ContactSignalField activeSignal={activeSignal} pointer={pointer} />
    <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:gap-24">
      <motion.div initial={{ opacity: 0, y: 34 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, ease: [0.16, 1, .3, 1] }}>
        <p className="editorial-kicker text-white/55">{locale === "sr" ? "Sledeća saradnja" : "The next collaboration"}</p>
        <h2 className="mt-7 max-w-[10ch] text-[clamp(4rem,8vw,9rem)] font-medium leading-[.8] tracking-[-.08em] text-white">{values.title}</h2>
        <p className="mt-8 max-w-xl text-base leading-relaxed text-white/65 sm:text-lg">{values.description}</p>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: .75, delay: .1, ease: [0.16, 1, .3, 1] }} className="border-t border-white/20">
        {actions.map(({ label, href, icon: Icon, external }, index) => <a key={label} href={href} target={external ? "_blank" : undefined} rel={external ? "noopener noreferrer" : undefined} onPointerEnter={() => setActiveSignal(index as 0 | 1 | 2)} onFocus={() => setActiveSignal(index as 0 | 1 | 2)} onBlur={() => setActiveSignal(null)} className="group flex items-center justify-between border-b border-white/20 py-5 text-lg font-medium tracking-[-.035em] text-white transition-colors hover:text-white/60"><span className="flex items-center gap-3"><Icon size={18} />{label}</span><ArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" size={19} /></a>)}
      </motion.div>
    </div>
  </section>;
}
