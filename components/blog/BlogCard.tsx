"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import { getBlogTranslation, type BlogPost } from "@/data/blog";
import BlogCover from "@/components/blog/BlogCover";
import { OrganizationText } from "@/components/OrganizationLink";
import { getCopy, type Locale } from "@/data/locale";

export default function BlogCard({ post, index = 0, locale = "en" }: { post: BlogPost; index?: number; locale?: Locale }) {
  const copy = getCopy(locale).blog;
  const translation = getBlogTranslation(post, locale);
  const isFallback = !translation;
  const displayed = translation ?? getBlogTranslation(post, "en")!;
  const href = isFallback ? `/blog/${post.slug}` : locale === "sr" ? `/sr/blog/${post.slug}` : `/blog/${post.slug}`;
  const coverPost = { ...post, title: displayed.title, category: displayed.category };
  return <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: index * 0.06 }} whileHover={{ y: -6 }} className="group h-full overflow-hidden bg-background"><BlogCover post={coverPost} className="h-56 transition-transform duration-700 group-hover:scale-[1.025]" /><div className="flex h-[calc(100%-14rem)] flex-col p-6"><p className="editorial-kicker flex items-center gap-2 text-muted"><CalendarDays size={14} />{new Intl.DateTimeFormat(locale === "sr" ? "sr-Latn" : "en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${post.date}T00:00:00`))}</p><h3 className="mt-5 text-2xl font-medium leading-[.95] tracking-[-.05em] text-foreground"><OrganizationText>{displayed.title}</OrganizationText></h3><p className="mt-4 text-sm leading-relaxed text-muted"><OrganizationText>{displayed.excerpt}</OrganizationText></p>{isFallback && <p className="mt-3 text-xs font-medium text-glow">{copy.availableEnglish}</p>}<Link href={href} className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-glow decoration-2 underline-offset-4 transition-colors hover:text-glow">{isFallback ? copy.readEnglish : copy.read} <ArrowUpRight size={16} /></Link></div></motion.article>;
}
