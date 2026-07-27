"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const latinCharacters = Array.from("Dositej");

export default function AnimatedName() {
  const reduceMotion = useReducedMotion();
  const [revealed, setRevealed] = useState(Boolean(reduceMotion));

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setTimeout(() => setRevealed(true), 900);
    return () => window.clearTimeout(timer);
  }, [reduceMotion]);

  return <span aria-label="Dositej" className="relative inline-grid whitespace-nowrap tracking-[-0.02em]"><motion.span aria-hidden="true" animate={{ opacity: revealed ? 0 : 1, y: revealed ? "-.08em" : 0, filter: revealed ? "blur(1px)" : "blur(0px)" }} transition={{ duration: .34, ease: [0.16, 1, .3, 1] }} className="col-start-1 row-start-1">Доситеј</motion.span><span aria-hidden="true" className="col-start-1 row-start-1 inline-block">{latinCharacters.map((character, index) => <motion.span key={`${character}-${index}`} initial={false} animate={{ opacity: revealed ? 1 : 0, y: revealed ? 0 : ".16em", filter: revealed ? "blur(0px)" : "blur(2px)" }} transition={{ duration: .34, delay: revealed ? index * .065 : 0, ease: [0.16, 1, .3, 1] }} className="inline-block">{character}</motion.span>)}</span></span>;
}
