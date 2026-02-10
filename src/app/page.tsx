"use client"

import { useEffect, useState, lazy } from "react"
import Navbar from "@/components/molecules/navbar"
import ParticlesBackground from "@/components/atoms/particles"
import LoadingScreen from "@/components/atoms/LoadingScreen"

const Front = lazy(() => import("@/components/organisms/front"))
const StarWarsText = lazy(() => import("@/components/organisms/starwarstext"))
const Hero = lazy(() => import("@/components/organisms/hero"))
const Education = lazy(() => import("@/components/organisms/education"))
const Skills = lazy(() => import("@/components/organisms/skills"))
const RippleExperience = lazy(() => import("@/components/atoms/experienceback"))
const Experience = lazy(() => import("@/components/organisms/experience"))
const Achievements = lazy(() => import("@/components/organisms/achievements"))
const ProjectsBack = lazy(() => import("@/components/atoms/projectsback"))
const Projects = lazy(() => import("@/components/organisms/projects"))
const Contributions = lazy(() => import("@/components/organisms/contributions"))
const Contact = lazy(() => import("@/components/organisms/contact"))
const Socials = lazy(() => import("@/components/molecules/socials"))

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
        <div className="bg-gradient-to-b from-[#183c1e] via-[#0f2a14] to-[#3bf1f7]">
          <div className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
            <Hero />
            <Education />
            <Skills />
          </div>
        </div>
        <RippleExperience />
        <div className="bg-gradient-to-b from-black via-[#002b3a] to-black">
          <div className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
            <Experience />
            <Achievements />
          </div>
        </div>
        <ProjectsBack />
        <div className="bg-gradient-to-b from-[#0d1f2d] to-black">
          <div className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
            <Projects />
            <Contributions />
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
