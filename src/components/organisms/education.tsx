"use client"

import Image from "next/image"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import { education } from "@/constants/education"

export default function Education() {
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

  return (
    <section className="max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24 pt-0 mt-8">
      <div>
        <h2 className="text-4xl sm:text-4xl lg:text-5xl font-medium mb-8">
          <span className="bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
            Education
          </span>
        </h2>
        <div className="flex flex-col gap-6">
          {education.map((edu, index) => {
            const isExpanded = expandedItems.has(index)
            const hasDetails =
              (edu.activities && edu.activities.length > 0) ||
              (edu.scholarships && edu.scholarships.length > 0)

            return (
              <div
                key={index}
                className="rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20 hover:bg-white/[0.06]"
              >
                <button
                  type="button"
                  onClick={() => hasDetails && toggleExpanded(index)}
                  className={`w-full text-left ${!hasDetails ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div className="flex items-start gap-4 p-6">
                    <div className="relative w-14 h-14 flex-shrink-0">
                      <Image
                        src={edu.logo}
                        alt={`${edu.institution} logo`}
                        fill
                        className="object-contain rounded-lg"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl font-semibold text-white">
                              {edu.institution}
                            </h3>
                            {hasDetails && (
                              <ChevronDownIcon
                                className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ease-out ${
                                  isExpanded ? "rotate-180" : ""
                                }`}
                              />
                            )}
                          </div>
                          <p className="text-gray-300 mt-1">{edu.degree}</p>
                          {edu.grade && (
                            <p className="text-gray-400 text-sm mt-1">
                              Grade: {edu.grade}
                            </p>
                          )}
                        </div>
                        <span className="text-gray-400 text-sm flex-shrink-0">
                          {edu.dates}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                {/* Collapsible details */}
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{
                    gridTemplateRows: isExpanded ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 bg-white/[0.02] px-6 pb-6 pt-4">
                      {edu.scholarships && edu.scholarships.length > 0 && (
                        <div className="mb-4">
                          <h4 className="text-cyan-400 font-semibold mb-2">
                            Entrance Scholarships:
                          </h4>
                          <ul className="space-y-1 text-gray-400 text-sm">
                            {edu.scholarships.map((scholarship, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-cyan-400/80 mt-1">•</span>
                                <span>{scholarship}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {edu.activities && edu.activities.length > 0 && (
                        <div>
                          <h4 className="text-cyan-400 font-semibold mb-2">
                            Activities and Societies:
                          </h4>
                          <div className="flex flex-wrap gap-2">
                            {edu.activities.map((activity, i) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-white/5 border border-white/10 text-gray-300 text-xs rounded"
                              >
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
} 