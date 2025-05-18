"use client"

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import "@/styles/timeline.css"
import Image from "next/image"
import { experiences } from "@/constants/experience"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { useRef, useLayoutEffect, useState, useEffect } from "react"

export default function Experience() {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [lineHeight, setLineHeight] = useState(0)
  const [progress, setProgress] = useState(0)

  useLayoutEffect(() => {
    if (timelineRef.current) {
      setLineHeight(timelineRef.current.offsetHeight)
    }
  }, [experiences.length])

  useEffect(() => {
    function handleScroll() {
      if (!timelineRef.current) return
      const rect = timelineRef.current.getBoundingClientRect()
      const windowHeight = window.innerHeight
      const totalScrollable = rect.height - windowHeight
      if (rect.top > 0) {
        setProgress(0)
      } else if (Math.abs(rect.top) >= totalScrollable) {
        setProgress(1)
      } else {
        setProgress(Math.min(1, Math.max(0, Math.abs(rect.top) / totalScrollable)))
      }
    }
    window.addEventListener("scroll", handleScroll)
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="w-full px-6 sm:px-12 lg:px-24 pb-10 relative pt-[200px]">

      <div ref={timelineRef} className="relative">
        <div
          className="absolute left-[44px] top-0 w-[3px] rounded-full z-10"
          style={{ height: lineHeight, pointerEvents: 'none' }}
        />
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: progress * lineHeight }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="absolute left-[44px] top-0 w-[3px] bg-gradient-to-b from-blue-400 via-purple-400 to-blue-900 rounded-full z-20"
          style={{ pointerEvents: 'none' }}
        />

        <VerticalTimeline
          lineColor="transparent"
          className="custom-timeline"
          layout="1-column-right"
        >
          {experiences.map((experience, index) => (
            <VerticalTimelineElement
              key={index}
              contentStyle={{
                background: "transparent",
                color: "#fff",
                boxShadow: "none",
                padding: "0",
                borderRadius: "1rem",
              }}
              contentArrowStyle={{ display: "none" }}
              icon={
                <div className="flex items-center justify-center w-full h-full">
                  <Image
                    src={experience.logo || "/uwaterloo_logo_black.png"}
                    alt={experience.company}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
              }
              iconStyle={{ background: "#000000", color: "#fff", boxShadow: "none" }}
              position="right"
            >
              <div className="w-full flex flex-col md:flex-row gap-20 pl-2 sm:pl-6 md:pl-12 pr-6 py-3">
                {/* DATE COLUMN */}
                <div className="md:w-1/4 min-w-[150px] flex flex-col items-start justify-start">
                  <span className="text-lg font-serif italic text-blue-100">
                    {experience.date[0]}
                  </span>
                  {"-"}
                  <span className="text-lg font-serif italic text-blue-300 tracking-wide">
                    {experience.date[1]}
                  </span>
                </div>

                {/* MAIN CONTENT */}
                <div className="pl-[100px] flex-1 space-y-4">
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
            </VerticalTimelineElement>
          ))}
        </VerticalTimeline>
      </div>
    </div>
  )
}
