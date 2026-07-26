"use client";

import { motion } from "framer-motion";

const skills = [
  {
    title: "Mathematics",
    description:
      "Strong analytical thinking, problem solving and mathematical reasoning.",
  },
  {
    title: "Physics",
    description:
      "Passionate about understanding how the world works through science.",
  },
  {
    title: "Design",
    description:
      "Graphic design, visual identity, branding and creative direction.",
  },
  {
    title: "Leadership",
    description:
      "Youth representation, project management and teamwork.",
  },
  {
    title: "Communication",
    description:
      "Public speaking, international cooperation and advocacy.",
  },
];


export default function Skills() {
  return (
    <section
      id="skills"
      className="
        py-24
        px-8
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
        Skills
      </motion.h2>


      <div
        className="
          grid
          md:grid-cols-3
          gap-6
        "
      >

        {skills.map((skill, index) => (

          <motion.div
            key={skill.title}

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
                text-2xl
                font-semibold
                mb-4
              "
            >
              {skill.title}
            </h3>


            <p
              className="
                text-zinc-400
                leading-relaxed
              "
            >
              {skill.description}
            </p>


          </motion.div>

        ))}

      </div>

    </section>
  );
}