"use client"

import { contributions } from "@/constants/contributions"
import { ChevronDownIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import { useState } from "react"
import Link from "next/link"

export default function Contributions() {
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
    <section className="w-full px-6 sm:px-12 lg:px-24 pb-10 pt-[100px]">
      <h2 className="text-4xl sm:text-4xl lg:text-5xl font-medium mb-8 animate-glow">
        <span className="bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
          Other Contributions
        </span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {contributions.map((contribution, index) => {
          const isExpanded = expandedItems.has(index)
          const hasDetails = contribution.points.length > 1 || (contribution.links && contribution.links.length > 0)

          return (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <button
                type="button"
                onClick={() => hasDetails && toggleExpanded(index)}
                className={`w-full text-left p-5 ${!hasDetails ? "cursor-default" : "cursor-pointer"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2">
                      <h3 className="text-lg font-semibold text-white leading-snug">
                        {contribution.organization}
                      </h3>
                      {hasDetails && (
                        <ChevronDownIcon
                          className={`h-5 w-5 flex-shrink-0 text-gray-400 transition-transform duration-300 ease-out ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      )}
                    </div>
                    <p className="text-cyan-400/90 text-sm font-medium mt-1">
                      {contribution.title}
                    </p>
                    <p className="text-gray-400 text-xs mt-1">{contribution.date}</p>
                    {contribution.points.length === 1 && !contribution.links && (
                      <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                        {contribution.points[0]}
                      </p>
                    )}
                  </div>
                </div>
              </button>

              {/* Collapsible details */}
              {hasDetails && (
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{
                    gridTemplateRows: isExpanded ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 bg-white/[0.02] px-5 pb-5 pt-4">
                      {contribution.points.length > 1 && (
                        <ul className="space-y-2 text-sm leading-relaxed text-gray-400 mb-3">
                          {contribution.points.map((point, pointIndex) => (
                            <li key={pointIndex} className="flex items-center gap-2">
                              <span className="text-cyan-400/80 flex-shrink-0">•</span>
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                      {contribution.links && contribution.links.length > 0 && (
                        <div className="flex flex-col gap-2">
                          {contribution.links.map((link, linkIndex) => (
                            <Link
                              key={linkIndex}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-cyan-400/90 hover:text-cyan-300 transition-colors group"
                            >
                              <ArrowTopRightOnSquareIcon className="w-4 h-4 flex-shrink-0" />
                              <span className="group-hover:underline">{link.title}</span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
