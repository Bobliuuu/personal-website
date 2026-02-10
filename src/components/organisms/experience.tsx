"use client"

import Image from "next/image"
import { experiences } from "@/constants/experience"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export default function Experience() {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set())

  const toggleExpanded = (index: number) => {
    setExpandedItems((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(index)) {
        newSet.delete(index)
      } else {
        newSet.add(index)
      }
      return newSet
    })
  }

  const formatDate = (date: string[] | string) => {
    if (Array.isArray(date)) {
      return `${date[0]} - ${date[1]}`
    }
    return date
  }

  return (
    <div className="w-full px-6 sm:px-12 lg:px-24 pb-10 pt-[200px]">
      <div className="flex flex-col gap-4">
        {experiences.map((experience, index) => {
          const isExpanded = expandedItems.has(index)
          const description =
            experience.description ||
            (experience.points.length > 0 ? experience.points[0] : "")
          const detailPoints = experience.description
            ? experience.points
            : experience.points.slice(1)
          const hasDetails =
            detailPoints.length > 0 ||
            (experience.tags && experience.tags.length > 0) ||
            (experience.images && experience.images.length > 0)

          return (
            <div
              key={index}
              className="group rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <button
                type="button"
                onClick={() => hasDetails && toggleExpanded(index)}
                className={`w-full text-left ${!hasDetails ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6 p-6 md:p-8">
                  {/* Left: Date + Location */}
                  <div className="flex-shrink-0 md:w-[220px] lg:w-[260px]">
                    <p className="text-lg font-medium text-blue-200/90">
                      {formatDate(experience.date)}
                    </p>
                    <p className="mt-1 text-base text-gray-400">
                      {experience.location}
                    </p>
                  </div>

                  {/* Right: Logo + Company + Role + Description */}
                  <div className="flex flex-1 min-w-0 items-start gap-5 md:ml-10 lg:ml-14">
                    <div className="flex-shrink-0">
                      <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/20">
                        <Image
                          src={
                            experience.logo || "/uwaterloo_logo_black.png"
                          }
                          alt={experience.company}
                          width={40}
                          height={40}
                          className="object-contain p-1.5"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-2xl font-bold tracking-tight text-white">
                          {experience.company}
                        </h3>
                        {hasDetails && (
                          <ChevronDownIcon
                            className={`h-6 w-6 flex-shrink-0 text-gray-400 transition-transform duration-300 ease-out ${
                              isExpanded ? "rotate-180" : ""
                            }`}
                          />
                        )}
                      </div>
                      <p className="mt-1.5 text-lg text-gray-300">
                        {experience.title}
                      </p>
                      {description && (
                        <p className="mt-2 text-base leading-relaxed text-gray-400">
                          {description}
                        </p>
                      )}
                      {experience.tags && experience.tags.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {experience.tags.map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-gray-300"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Collapsible panel with smooth height animation */}
              <div
                className="grid transition-[grid-template-rows] duration-300 ease-out"
                style={{
                  gridTemplateRows: isExpanded ? "1fr" : "0fr",
                }}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-white/10 bg-white/[0.02] px-6 pb-6 pt-4 md:px-8 md:pb-8 md:pt-5">
                    <div className="flex flex-col gap-6 pl-0 md:pl-[calc(220px+2.5rem)] lg:pl-[calc(260px+3.5rem)]">
                      {detailPoints.length > 0 && (
                        <ul className="list-disc list-inside space-y-3 text-base leading-relaxed text-gray-400 marker:text-cyan-400/80">
                          {detailPoints.map((point, pointIndex) => (
                            <li key={pointIndex}>
                              {point}
                            </li>
                          ))}
                        </ul>
                      )}
                      {experience.images &&
                        experience.images.length > 0 && (
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            {experience.images.map(
                              (img: string, i: number) => (
                                <Image
                                  key={i}
                                  src={img}
                                  alt={`${experience.company} image`}
                                  width={600}
                                  height={350}
                                  className="rounded-lg border border-white/20 object-cover"
                                />
                              )
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
