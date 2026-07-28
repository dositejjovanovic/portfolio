"use client";

import { motion } from "framer-motion";
import type { Locale } from "@/data/locale";
import Link from "next/link";
import { adminConfig } from "@/lib/admin/config";


export default function Footer({ locale, note }: { locale: Locale; note?: string }) {


  return (

    <footer

      className="
        py-8
        px-5
        sm:px-8
        bg-background
      "

    >



      <motion.div

        initial={{
          opacity:0,
        }}

        whileInView={{
          opacity:1,
        }}

        transition={{
          duration:.8,
        }}

        viewport={{
          once:true,
        }}



        className="

          max-w-7xl

          mx-auto

          border-t
          border-border

          pt-8

          flex

          flex-col
          md:flex-row

          gap-4

          justify-between

          items-center

          text-sm

          text-muted

        "

      >



        <p>

          © {new Date().getFullYear()} Dositej Jovanović

        </p>



        <p

          className="
            flex
            items-center
            gap-2
          "

        >

          {note ?? (locale === "sr" ? "Napravljeno uz radoznalost i pažnju" : "Built with curiosity and care")}

          <span

            className="
              text-foreground
              font-medium
            "

          >

            Next.js

          </span>

          {adminConfig.footerEntryVisible && <Link href="/admin/login" className="ml-2 text-xs text-muted transition-colors hover:text-foreground">Admin</Link>}


        </p>




      </motion.div>



    </footer>

  );

}
