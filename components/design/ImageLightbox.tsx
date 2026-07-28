"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type ImageLightboxProps = { image: { src: string; alt: string }; onClose: () => void };

export default function ImageLightbox({ image, onClose }: ImageLightboxProps) {
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") onClose(); };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [onClose]);

  return <AnimatePresence><motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-modal="true" aria-label={image.alt} className="fixed inset-0 z-[100] grid place-items-center bg-background/80 p-5 backdrop-blur-xl" onMouseDown={onClose}><motion.div initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .96 }} transition={{ duration: .22 }} className="relative max-h-full w-full max-w-5xl" onMouseDown={(event) => event.stopPropagation()}><img src={image.src} alt={image.alt} className="max-h-[82vh] w-full rounded-[1.5rem] object-contain" /><button type="button" onClick={onClose} aria-label="Close image preview" className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full border border-border bg-background/80 text-foreground backdrop-blur transition-colors hover:bg-card"><X size={18} /></button></motion.div></motion.div></AnimatePresence>;
}
