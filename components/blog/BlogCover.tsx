import type { BlogPost } from "@/data/blog";

type BlogCoverProps = {
  post: Pick<BlogPost, "title" | "coverImage" | "coverTheme"> & { category: string };
  priority?: boolean;
  className?: string;
};

export default function BlogCover({ post, className = "" }: BlogCoverProps) {
  const imageStyle = post.coverImage ? { backgroundImage: `url(${post.coverImage})` } : undefined;

  return (
    <div className={`relative overflow-hidden bg-gradient-to-br ${post.coverTheme} ${className}`} style={imageStyle}>
      {!post.coverImage && <><div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_20%,rgba(255,255,255,.7),transparent_20%)]" /><div className="absolute -bottom-20 -left-10 h-48 w-48 rounded-full border border-white/35 bg-white/10" /></>}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-white/10" />
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-3 text-white"><span className="rounded-full border border-white/30 bg-black/10 px-3 py-1 text-xs font-medium backdrop-blur">{post.category}</span><span className="text-right text-xs font-medium opacity-80">Dositej Jovanović</span></div>
    </div>
  );
}
