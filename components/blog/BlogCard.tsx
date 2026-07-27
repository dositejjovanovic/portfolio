"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import type { BlogPost } from "@/data/blog";
import BlogCover from "@/components/blog/BlogCover";
import GlassCard from "@/components/ui/GlassCard";

export default function BlogCard({ post, index = 0 }: { post: BlogPost; index?: number }) {
  return <motion.article initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 0.55, delay: index * 0.06 }} whileHover={{ y: -6 }} className="h-full"><GlassCard className="group h-full p-0"><BlogCover post={post} className="h-48 transition-transform duration-700 group-hover:scale-[1.02]" /><div className="flex h-[calc(100%-12rem)] flex-col p-6"><p className="flex items-center gap-2 text-sm text-muted"><CalendarDays size={15} />{new Intl.DateTimeFormat("en", { day: "numeric", month: "long", year: "numeric" }).format(new Date(`${post.date}T00:00:00`))}</p><h3 className="mt-4 text-xl font-semibold leading-tight text-foreground">{post.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted">{post.excerpt}</p><Link href={`/blog/${post.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-glow">Read more <ArrowUpRight size={16} /></Link></div></GlassCard></motion.article>;
}
