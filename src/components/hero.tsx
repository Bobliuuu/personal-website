"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Hero() {
  return (
    <section className="max-w-[1800px] mx-auto pt-12 sm:pt-16 pb-10 px-12 sm:px-16 lg:px-24">
      <h1 className="text-4xl sm:text-4xl lg:text-6xl font-medium leading-tight sm:leading-tight lg:leading-tight">
        I&apos;m{" "}
        <span className="text-muted-foreground bg-gradient-to-r from-gray-600 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
          Jerry Zhu
        </span>,{" "}
        <span className="text-muted-foreground bg-gradient-to-r from-gray-600 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
          Software Engineer
        </span>.
      </h1>
      <br />
      <p className="text-medium font-medium text-gray-300">
        I am passionate about <strong>AI/ML</strong>, <strong>DevOps</strong>, and <strong>full-stack software development</strong>. 
        I organize and attend <strong>clubs</strong>, <strong>hackathons</strong>, and <strong>conferences</strong>. 
        I play <strong>varsity ultimate</strong>, perform <strong>acapella</strong> and <strong>dance</strong>, and love <strong>gardening</strong>!
      </p>
      <h3 className="text-3xl font-medium text-gray-300 mt-4">
        <Button
          variant="ghost"
          className="border border-white text-gray-300 hover:text-white hover:bg-gray-800/40 px-4 py-5"
          asChild
        >
          <Link href="https://drive.google.com/file/d/1kKW3u3xrT2LfS6C6oqsKSVjqPnZ1deF7/view?usp=sharing" target="_blank" >
            <span className="text-lg bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
              Resume
            </span>
          </Link>
        </Button>
      </h3>
    </section>

    
  )
}

