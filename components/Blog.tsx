"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";
import Section from "@/components/ui/Section";

export default function Blog() {
  const latestPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);
  return <Section id="blog" eyebrow="Portfolio archive" title="Blog" description="A professional archive of student representation, projects, achievements and public updates."><div className="grid gap-5 md:grid-cols-3">{latestPosts.map((post, index) => <BlogCard key={post.slug} post={post} index={index} />)}</div><Link href="/blog" className="mt-9 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-glow">View all articles <ArrowRight size={16} /></Link></Section>;
}
