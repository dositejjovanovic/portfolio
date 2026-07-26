"use client";

import { motion } from "framer-motion";
import { ArrowDown, Download } from "lucide-react";


export default function Hero() {

  return (

    <section className="
      relative
      min-h-screen
      flex
      items-center
      overflow-hidden
      px-8
    ">


      {/* Background glow */}

      <div className="
        absolute
        top-1/2
        left-1/2
        -translate-x-1/2
        -translate-y-1/2
        w-[600px]
        h-[600px]
        bg-white/10
        blur-[150px]
        rounded-full
      "/>



      <div className="
        max-w-7xl
        mx-auto
        w-full
        relative
        z-10
      ">


        <motion.p

          initial={{
            opacity:0,
            y:20
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:.6
          }}

          className="
            uppercase
            tracking-[0.4em]
            text-sm
            text-zinc-500
          "

        >

          Belgrade, Serbia

        </motion.p>



        <motion.h1

          initial={{
            opacity:0,
            y:40
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            duration:.8,
            delay:.2
          }}

          className="
            text-7xl
            md:text-9xl
            font-bold
            mt-8
            leading-[0.9]
          "

        >

          Dositej
          <br/>
          Jovanović

        </motion.h1>



        <motion.p

          initial={{
            opacity:0
          }}

          animate={{
            opacity:1
          }}

          transition={{
            delay:.8,
            duration:1
          }}

          className="
            mt-8
            max-w-xl
            text-xl
            text-zinc-400
            leading-relaxed
          "

        >

          Student, youth representative and designer
          passionate about education, technology
          and international cooperation.

        </motion.p>



        <motion.div

          initial={{
            opacity:0,
            y:20
          }}

          animate={{
            opacity:1,
            y:0
          }}

          transition={{
            delay:1
          }}

          className="
            flex
            gap-4
            mt-10
            flex-wrap
          "

        >


          <button className="
            group
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
          ">

            Download CV

            <Download
              size={18}
            />

          </button>



          <button className="
            px-6
            py-3
            rounded-full
            border
            border-zinc-700
            text-white
            hover:bg-white
            hover:text-black
            transition
          ">

            Contact

          </button>


        </motion.div>



      </div>




      {/* Scroll */}

      <motion.div

        animate={{
          y:[0,10,0]
        }}

        transition={{
          repeat:Infinity,
          duration:2
        }}

        className="
          absolute
          bottom-10
          left-1/2
          -translate-x-1/2
          text-zinc-500
        "

      >

        <ArrowDown />

      </motion.div>


    </section>

  );
}