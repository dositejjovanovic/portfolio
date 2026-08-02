"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { type BlogPost } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import Section from "@/components/ui/Section";
import { getCopy, localPath, type Locale } from "@/data/locale";

export default function Blog({ locale, posts }: { locale: Locale; posts: BlogPost[] }) {
  const copy = getCopy(locale).blog;
  const latestPosts = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return <Section id="blog" eyebrow={copy.eyebrow} title={copy.title} description={copy.description}><div className="grid overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">{latestPosts.map((post, index) => <div key={post.slug} className="border-b border-border bg-background last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"><BlogCard post={post} index={index} locale={locale} /></div>)}</div><Link href={localPath(locale, "/blog")} className="mt-9 inline-flex items-center gap-2 text-sm font-semibold text-foreground underline decoration-glow decoration-2 underline-offset-4 transition-colors hover:text-glow">{copy.all} <ArrowRight size={16} /></Link></Section>;
}
