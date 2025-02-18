import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import Info from "@/components/info"
import Experience from "@/components/experience"
import Projects from "@/components/projects"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import ParticlesBackground from "@/components/particles"

export default function Page() {
  return (
    <main className="relative flex min-h-screen flex-col bg-background">
      <ParticlesBackground />
      <div className="relative w-full max-w-screen-xl mx-auto px-12 sm:px-16 lg:px-24">
        <Navbar />
        <Hero />
        <Info />
        <Experience />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </main>
  )
}


