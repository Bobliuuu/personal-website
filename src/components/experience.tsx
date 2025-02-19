"use client"

import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component"
import "react-vertical-timeline-component/style.min.css"
import "@/styles/timeline.css"
import Image from "next/image"
import { experiences } from "@/constants/experience"
import { Button } from "@/components/ui/button"

export default function Experience() {
  return (
    <div className="max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24 pb-10">
      <h2 id="experiences" className="text-3xl sm:text-3xl lg:text-4xl font-medium mb-8 pt-10">
        Experiences
      </h2>
      <VerticalTimeline 
        lineColor="#FFFFFF"
        className="custom-timeline"
        layout="1-column-right"
      >
        {experiences.map((experience, index) => (
          <VerticalTimelineElement
            key={index}
            contentStyle={{ background: "#000000", color: "#fff", boxShadow: "none", padding: "0 0 0 0" }}
            contentArrowStyle={{ display: "none" }}
            date={experience.date}
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
            <div className="text-white">
              <h3 className="text-2xl font-bold">{experience.title}</h3>
              <h4 className="text-gray-400">{experience.company}</h4>
              <Button
                variant="secondary"
                size="sm"
                className="mt-2 bg-gray-800/40 hover:bg-gray-800/60 text-gray-200"
              >
                {experience.location}
              </Button>
              <ul className="mt-4 space-y-2 text-gray-300">
                {experience.points.map((point, pointIndex) => (
                  <li key={pointIndex}>{point}</li>
                ))}
              </ul>
              {experience.tags && (
                <div className="flex gap-2 mt-4 flex-wrap">
                  {experience.tags.map((tag, tagIndex) => (
                    <Button
                      key={tagIndex}
                      variant="secondary"
                      size="sm"
                      className="bg-gray-800/40 hover:bg-gray-800/60 text-gray-200"
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </VerticalTimelineElement>
        ))}
      </VerticalTimeline>
    </div>
  )
}

