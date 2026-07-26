"use client";

import { motion } from "framer-motion";

const experiences = [
  {
    year: "2026",
    title: "OBESSU General Assembly",
    description:
      "Represented the Union of High School Students of Serbia at the OBESSU General Assembly, participating in European youth cooperation and student representation.",
  },

  {
    year: "2025 - Present",
    title: "Union of High School Students of Serbia (UNSS)",
    description:
      "Working on student rights, youth participation and representing the interests of high school students at national and international level.",
  },

  {
    year: "2025 - Present",
    title: "Erasmus+ International Projects",
    description:
      "Participating in European educational mobility projects focused on cooperation, innovation and intercultural exchange.",
  },

  {
    year: "2024 - Present",
    title: "Mathematical Grammar School Media Projects",
    description:
      "Creating media content through MG TV, documentaries, video production and creative school initiatives.",
  },
];


export default function Experience() {
  return (
    <section
      id="experience"
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
            mb-16
          "
        >
          Experience
        </motion.h2>


        <div
          className="
            relative
            border-l
            border-zinc-800
            ml-4
          "
        >

          {experiences.map((item, index) => (

            <motion.div
              key={item.title}

              initial={{
                opacity: 0,
                x: -30,
              }}

              whileInView={{
                opacity: 1,
                x: 0,
              }}

              transition={{
                duration: 0.5,
                delay: index * 0.1,
              }}

              viewport={{
                once: true,
              }}

              className="
                mb-12
                ml-8
                relative
              "
            >

              <div
                className="
                  absolute
                  -left-[45px]
                  top-2
                  w-4
                  h-4
                  rounded-full
                  bg-white
                "
              />


              <p
                className="
                  text-sm
                  text-zinc-500
                  mb-2
                "
              >
                {item.year}
              </p>


              <h3
                className="
                  text-2xl
                  font-semibold
                  mb-3
                "
              >
                {item.title}
              </h3>


              <p
                className="
                  text-zinc-400
                  leading-relaxed
                  max-w-3xl
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