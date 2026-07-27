"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import Section from "@/components/ui/Section";
import { getCopy, localPath, type Locale } from "@/data/locale";

export default function Blog({ locale }: { locale: Locale }) {
  const copy = getCopy(locale).blog;
  const latestPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return <Section id="blog" eyebrow={copy.eyebrow} title={copy.title} description={copy.description}><div className="grid gap-5 md:grid-cols-3">{latestPosts.map((post, index) => <BlogCard key={post.slug} post={post} index={index} locale={locale} />)}</div><Link href={localPath(locale, "/blog")} className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-glow">{copy.all} <ArrowRight size={16} /></Link></Section>;
}
