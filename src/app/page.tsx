"use client"

import { useEffect, useState, lazy, Suspense } from "react"
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

// Fallback component for lazy loading
const SectionLoader = () => <div className="w-full h-20" />

export default function Page() {
  const [loading, setLoading] = useState(true)

  // Minimum time loading screen should be visible (e.g. 1.5s)
  useEffect(() => {
    const start = performance.now()

    const handleFullLoad = () => {
      const elapsed = performance.now() - start
      const delay = Math.max(0, 1500 - elapsed) // ensures at least 1500ms loading
      setTimeout(() => {
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
        
        <Suspense fallback={<SectionLoader />}>
          <Front />
        </Suspense>
        
        <Suspense fallback={<SectionLoader />}>
          <StarWarsText />
        </Suspense>
        
        <div id="hero-education-skills" className="bg-gradient-to-b from-[#183c1e] via-[#0f2a14] to-[#3bf1f7]">
          <div className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
            <Suspense fallback={<SectionLoader />}>
              <Hero />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Education />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Skills />
            </Suspense>
          </div>
        </div>
        
        <Suspense fallback={<SectionLoader />}>
          <RippleExperience />
        </Suspense>
        
        <div id="experience-section" className="bg-gradient-to-b from-black via-[#002b3a] to-black">
          <div className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
            <Suspense fallback={<SectionLoader />}>
              <Experience />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Achievements />
            </Suspense>
          </div>
        </div>
        
        <Suspense fallback={<SectionLoader />}>
          <ProjectsBack />
        </Suspense>
        
        <div id="projects-contributions-wrapper" className="bg-gradient-to-b from-[#0d1f2d] to-black">
          <div className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
            <Suspense fallback={<SectionLoader />}>
              <Projects />
            </Suspense>
            <Suspense fallback={<SectionLoader />}>
              <Contributions />
            </Suspense>
          </div>
        </div>
        
        <div id="contact-wrapper" className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
          <Suspense fallback={<SectionLoader />}>
            <Contact />
          </Suspense>
        </div>
        
        <Suspense fallback={<SectionLoader />}>
          <Socials />
        </Suspense>
      </main>
    </>
  )
}
