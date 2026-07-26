"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

export default function Contact() {
  return (
    <section
      id="contact"
      className="
        py-24
        px-8
      "
    >

      <div
        className="
          max-w-7xl
          mx-auto
        "
      >

        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.6,
          }}

          viewport={{
            once: true,
          }}

          className="
            text-5xl
            font-bold
            mb-8
          "
        >
          Contact
        </motion.h2>


        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.6,
            delay: 0.1,
          }}

          viewport={{
            once: true,
          }}

          className="
            text-xl
            text-zinc-400
            max-w-2xl
            leading-relaxed
            mb-10
          "
        >
          Interested in collaboration, youth projects,
          design or technology? Feel free to reach out.
        </motion.p>


        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}

          whileInView={{
            opacity: 1,
            y: 0,
          }}

          transition={{
            duration: 0.6,
            delay: 0.2,
          }}

          viewport={{
            once: true,
          }}

          className="
            flex
            flex-wrap
            gap-4
          "
        >

          <a
            href="mailto:dositejjovanovic@gmail.com"
            className="
              flex
              items-center
              gap-3
              px-6
              py-3
              rounded-full
              bg-white
              text-black
              font-medium
              hover:scale-105
              transition
            "
          >
            <Mail size={18} />
            Email
          </a>


          <a
            href="https://www.linkedin.com/in/dositej-jovanović-b91b3235a/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-3
              px-6
              py-3
              rounded-full
              border
              border-zinc-700
              text-white
              hover:bg-white
              hover:text-black
              transition
            "
          >
            <FaLinkedin size={18} />
            LinkedIn
          </a>


          <a
            href="https://www.instagram.com/_dositej/"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-3
              px-6
              py-3
              rounded-full
              border
              border-zinc-700
              text-white
              hover:bg-white
              hover:text-black
              transition
            "
          >
            <FaInstagram size={18} />
            Instagram
          </a>


        </motion.div>

      </div>

    </section>
  );
}