"use client";

import { motion } from "framer-motion";

const achievements = [
  {
    title: "Mathematical Grammar School",
    description:
      "Student at one of the most prestigious high schools in Serbia, focused on mathematics, physics and advanced sciences.",
  },

  {
    title: "Mathematics & Physics",
    description:
      "Strong interest in mathematical problem solving, physics and scientific thinking through competitions and projects.",
  },

  {
    title: "Science & Research Programs",
    description:
      "Participant in scientific programs including Petnica Research Center and various educational initiatives.",
  },

  {
    title: "International Experiences",
    description:
      "Participation in European youth programs, Erasmus+ mobilities and international cooperation projects.",
  },

  {
    title: "Academic Recognition",
    description:
      "Recipient of academic awards and recognitions for outstanding achievements and dedication.",
  },

  {
    title: "Competitions",
    description:
      "Experience in national and international competitions combining analytical thinking, creativity and teamwork.",
  },
];


export default function Achievements() {
  return (
    <section
      id="achievements"
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
            mb-12
          "
        >
          Education & Achievements
        </motion.h2>


        <div
          className="
            grid
            md:grid-cols-3
            gap-6
          "
        >

          {achievements.map((item, index) => (

            <motion.div
              key={item.title}

              initial={{
                opacity: 0,
                y: 40,
              }}

              whileInView={{
                opacity: 1,
                y: 0,
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}

              viewport={{
                once: true,
              }}

              className="
                rounded-3xl
                border
                border-zinc-800
                p-8
                bg-zinc-950
                hover:border-zinc-500
                transition
              "
            >

              <h3
                className="
                  text-xl
                  font-semibold
                  mb-4
                "
              >
                {item.title}
              </h3>


              <p
                className="
                  text-zinc-400
                  leading-relaxed
                "
              >
                {item.description}
              </p>


            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}