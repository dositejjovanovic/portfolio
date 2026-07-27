import type { HTMLAttributes, ReactNode } from "react";

type GlassCardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
};

export default function GlassCard({ children, className = "", ...props }: GlassCardProps) {
  return (
    <div className={`glass-card relative overflow-hidden rounded-[1.5rem] p-5 md:p-6 ${className}`} {...props}>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,var(--glass-highlight),transparent_42%)]" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
