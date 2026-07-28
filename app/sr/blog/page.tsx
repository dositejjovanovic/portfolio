import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import BlogCard from "@/components/blog/BlogCard";
import { getPublicBlogPosts } from "@/lib/content/public-blog";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Dositej Jovanović",
  description: "Arhiva projekata, učeničkog predstavljanja i međunarodnih iskustava Dositeja Jovanovića.",
  alternates: { canonical: "/sr/blog", languages: { en: "/blog", "sr-Latn": "/sr/blog" } },
};

export default async function SerbianBlogArchivePage() {
  const posts = await getPublicBlogPosts();
  return <main className="min-h-screen bg-background px-6 pb-24 pt-32 text-foreground md:px-8"><div className="mx-auto max-w-7xl"><Link href="/sr/#blog" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"><ArrowLeft size={16} /> Nazad na portfolio</Link><header className="mt-10 max-w-3xl"><p className="text-sm font-medium uppercase tracking-[0.24em] text-glow">Arhiva portfolija</p><h1 className="mt-4 text-5xl font-bold tracking-[-0.05em] md:text-7xl">Blog</h1><p className="mt-5 text-lg leading-relaxed text-muted">Tekstovi o učeničkom predstavljanju, obrazovanju, liderstvu i međunarodnoj saradnji. Članci su trenutno dostupni na engleskom jeziku.</p></header><div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">{posts.map((post, index) => <BlogCard key={post.slug} post={post} index={index} locale="sr" />)}</div></div></main>;
}
