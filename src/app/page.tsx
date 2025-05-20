"use client"

import { useEffect, useState, lazy } from "react"
import Navbar from "@/components/navbar"
import ParticlesBackground from "@/components/particles"
import LoadingScreen from "@/components/LoadingScreen"

const Front = lazy(() => import("@/components/front"))
const StarWarsText = lazy(() => import("@/components/starwarstext"))
const Hero = lazy(() => import("@/components/hero"))
const Education = lazy(() => import("@/components/education"))
const Skills = lazy(() => import("@/components/skills"))
const RippleExperience = lazy(() => import("@/components/experienceback"))
const Experience = lazy(() => import("@/components/experience"))
const ProjectsBack = lazy(() => import("@/components/projectsback"))
const Projects = lazy(() => import("@/components/projects"))
const Contact = lazy(() => import("@/components/contact"))
const Socials = lazy(() => import("@/components/socials"))

export default function Page() {
  const [loading, setLoading] = useState(true)

  // Minimum time loading screen should be visible (e.g. 1.5s)
  useEffect(() => {
    const start = performance.now()

    const handleFullLoad = () => {
      const elapsed = performance.now() - start
      const delay = Math.max(0, 1500 - elapsed) // ensures at least 1500ms loading
      setTimeout(() => {
        console.log("✅ Done loading + waiting")
        setLoading(false)
      }, delay)
    }

    if (document.readyState === "complete") {
      handleFullLoad()
    } else {
      window.addEventListener("load", handleFullLoad)
      return () => window.removeEventListener("load", handleFullLoad)
    }
  }, [])

  return (
    <>
      {loading && <LoadingScreen />}
      
      <main className={`relative flex min-h-screen flex-col transition-opacity duration-700 ${loading ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
        <ParticlesBackground />
        <Navbar />
        <Front />
        <StarWarsText />
        <div className="bg-gradient-to-b from-[#183c1e] via-black to-[#38c0e0]">
          <div className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
            <Hero />
            <Education />
            <Skills />
          </div>
        </div>
        <RippleExperience />
        <div style={{ background: "linear-gradient(to bottom,rgb(0, 208, 255) 0%,rgb(64, 54, 76) 10%,#000 80%, #000 100%)" }}>
          <div className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
            <Experience />
          </div>
        </div>
        <ProjectsBack />
        <div className="bg-gradient-to-b from-[#1e293b] to-black">
          <div className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
            <Projects />
          </div>
        </div>
        <div className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
          <Contact />
        </div>
        <Socials />
      </main>
    </>
  )
}
