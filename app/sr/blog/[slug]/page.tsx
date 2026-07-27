import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import BlogArticle from "@/components/blog/BlogArticle";
import { getBlogPost, getBlogTranslation } from "@/data/blog";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  const content = getBlogTranslation(post, "sr");
  return {
    title: content ? `${content.seoTitle ?? content.title} | Dositej Jovanović` : "Tekst dostupan na engleskom | Dositej Jovanović",
    description: content?.seoDescription ?? content?.excerpt ?? "Ovaj tekst je trenutno dostupan samo na engleskom.",
    openGraph: { title: content?.seoTitle ?? content?.title ?? "Tekst dostupan na engleskom", description: content?.seoDescription ?? content?.excerpt ?? "Ovaj tekst je trenutno dostupan samo na engleskom." },
    alternates: { canonical: `/sr/blog/${slug}`, languages: { en: `/blog/${slug}`, "sr-Latn": `/sr/blog/${slug}` } },
  };
}

export default async function SerbianBlogArticle({ params }: Props) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  if (getBlogTranslation(post, "sr")) return <BlogArticle post={post} locale="sr" />;
  return <main className="min-h-screen bg-background px-6 pb-24 pt-32 text-foreground md:px-8"><div className="mx-auto max-w-2xl"><Link href="/sr/blog" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"><ArrowLeft size={16} /> Nazad na Blog</Link><h1 className="mt-10 text-4xl font-bold tracking-[-.05em]">Tekst je trenutno dostupan na engleskom.</h1><p className="mt-5 text-lg leading-relaxed text-muted">Srpski prevod ovog članka još nije redigovan. Originalni tekst možete pročitati na engleskom.</p><Link href={`/blog/${post.slug}`} className="mt-8 inline-flex rounded-full border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground shadow-[0_6px_18px_var(--shadow)] backdrop-blur-md transition-colors hover:border-glow hover:bg-glow/10">Pročitajte na engleskom</Link></div></main>;
}
