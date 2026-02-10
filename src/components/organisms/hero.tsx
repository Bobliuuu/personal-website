"use client"

import { Button } from "@/components/atoms/ui/button"
import Link from "next/link"
import Image from "next/image"
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
          setTimeout(() => setFrisbeeActive(false), 4000)
        }
      },
      { threshold: 0.5 }
    )
    if (heroRef.current) observer.observe(heroRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section id="hero" ref={heroRef} className="relative max-w-[1800px] mx-auto pt-12 sm:pt-16 pb-10 px-4 sm:px-8 lg:px-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 lg:gap-16 mt-12 min-h-[70vh] md:min-h-0">
      {/* Frisbee animation - positioned relative to section */}
      <Image
        ref={frisbeeRef}
        src="/frisbee.png"
        alt="Frisbee"
        width={64}
        height={64}
        className={`absolute w-16 h-16 ${frisbeeActive ? "frisbee-arc" : "opacity-0"}`}
        style={{ zIndex: 50, top: 40, left: 0 }}
      />
      
      {/* Left: Text (takes most space) */}
      <div className="flex-1 text-center md:text-left min-w-0 order-2 md:order-1 mt-8 md:mt-0 flex flex-col justify-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
          About <span className="text-[#b6aaff] italic">me</span>
        </h1>
        <p className="text-base sm:text-lg text-gray-400 mb-6 font-medium">
          Software Engineer <span className="text-cyan-400">@StackAdapt</span> | BMATH Computer Science and C&O and Comp Math and Pure Math Joint <span className="text-cyan-400">@UWaterloo</span> | 30+ Clubs, 50+ Hackathons
        </p>
        <p className="text-lg sm:text-xl lg:text-2xl text-gray-300 leading-relaxed space-y-3 max-w-3xl">
          <span className="block">
            Hi! My name is Jerry. I am a <span className="font-semibold italic">Software Engineer</span> passionate about <span className="font-semibold">AI/ML</span>, <span className="font-semibold">DevOps</span>, and <span className="font-semibold">full-stack software development</span>.
          </span>
          <span className="block">
            I organize and attend <span className="font-semibold">clubs</span>, <span className="font-semibold">hackathons</span>, and <span className="font-semibold">conferences</span>.
          </span>
          <span className="block">
            I play <span className="font-semibold">varsity ultimate</span>, perform <span className="font-semibold">acapella</span> and <span className="font-semibold">dance</span>, and love <span className="font-semibold">gardening</span>!
          </span>
        </p>
        <div className="flex gap-4 mt-6">
          <Button
            variant="ghost"
            className="border border-white text-gray-300 hover:text-white hover:bg-gray-800/40 px-4 py-5"
            asChild
          >
            <Link href="https://blog.jerryzhu.org" target="_blank">
              <span className="text-lg bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
                Blog
              </span>
            </Link>
          </Button>
          <Button
            variant="ghost"
            className="border border-white text-gray-300 hover:text-white hover:bg-gray-800/40 px-4 py-5"
            asChild
          >
            <Link href="https://bobliuuu.substack.com/" target="_blank">
              <span className="text-lg bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
                Substack
              </span>
            </Link>
          </Button>
        </div>
      </div>
      {/* Right: Image (vertically centered) */}
      <div className="flex-shrink-0 w-full md:w-[320px] lg:w-[360px] flex items-center justify-center order-1 md:order-2">
        <Image
          src="/jerry-warriors-final.png"
          alt="Jerry Zhu portrait"
          width={360}
          height={360}
          className="w-full h-auto object-contain"
          loading="lazy"
          priority={false}
        />
      </div>
    </section>
  )
}

