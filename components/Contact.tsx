"use client";

import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FaLinkedin, FaInstagram } from "react-icons/fa";
import type { Locale } from "@/data/locale";


export default function Contact({ locale, content }: { locale: Locale; content?: { title: string; description: string } }) {
  const fallback = locale === "sr" ? { title: "Kontakt", description: "Otvoren sam za smislene razgovore, nove saradnje i projekte koji stvaraju stvarnu vrednost." } : { title: "Contact", description: "Interested in education, youth participation, international cooperation or visual communication? Let’s connect." };
  const values = content ?? fallback;

  return (

    <section

      id="contact"

      className="
        py-20
        px-5
        sm:px-8
        md:py-28
        bg-background
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
            opacity:0,
            y:30,
          }}

          whileInView={{
            opacity:1,
            y:0,
          }}

          transition={{
            duration:.6,
          }}

          viewport={{
            once:true,
          }}

          className="
            text-4xl
            md:text-5xl
            font-bold
            mb-8
            text-foreground
          "

        >

          {values.title}

        </motion.h2>




        <motion.p

          initial={{
            opacity:0,
            y:20,
          }}

          whileInView={{
            opacity:1,
            y:0,
          }}

          transition={{
            duration:.6,
            delay:.1,
          }}

          viewport={{
            once:true,
          }}

          className="
            text-lg
            md:text-xl
            text-muted
            max-w-2xl
            leading-relaxed
            mb-10
          "

        >

          {values.description}

        </motion.p>




        <motion.div

          initial={{
            opacity:0,
            y:20,
          }}

          whileInView={{
            opacity:1,
            y:0,
          }}

          transition={{
            duration:.6,
            delay:.2,
          }}

          viewport={{
            once:true,
          }}

          className="
            flex
            flex-wrap
            gap-4
          "

        >



          {/* Email */}


          <motion.a

            whileHover={{
              y:-4,
            }}

            transition={{
              type:"spring",
              stiffness:300,
              damping:20,
            }}

            href="mailto:dositejjovanovic@gmail.com"
            aria-label="Email Dositej Jovanović"

            className="
              relative
              overflow-hidden

              flex
              items-center
              gap-3

              px-5
              py-3

              rounded-full

              bg-foreground
              text-background

              font-medium

              shadow-lg

              hover:shadow-xl

              transition

            "

          >

            <Mail size={18}/>

            Email


          </motion.a>






          {/* LinkedIn */}


          <motion.a

            whileHover={{
              y:-4,
            }}

            transition={{
              type:"spring",
              stiffness:300,
              damping:20,
            }}

            href="https://www.linkedin.com/in/dositej-jovanović-b91b3235a/"

            target="_blank"

            rel="noopener noreferrer"


            className="
              flex
              items-center
              gap-3

              px-5
              py-3

              rounded-full

              border
              border-border

              bg-card/60

              backdrop-blur-xl

              text-foreground

              hover:border-glow

              hover:shadow-lg

              transition

            "

          >

            <FaLinkedin size={18}/>

            LinkedIn


          </motion.a>







          {/* Instagram */}


          <motion.a

            whileHover={{
              y:-4,
            }}

            transition={{
              type:"spring",
              stiffness:300,
              damping:20,
            }}


            href="https://www.instagram.com/_dositej/"


            target="_blank"

            rel="noopener noreferrer"


            className="
              flex
              items-center
              gap-3

              px-5
              py-3

              rounded-full

              border
              border-border

              bg-card/60

              backdrop-blur-xl

              text-foreground

              hover:border-glow

              hover:shadow-lg

              transition

            "

          >

            <FaInstagram size={18}/>

            Instagram


          </motion.a>




        </motion.div>



      </div>


    </section>

  );

}
