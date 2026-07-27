"use client";

import { motion } from "framer-motion";


export default function Footer() {


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

          Built with

          <span

            className="
              text-foreground
              font-medium
            "

          >

            Next.js

          </span>


        </p>




      </motion.div>



    </footer>

  );

}
