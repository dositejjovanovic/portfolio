"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";

const links = [["About", "#about"], ["Journey", "#journey"], ["Work", "#work"], ["Design", "#design"], ["Awards", "#awards"], ["Blog", "#blog"]] as const;

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  return <motion.nav initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, ease: [0.16, 1, .3, 1] }} className="fixed inset-x-0 top-0 z-50 px-5 py-4 sm:px-8 lg:py-5"><div className="relative mx-auto max-w-6xl"><div className="glass-card flex items-center justify-between rounded-full px-4 py-3 sm:px-5"><div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(105deg,var(--glass-highlight),transparent_35%)]" /><a href="#top" onClick={close} className="relative z-10 text-lg font-bold tracking-[-.06em] text-foreground">DJ</a><div className="relative z-10 hidden items-center gap-5 text-sm text-muted xl:flex">{links.map(([label, href]) => <a key={href} href={href} className="transition-colors hover:text-foreground">{label}</a>)}</div><div className="relative z-10 flex items-center gap-2"><a href="#contact" className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02] sm:inline-flex">Contact</a><ThemeToggle /><button aria-label={open ? "Close navigation" : "Open navigation"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/70 text-foreground shadow-[0_8px_24px_var(--shadow)] xl:hidden">{open ? <X size={19} /> : <Menu size={20} />}</button></div></div><AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -10, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: .98 }} transition={{ duration: .28, ease: [0.16, 1, .3, 1] }} className="glass-card absolute left-0 right-0 top-[calc(100%+.65rem)] rounded-[1.75rem] p-3 xl:hidden"><div className="grid gap-1">{links.map(([label, href], index) => <motion.a key={href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * .035 }} href={href} onClick={close} className="rounded-2xl px-4 py-3 text-base font-medium text-foreground hover:bg-card">{label}</motion.a>)}<a href="#contact" onClick={close} className="rounded-2xl bg-foreground px-4 py-3 text-base font-medium text-background">Contact</a></div></motion.div>}</AnimatePresence></div></motion.nav>;
}
