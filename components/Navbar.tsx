"use client";

import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{
        opacity: 0,
        y: -20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        px-8
        py-6
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
          flex
          justify-between
          items-center
          rounded-full
          border
          border-zinc-800
          bg-black/50
          backdrop-blur-md
          px-8
          py-4
        "
      >

        <div
          className="
            font-bold
            text-xl
          "
        >
          DJ
        </div>


        <div
          className="
            flex
            gap-8
            text-sm
            text-zinc-400
          "
        >

          <a 
            href="#about"
            className="hover:text-white transition"
          >
            About
          </a>

          <a 
            href="#skills"
            className="hover:text-white transition"
          >
            Skills
          </a>

          <a 
            href="#projects"
            className="hover:text-white transition"
          >
            Projects
          </a>

          <a 
            href="#experience"
            className="hover:text-white transition"
        >
            Experience
            </a>

          <a 
            href="#contact"
            className="hover:text-white transition"
          >
            Contact
          </a>

        </div>

      </div>

    </motion.nav>
  );
}