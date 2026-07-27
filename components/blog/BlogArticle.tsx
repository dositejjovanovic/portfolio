"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ExternalLink, MapPin, Building2, CalendarDays } from "lucide-react";
import { getBlogTranslation, type BlogLocale, type BlogPost } from "@/data/blog";
import BlogCover from "@/components/blog/BlogCover";
import { OrganizationText } from "@/components/OrganizationLink";
import GlassCard from "@/components/ui/GlassCard";

const formatDate = (date: string, locale: BlogLocale) => new Intl.DateTimeFormat(locale === "sr" ? "sr-Latn" : "en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${date}T00:00:00`));

export default function BlogArticle({ post, locale = "en" }: { post: BlogPost; locale?: BlogLocale }) {
  const content = getBlogTranslation(post, locale)!;
  const isSerbian = locale === "sr";
  const backHref = isSerbian ? "/sr/blog" : "/blog";
  return <main className="min-h-screen bg-background px-6 pb-24 pt-32 text-foreground md:px-8"><article className="mx-auto max-w-4xl"><Link href={backHref} className="mb-9 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"><ArrowLeft size={16} /> {isSerbian ? "Nazad na Blog" : "Back to Blog"}</Link><motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}><p className="text-sm font-medium text-glow">{content.category}</p><h1 className="mt-4 text-4xl font-bold tracking-[-0.05em] text-foreground md:text-7xl"><OrganizationText>{content.title}</OrganizationText></h1><div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted"><span className="inline-flex items-center gap-2"><CalendarDays size={15} />{formatDate(post.date, locale)}</span>{content.organization && <span className="inline-flex items-center gap-2"><Building2 size={15} /><OrganizationText>{content.organization}</OrganizationText></span>}{content.location && <span className="inline-flex items-center gap-2"><MapPin size={15} />{content.location}</span>}</div></motion.header><motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.1 }} className="mt-10"><BlogCover post={{ ...post, title: content.title, category: content.category }} className="h-72 rounded-[2rem] md:h-[28rem]" /></motion.div><div className="mt-10 space-y-8">{content.sections.map((section, index) => <motion.section key={section.heading} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.03 }}><h2 className="text-2xl font-semibold text-foreground">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-3 text-lg leading-relaxed text-muted"><OrganizationText>{paragraph}</OrganizationText></p>)}</motion.section>)}</div><GlassCard className="mt-12"><p className="text-sm font-medium text-glow">{isSerbian ? "Teme" : "Topics"}</p><div className="mt-4 flex flex-wrap gap-2">{content.tags.map((tag) => <span key={tag} className="rounded-full border border-border px-3 py-1 text-sm text-muted"><OrganizationText>{tag}</OrganizationText></span>)}</div><a href={post.linkedInUrl} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-3 text-sm font-medium text-background transition-transform hover:scale-[1.02]">{isSerbian ? "Pogledajte originalnu LinkedIn objavu" : "View original LinkedIn post"} <ExternalLink size={16} /></a></GlassCard></article></main>;
}
