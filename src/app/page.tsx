import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Education from "@/components/education"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import ParticlesBackground from "@/components/particles"
import Front from "@/components/front"
import StarWarsText from "@/components/starwarstext"
import Skills from "@/components/skills"
import RippleExperience from "@/components/experienceback"
import ProjectsBack from "@/components/projectsback"

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col">
      <ParticlesBackground />
      <Navbar />
      <Front/>
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
    </main>
  );
}


