"use client"

import Link from "next/link"
import Image from "next/image"
import { projects } from "@/constants/projects"
import { Project } from "@/types/projects"
import { motion } from "framer-motion"
import { useState } from "react"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

const MotionDiv = motion.div

export default function Projects() {
  return (
    <section id="projects" className="w-full flex flex-col items-center justify-center py-24">
      <div className="w-full max-w-[1800px] px-6 sm:px-8 lg:px-12">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} priority={index < 3} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ProjectCard({ project, priority }: { project: Project; priority: boolean }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className="relative w-full aspect-[16/11] cursor-pointer"
      style={{ perspective: "1500px" }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <MotionDiv
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="relative w-full h-full rounded-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Front Side - Image with Title Overlay */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-white/10"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="relative w-full h-full">
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover opacity-30"
              priority={priority}
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.src = "/frisbee.png"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <h3 className="text-2xl font-bold text-white">{project.title}</h3>
                {project.winner && (
                  <span className="px-2 py-0.5 text-xs font-medium bg-yellow-500/20 text-yellow-300 rounded-full border border-yellow-500/30">
                    Winner
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400">{project.year}</p>
            </div>
          </div>
        </div>

        {/* Back Side - Description and Tags */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black border border-white/20 backdrop-blur-sm"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div className="relative w-full h-full p-8 flex flex-col">
            <div className="flex-1 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-2xl font-bold text-white pr-2">{project.title}</h3>
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors flex-shrink-0"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ArrowTopRightOnSquareIcon className="w-6 h-6" />
                </Link>
              </div>
              
              <p className="text-base text-gray-300 leading-relaxed mb-5">
                {project.description}
              </p>

              {project.teammates && project.teammates.length > 0 && (
                <div className="mb-5">
                  <p className="text-sm text-gray-400 mb-2 font-medium">Team:</p>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {project.teammates.join(", ")}
                  </p>
                </div>
              )}

              <div className="flex flex-wrap gap-2 mb-4 mt-auto">
                {project.tags.slice(0, 4).map((tag: string, index: number) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 text-sm font-medium bg-cyan-500/10 text-cyan-300 rounded-lg border border-cyan-500/20 hover:bg-cyan-500/20 transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {((project.likes && project.likes > 0) || (project.comments && project.comments > 0)) && (
                <div className="flex items-center gap-4 text-sm text-gray-400 pt-3 border-t border-white/10">
                  {project.likes && project.likes > 0 && <span>❤️ {project.likes}</span>}
                  {project.comments && project.comments > 0 && <span>💬 {project.comments}</span>}
                </div>
              )}
            </div>
          </div>
        </div>
      </MotionDiv>
    </div>
  )
}
