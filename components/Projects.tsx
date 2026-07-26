"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Union of High School Students of Serbia",
    description:
      "Youth representation project focused on student rights, participation and improving the position of high school students.",
    tags: [
      "Leadership",
      "Youth Policy",
      "Advocacy",
    ],
  },

  {
    title: "MG TV & Film Festival",
    description:
      "Media and creative projects including video production, documentaries and organizing school cultural events.",
    tags: [
      "Video Production",
      "Media",
      "Design",
    ],
  },

  {
    title: "Erasmus+ International Projects",
    description:
      "Participation in European mobility projects focused on education, cooperation and intercultural exchange.",
    tags: [
      "Erasmus+",
      "International",
      "Education",
    ],
  },

  {
    title: "Graphic Design Portfolio",
    description:
      "Creation of visual identities, logos and digital designs for organizations and projects.",
    tags: [
      "Branding",
      "UI Design",
      "Visual Identity",
    ],
  },
];


export default function Projects() {
  return (
    <section
      id="projects"
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
          Projects
        </motion.h2>


        <div
          className="
            grid
            md:grid-cols-2
            gap-8
          "
        >

          {projects.map((project, index) => (

            <motion.div

              key={project.title}

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
                {project.title}
              </h3>


              <p
                className="
                  text-zinc-400
                  leading-relaxed
                  mb-6
                "
              >
                {project.description}
              </p>


              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >

                {project.tags.map((tag) => (

                  <span
                    key={tag}
                    className="
                      px-3
                      py-1
                      rounded-full
                      bg-zinc-900
                      text-sm
                      text-zinc-400
                    "
                  >
                    {tag}
                  </span>

                ))}

              </div>


            </motion.div>

          ))}

        </div>

      </div>

    </section>
  );
}