"use client"

import Link from "next/link"
import Image from "next/image"
import { projects } from "@/constants/projects"
import { motion } from "framer-motion"
import { useState } from "react"

const MotionDiv = motion.div

export default function Projects() {
  return (
    <section id="projects" className="w-full min-h-screen flex flex-col items-center justify-center py-32">
      <div className="w-full max-w-[1800px] grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-10 px-6 sm:px-8 lg:px-12">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} priority={index < 2} />
        ))}
      </div>
    </section>
  )
}

function ProjectCard({ project, priority }: { project: any; priority: boolean }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div className="flex flex-col">
      <Link href={project.link} target="_blank" passHref legacyBehavior>
        <a className="block w-full h-full">
          <div
            className={`relative w-full aspect-[1.7/1] overflow-hidden rounded-2xl cursor-pointer transition-shadow duration-300 ${
              flipped ? "shadow-[0_0_30px_rgba(255,255,255,0.5)]" : ""
            }`}
            style={{ perspective: 1200 }}
            onMouseEnter={() => setFlipped(true)}
            onMouseLeave={() => setFlipped(false)}
          >
            <MotionDiv
              animate={{ rotateY: flipped ? 180 : 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="relative w-full h-full"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front Side */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{ backfaceVisibility: "hidden" }}
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  priority={priority}
                />
              </div>

              {/* Back Side with frisbee.jpg */}
              <div
                className="absolute inset-0 w-full h-full"
                style={{
                  backfaceVisibility: "hidden",
                  transform: "rotateY(180deg)",
                }}
              >
                <Image
                  src="/frisbee.png"
                  alt="Frisbee"
                  fill
                  className="object-cover"
                />
              </div>
            </MotionDiv>
          </div>
        </a>
      </Link>

      <div className="pt-4 px-1">
        <h2 className="text-white text-[15px] sm:text-[16px] font-medium font-sans tracking-tight leading-snug">
          {project.title} <span className="text-gray-400">— {project.year}</span>
        </h2>
        <p className="text-gray-400 text-[13px] sm:text-[14px] mt-[1px] font-sans tracking-tight">
          {project.description}
        </p>
      </div>
    </div>
  )
}
