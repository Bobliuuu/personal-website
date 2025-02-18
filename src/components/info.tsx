import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function Info() {
    const skills = [
      // Frontend
      ["React", "Next.js", "Remix", "Tanstack", "SvelteKit", "Typescript", "Redux", "Zustand", "Zod"],
    ];
  
    return (
      <section className="max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24 pt-0">
        {/* Education Section */}
        <div>
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-medium mb-8">
            Education
          </h2>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image
                src="/uwaterloo_logo_black.png"
                alt="University of Waterloo logo"
                fill
                className="object-contain"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-baseline">
                <h3 className="text-xl font-medium">University of Waterloo</h3>
                <span className="text-gray-400">2022 - 2027</span>
              </div>
              <p className="text-gray-300">
                Bachelor's Degree of Math (BMath) in Computer Science, Combinatorics and Optimization Joint
              </p>
            </div>
          </div>
        </div>
  
        {/* Skills Section */}
        <div>
          <h2 className="text-3xl sm:text-3xl lg:text-4xl font-medium mb-8 pt-10">
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.flat().map((skill, index) => (
              <Button
                key={index}
                variant="secondary"
                className="bg-gray-800/40 hover:bg-gray-800/60 text-gray-200"
              >
                {skill}
              </Button>
            ))}
          </div>
        </div>
      </section>
    );
  }
  