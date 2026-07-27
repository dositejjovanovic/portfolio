"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { ENABLE_LANGUAGE_SWITCHER, getCopy, type Locale } from "@/data/locale";

type NavLink = { label: string; href: string; active?: (pathname: string) => boolean };

function alternatePath(pathname: string, target: Locale) {
  const isSerbian = pathname === "/sr" || pathname.startsWith("/sr/");
  if (target === "sr") return isSerbian ? pathname : `/sr${pathname === "/" ? "" : pathname}`;
  return isSerbian ? pathname.slice(3) || "/" : pathname;
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const locale: Locale = pathname === "/sr" || pathname.startsWith("/sr/") ? "sr" : "en";
  const copy = getCopy(locale).nav;
  const prefix = locale === "sr" ? "/sr" : "";
  const normalizedPath = locale === "sr" ? pathname.slice(3) || "/" : pathname;
  const links: NavLink[] = [
    { label: copy.about, href: `${prefix}/#about` }, { label: copy.journey, href: `${prefix}/#journey` },
    { label: copy.work, href: `${prefix}/#work` }, { label: copy.design, href: `${prefix}/design`, active: (path) => path.startsWith("/design") },
    { label: copy.awards, href: `${prefix}/#awards` }, { label: copy.blog, href: `${prefix}/blog`, active: (path) => path.startsWith("/blog") },
  ];
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [open]);

  const languageSwitcher = <div className="flex items-center rounded-full border border-border bg-card/60 p-1 text-[11px] font-semibold backdrop-blur-md" aria-label="Language selector">
    {(["en", "sr"] as Locale[]).map((item) => <Link key={item} href={alternatePath(pathname, item)} aria-current={locale === item ? "page" : undefined} className={`rounded-full px-2 py-1 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow ${locale === item ? "bg-foreground text-background" : "text-muted hover:text-foreground"}`}>{item.toUpperCase()}</Link>)}
  </div>;

  return <motion.nav initial={{ opacity: 0, y: -18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }} className="fixed inset-x-0 top-0 z-50 px-5 py-4 sm:px-8 lg:py-5" aria-label="Primary navigation">
    <div className="relative mx-auto max-w-6xl"><div className="glass-card flex items-center justify-between rounded-full px-4 py-3 sm:px-5">
      <div className="pointer-events-none absolute inset-0 rounded-full bg-[linear-gradient(105deg,var(--glass-highlight),transparent_35%)]" />
      <Link href={prefix || "/"} onClick={close} className="relative z-10 text-lg font-bold tracking-[-.06em] text-foreground">DJ</Link>
      <div className="relative z-10 hidden items-center gap-5 text-sm text-muted xl:flex">{links.map((link) => <Link key={link.href} href={link.href} className={`transition-colors hover:text-foreground ${(link.active?.(normalizedPath) ?? false) ? "text-foreground" : ""}`}>{link.label}</Link>)}</div>
      <div className="relative z-10 flex items-center gap-2"><Link href={`${prefix}/#contact`} className="hidden rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-transform hover:scale-[1.02] sm:inline-flex">{copy.contact}</Link>{ENABLE_LANGUAGE_SWITCHER && languageSwitcher}<ThemeToggle /><button type="button" aria-label={open ? copy.close : copy.open} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card/70 text-foreground shadow-[0_8px_24px_var(--shadow)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow xl:hidden">{open ? <X size={19} /> : <Menu size={20} />}</button></div>
    </div><AnimatePresence>{open && <motion.div initial={{ opacity: 0, y: -10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.98 }} transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }} className="glass-card absolute left-0 right-0 top-[calc(100%+.65rem)] rounded-[1.75rem] p-3 xl:hidden"><div className="grid gap-1">{links.map((link, index) => <motion.div key={link.href} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.035 }}><Link href={link.href} onClick={close} className="block rounded-2xl px-4 py-3 text-base font-medium text-foreground hover:bg-card">{link.label}</Link></motion.div>)}<Link href={`${prefix}/#contact`} onClick={close} className="rounded-2xl bg-foreground px-4 py-3 text-base font-medium text-background">{copy.contact}</Link></div></motion.div>}</AnimatePresence></div>
  </motion.nav>;
}
