"use client"

import Image from "next/image"
import { experiences } from "@/constants/experience"
import { Button } from "@/components/ui/button"
import { useRef, useState, useEffect } from "react"

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function handleScroll() {
      if (!timelineRef.current) return;
      const rect = timelineRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Progress: 0 when top at center, 1 when bottom at center
      const center = windowHeight / 2;
      const start = rect.top;
      const end = rect.bottom;
      const total = end - start;
      const progressLinear = (center - start) / total;
      setProgress(Math.min(1, Math.max(0, progressLinear)));
    }
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Calculate icon positions as a percentage of the timeline height
  const iconPositions = experiences.map((_, i) => {
    return (i + 0.5) / experiences.length; // center of each item
  });

  return (
    <div className="w-full px-6 sm:px-12 lg:px-24 pb-10 pt-[200px]">
      <div ref={timelineRef} className="flex flex-row gap-8 relative" style={{ minHeight: 400 }}>
        {/* Vertical Line + Icons */}
        <div className="relative flex flex-col items-center" style={{ width: 60, minWidth: 60 }}>
          {/* Sticky vertical line */}
          <div style={{ position: 'sticky', top: 0, height: '100vh', width: '3px', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {/* Black base line */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '3px', height: '100vh', background: '#111', borderRadius: '999px', zIndex: 1 }} />
            {/* Animated gradient line */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '3px',
                height: '50vh',
                background: 'linear-gradient(to bottom, #60a5fa, #a78bfa, #312e81)',
                borderRadius: '999px',
                zIndex: 2,
                transition: 'height 0.2s cubic-bezier(0.4,0,0.2,1)',
                pointerEvents: 'none',
                // Animate the height from 0 to 50vh as progress goes from 0 to 1
                height: `${progress * 100}vh`,
              }}
            />
          </div>
          {/* Icons absolutely positioned over the line */}
          {iconPositions.map((pos, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                top: `calc(${pos * 100}% - 25px)`, // 25px = half icon size
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 2,
              }}
              className="flex items-center justify-center w-[50px] h-[50px] rounded-full bg-black border-2 border-white"
            >
              <Image
                src={experiences[i].logo || "/uwaterloo_logo_black.png"}
                alt={experiences[i].company}
                width={40}
                height={40}
                className="rounded-full"
              />
            </div>
          ))}
        </div>
        {/* Timeline Content */}
        <div className="flex-1 flex flex-col gap-16">
          {experiences.map((experience, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-8 md:gap-20">
              {/* DATE COLUMN */}
              <div className="md:w-1/4 min-w-[150px] flex flex-col items-start justify-start mb-4 md:mb-0">
                <span className="text-lg font-serif italic text-blue-100">
                  {experience.date[0]}
                </span>
                {"-"}
                <span className="text-lg font-serif italic text-blue-300 tracking-wide">
                  {experience.date[1]}
                </span>
              </div>
              {/* MAIN CONTENT */}
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-2xl font-bold tracking-tight leading-tight text-white">
                    <span className="bg-gradient-to-r from-gray-300 via-white via-50% to-gray-300 bg-clip-text text-transparent">
                      {experience.company}
                    </span>
                    <br/>
                    <span className="text-gray-400 font-medium">{experience.title}</span>
                  </h3>
                  <div className="mt-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="border border-white bg-white/10 text-gray-100 hover:bg-white/20 mb-2"
                    >
                      {experience.location}
                    </Button>
                  </div>
                  <ul className="mt-2 space-y-2 text-sm text-gray-400">
                    {experience.points.map((point, pointIndex) => (
                      <li key={pointIndex}>{point}</li>
                    ))}
                  </ul>
                </div>
                {experience.tags && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {experience.tags.map((tag, tagIndex) => (
                      <Button
                        key={tagIndex}
                        variant="secondary"
                        size="sm"
                        className="bg-white/10 hover:bg-white/20 border border-white text-white text-xs"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                )}
                {experience.images && experience.images.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                    {experience.images.map((img: string, i: number) => (
                      <Image
                        key={i}
                        src={img}
                        alt={`${experience.company} image`}
                        width={600}
                        height={350}
                        className="rounded-xl border border-white/20 object-cover"
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
