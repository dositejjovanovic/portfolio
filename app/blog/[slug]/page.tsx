import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogArticle from "@/components/blog/BlogArticle";
import { getBlogTranslation } from "@/data/blog";
import { getPublicBlogPost } from "@/lib/content/public-blog";

export const dynamic = "force-dynamic";

type BlogPostPageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublicBlogPost(slug);
  if (!post) return {};
  const content = getBlogTranslation(post, "en")!;
  return { title: `${content.seoTitle ?? content.title} | Dositej Jovanović`, description: content.seoDescription ?? content.excerpt, openGraph: { title: content.seoTitle ?? content.title, description: content.seoDescription ?? content.excerpt }, alternates: { canonical: `/blog/${slug}`, languages: { en: `/blog/${slug}`, "sr-Latn": `/sr/blog/${slug}` } } };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublicBlogPost(slug);
  if (!post) notFound();
  return <BlogArticle post={post} locale="en" />;
}
