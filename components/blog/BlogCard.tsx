"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { getBlogTranslation, type BlogPost } from "@/data/blog";
import BlogCover from "@/components/blog/BlogCover";
import { OrganizationText } from "@/components/OrganizationLink";
import GlassCard from "@/components/ui/GlassCard";
import { getCopy, type Locale } from "@/data/locale";

export default function BlogCard({ post, index = 0, locale = "en" }: { post: BlogPost; index?: number; locale?: Locale }) {
  const copy = getCopy(locale).blog;
  const translation = getBlogTranslation(post, locale);
  const isFallback = !translation;
  const displayed = translation ?? getBlogTranslation(post, "en")!;
  const href = isFallback ? `/blog/${post.slug}` : locale === "sr" ? `/sr/blog/${post.slug}` : `/blog/${post.slug}`;
  const coverPost = { ...post, title: displayed.title, category: displayed.category };
  return <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: index * 0.06 }} whileHover={{ y: -6 }} className="h-full"><GlassCard className="group h-full p-0"><BlogCover post={coverPost} className="h-48 transition-transform duration-700 group-hover:scale-[1.02]" /><div className="flex h-[calc(100%-12rem)] flex-col p-6"><p className="flex items-center gap-2 text-sm text-muted"><CalendarDays size={15} />{new Intl.DateTimeFormat(locale === "sr" ? "sr-Latn" : "en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${post.date}T00:00:00`))}</p><h3 className="mt-4 text-xl font-semibold leading-tight text-foreground"><OrganizationText>{displayed.title}</OrganizationText></h3><p className="mt-3 text-sm leading-relaxed text-muted"><OrganizationText>{displayed.excerpt}</OrganizationText></p>{isFallback && <p className="mt-3 text-xs font-medium text-glow">{copy.availableEnglish}</p>}<Link href={href} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-glow">{isFallback ? copy.readEnglish : copy.read} <ArrowUpRight size={16} /></Link></div></GlassCard></motion.article>;
}
