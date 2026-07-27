import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { blogPosts } from "@/data/blog";
import BlogCard from "@/components/blog/BlogCard";

export const metadata: Metadata = { title: "Blog | Dositej Jovanović", description: "Projects, student representation and international experience by Dositej Jovanović." };

export default function BlogArchivePage() {
  const posts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  return <main className="min-h-screen bg-background px-6 pb-24 pt-32 text-foreground md:px-8"><div className="mx-auto max-w-7xl"><Link href="/#blog" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"><ArrowLeft size={16} /> Back to portfolio</Link><header className="mt-10 max-w-3xl"><p className="text-sm font-medium uppercase tracking-[0.24em] text-glow">Portfolio archive</p><h1 className="mt-4 text-5xl font-bold tracking-[-0.05em] md:text-7xl">Blog</h1><p className="mt-5 text-lg leading-relaxed text-muted">Activities, projects and reflections on student representation, education, leadership and international cooperation.</p></header><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{posts.map((post, index) => <BlogCard key={post.slug} post={post} index={index} />)}</div></div></main>;
}
