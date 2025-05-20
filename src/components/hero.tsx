"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useRef, useEffect, useState } from "react"

export default function Hero() {
  const frisbeeRef = useRef<HTMLImageElement>(null)
  const heroRef = useRef<HTMLDivElement>(null)
  const [frisbeeActive, setFrisbeeActive] = useState(false)

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFrisbeeActive(true)
          setTimeout(() => setFrisbeeActive(false), 4000) // Match new animation duration
        }
      },
      { threshold: 0.5 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="hero" ref={heroRef} className="max-w-[1800px] mx-auto pt-12 sm:pt-16 pb-10 px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 mt-12">
      {/* Left: Image */}
      <div className="flex-shrink-0 w-full md:w-[340px] lg:w-[400px] flex justify-center relative">
        <img
          src="/jerry.png"
          alt="Jerry Zhu portrait"
          className="rounded-3xl shadow-xl object-cover w-full h-[340px] md:h-[400px]"
        />
        {/* Frisbee scroll-triggered animation */}
        <img
          ref={frisbeeRef}
          src="/frisbee.png"
          alt="Frisbee"
          className={`absolute w-16 h-16 ${frisbeeActive ? "frisbee-arc" : "opacity-0"}`}
          style={{ zIndex: 2, top: 0, left: 0 }}
        />
      </div>
      {/* Right: Text */}
      <div className="flex-1 text-center md:text-left mt-24">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
          About <span className="text-[#b6aaff] italic">me</span>
        </h1>
        <p className="text-lg text-gray-300 mb-4">
          Hi! My name is Jerry. I am a <span className="font-semibold italic">Software Engineer</span> passionate about <span className="font-semibold">AI/ML</span>, <span className="font-semibold">DevOps</span>, and <span className="font-semibold">full-stack software development</span>.<br/>
          I organize and attend <span className="font-semibold">clubs</span>, <span className="font-semibold">hackathons</span>, and <span className="font-semibold">conferences</span>.<br/>
          I play <span className="font-semibold">varsity ultimate</span>, perform <span className="font-semibold">acapella</span> and <span className="font-semibold">dance</span>, and love <span className="font-semibold">gardening</span>!
        </p>
        <Button
          variant="ghost"
          className="border border-white text-gray-300 hover:text-white hover:bg-gray-800/40 px-4 py-5 mt-2"
          asChild
        >
          <Link href="https://drive.google.com/file/d/1kKW3u3xrT2LfS6C6oqsKSVjqPnZ1deF7/view?usp=sharing" target="_blank" >
            <span className="text-lg bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
              Resume
            </span>
          </Link>
        </Button>
      </div>
    </section>
  )
}

