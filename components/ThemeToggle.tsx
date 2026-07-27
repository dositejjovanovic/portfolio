"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { motion } from "framer-motion";


export default function ThemeToggle() {


  const { theme, setTheme } = useTheme();


  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );




  if (!mounted) {
    return null;
  }



  const isDark = theme === "dark";



  return (

    <motion.button


      onClick={() =>
        setTheme(
          isDark
            ? "light"
            : "dark"
        )
      }



      whileHover={{
        y:-3,
        rotate:8,
      }}


      whileTap={{
        scale:.95,
      }}



      transition={{
        type:"spring",
        stiffness:300,
        damping:20,
      }}



      className={`
        flex
        items-center
        justify-center

        w-11
        h-11

        rounded-full

        backdrop-blur-xl

        border

        shadow-[0_8px_24px_var(--shadow)]

        transition-all
        duration-500


        bg-card/70
        border-border
        text-foreground
        hover:bg-card

      `}


    >


      <motion.div

        key={theme}

        initial={{
          rotate:-90,
          opacity:0,
          scale:.5,
        }}

        animate={{
          rotate:0,
          opacity:1,
          scale:1,
        }}

        transition={{
          duration:.4,
        }}

      >

        {
          isDark

          ?

          <Sun size={19}/>

          :

          <Moon size={19}/>

        }


      </motion.div>


    </motion.button>


  );

}
