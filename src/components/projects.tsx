import Link from "next/link"
import Image from "next/image"
import { projects } from "@/constants/projects"
import { Github } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Projects() {
  return (
    <div className="flex items-start justify-center gap-4 max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24 pt-0">
      {projects.map((project, index) => (
        <Link 
          key={index}
          href={project.link}
          target="_blank" 
          className="relative aspect-[1.2/1] w-[500px] overflow-hidden rounded-3xl group"
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute top-4 left-4 z-10 flex gap-2 flex-wrap max-w-[70%]">
            {project.tags.map((tag, tagIndex) => (
              <Button
                key={tagIndex}
                variant="secondary"
                size="sm"
                className="bg-gray-800/40 hover:bg-gray-800/60 text-gray-200"
              >
                {tag}
              </Button>
            ))}
          </div>
          <div className="absolute bottom-8 left-8 z-10">
            <h1 className="text-4xl font-semibold text-zinc-400">{project.title}</h1>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          <div className="absolute right-4 top-4 z-10">
            <Button variant="ghost" size="icon">
              <Github className="h-6 w-6" />
              <span className="sr-only">{project.title} GitHub</span>
            </Button>
          </div>
        </Link>
      ))}
    </div>
  )
}

