"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function LocaleHtmlAttributes() {
  const pathname = usePathname();
  useEffect(() => {
    document.documentElement.lang = pathname === "/sr" || pathname.startsWith("/sr/") ? "sr-Latn" : "en";
  }, [pathname]);
  return null;
}
