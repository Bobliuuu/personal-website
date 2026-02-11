"use client"

import Image from "next/image"
import { experiences } from "@/constants/experience"
import { ChevronDownIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

type GroupedExperience = {
  company: string
  logo: string
  entries: typeof experiences
}

export default function Experience() {
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(new Set())
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(new Set())

  // Group experiences by company name
  const groupedExperiences: GroupedExperience[] = []
  const companyMap = new Map<string, GroupedExperience>()

  experiences.forEach((exp) => {
    if (!companyMap.has(exp.company)) {
      const group: GroupedExperience = {
        company: exp.company,
        logo: exp.logo,
        entries: [],
      }
      companyMap.set(exp.company, group)
      groupedExperiences.push(group)
    }
    companyMap.get(exp.company)!.entries.push(exp)
  })

  const toggleCompany = (company: string) => {
    setExpandedCompanies((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(company)) {
        newSet.delete(company)
      } else {
        newSet.add(company)
      }
      return newSet
    })
  }

  const toggleEntry = (key: string) => {
    setExpandedEntries((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(key)) {
        newSet.delete(key)
      } else {
        newSet.add(key)
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
        {groupedExperiences.map((group, groupIndex) => {
          const isCompanyExpanded = expandedCompanies.has(group.company)
          const hasMultipleEntries = group.entries.length > 1
          const singleEntry = group.entries[0]
          const singleEntryDetailPoints = singleEntry && (singleEntry.description ? singleEntry.points : singleEntry.points.slice(1))
          const singleEntryHasDetails = !hasMultipleEntries && singleEntry && (
            (singleEntryDetailPoints && singleEntryDetailPoints.length > 0) ||
            (singleEntry.images && singleEntry.images.length > 0)
          )
          const singleEntryKey = `${group.company}-0`

          // Get date range for companies with multiple entries
          const getDateRange = () => {
            if (!hasMultipleEntries) {
              return formatDate(group.entries[0].date)
            }
            // Get earliest and latest dates
            const dates = group.entries.map(e => {
              if (Array.isArray(e.date)) return e.date[0]
              return e.date
            })
            const sortedDates = dates.sort()
            const earliestDate = sortedDates[0]
            const latestDate = group.entries[0].date // First entry is typically most recent
            if (Array.isArray(latestDate)) {
              return `${earliestDate} - ${latestDate[1]}`
            }
            return `${earliestDate} - ${latestDate}`
          }

          return (
            <div
              key={groupIndex}
              className="group rounded-xl border border-white/10 bg-white/[0.03] transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              {/* Company Header */}
              <button
                type="button"
                onClick={() => {
                  if (hasMultipleEntries) toggleCompany(group.company)
                  else if (singleEntryHasDetails) toggleEntry(singleEntryKey)
                }}
                className={`w-full text-left ${hasMultipleEntries || singleEntryHasDetails ? "cursor-pointer" : "cursor-default"}`}
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6 p-6 md:p-8">
                  {/* Left: Date + Location */}
                  <div className="flex-shrink-0 md:w-[240px] lg:w-[300px]">
                    <p className="text-lg font-medium text-blue-200/90">
                      {getDateRange()}
                    </p>
                    <p className="mt-1 text-base text-gray-400">
                      {group.entries[0].location}
                    </p>
                  </div>

                  {/* Right: Logo + Company */}
                  <div className="flex flex-1 min-w-0 items-start gap-5 md:ml-10 lg:ml-14">
                    <div className="flex-shrink-0">
                      <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-white/10 ring-1 ring-white/20">
                        <Image
                          src={group.logo || "/uwaterloo_logo_black.png"}
                          alt={group.company}
                          width={32}
                          height={32}
                          className="object-contain p-1"
                        />
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-2xl font-bold tracking-tight text-white">
                          {group.company}
                        </h3>
                        {(hasMultipleEntries || singleEntryHasDetails) && (
                          <ChevronDownIcon className="h-7 w-7 flex-shrink-0 text-gray-400" />
                        )}
                      </div>
                      {!hasMultipleEntries && (
                        <>
                          <p className="mt-1.5 text-lg text-gray-300">
                            {group.entries[0].title}
                          </p>
                          {group.entries[0].description && (
                            <p className="mt-2 text-base leading-relaxed text-gray-400">
                              {group.entries[0].description}
                            </p>
                          )}
                          {group.entries[0].tags && group.entries[0].tags.length > 0 && (
                            <div className="mt-3 flex flex-wrap gap-2">
                              {group.entries[0].tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm text-gray-300"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                      {hasMultipleEntries && (
                        <p className="mt-1.5 text-lg text-gray-300">
                          {group.entries.length} positions
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </button>

              {/* Multiple Entries - Collapsible */}
              {hasMultipleEntries && (
                <div
                  className="grid transition-[grid-template-rows] duration-300 ease-out"
                  style={{
                    gridTemplateRows: isCompanyExpanded ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/10 bg-white/[0.02]">
                      {group.entries.map((experience, entryIndex) => {
                        const entryKey = `${group.company}-${entryIndex}`
                        const isEntryExpanded = expandedEntries.has(entryKey)
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
                          <div key={entryIndex} className="border-b border-white/5 last:border-0">
                            <button
                              type="button"
                              onClick={() => hasDetails && toggleEntry(entryKey)}
                              className={`w-full text-left ${!hasDetails ? "cursor-default" : "cursor-pointer"}`}
                            >
                              <div className="flex flex-col md:flex-row md:items-start gap-6 px-6 py-4 md:px-8 md:py-5">
                                {/* Left: Date + Location */}
                                <div className="flex-shrink-0 md:w-[240px] lg:w-[300px]">
                                  <p className="text-lg font-medium text-blue-200/90">
                                    {formatDate(experience.date)}
                                  </p>
                                  <p className="mt-1 text-base text-gray-400">
                                    {experience.location}
                                  </p>
                                </div>

                                {/* Right: Role + Description */}
                                <div className="flex flex-1 min-w-0 items-start gap-5 md:ml-10 lg:ml-14">
                                  <div className="flex-1 min-w-0">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <h4 className="text-xl font-semibold tracking-tight text-white">
                                        {experience.title}
                                      </h4>
                                      {hasDetails && (
                                        <ChevronDownIcon className="h-6 w-6 flex-shrink-0 text-gray-400" />
                                      )}
                                    </div>
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

                            {/* Entry Details - Collapsible */}
                            <div
                              className="grid transition-[grid-template-rows] duration-300 ease-out"
                              style={{
                                gridTemplateRows: isEntryExpanded ? "1fr" : "0fr",
                              }}
                            >
                              <div className="overflow-hidden">
                                <div className="border-t border-white/10 bg-white/[0.01] px-6 pb-6 pt-4 md:px-8 md:pb-8 md:pt-5">
                                  <div className="flex flex-col gap-6 pl-0 md:pl-[calc(240px+2.5rem)] lg:pl-[calc(300px+3.5rem)]">
                                    {detailPoints.length > 0 && (
                                      <ul className="list-disc list-inside space-y-3 text-base leading-relaxed text-gray-400 marker:text-cyan-400/80">
                                        {detailPoints.map((point, pointIndex) => (
                                          <li key={pointIndex}>{point}</li>
                                        ))}
                                      </ul>
                                    )}
                                    {experience.images && experience.images.length > 0 && (
                                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        {experience.images.map((img: string, i: number) => (
                                          <Image
                                            key={i}
                                            src={img}
                                            alt={`${experience.company} image`}
                                            width={600}
                                            height={350}
                                            className="rounded-lg border border-white/20 object-cover"
                                          />
                                        ))}
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
                </div>
              )}

              {/* Single Entry Details - Show directly without nesting */}
              {!hasMultipleEntries && (() => {
                const experience = group.entries[0]
                const detailPoints = experience.description
                  ? experience.points
                  : experience.points.slice(1)
                const hasDetails =
                  detailPoints.length > 0 ||
                  (experience.images && experience.images.length > 0)

                if (!hasDetails) return null

                const entryKey = `${group.company}-0`
                const isExpanded = expandedEntries.has(entryKey)

                return (
                  <>
                    <div
                      className="grid transition-[grid-template-rows] duration-300 ease-out"
                      style={{
                        gridTemplateRows: isExpanded ? "1fr" : "0fr",
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="border-t border-white/10 bg-white/[0.02] px-6 pb-6 pt-4 md:px-8 md:pb-8 md:pt-5">
                          <div className="flex flex-col gap-6 pl-0 md:pl-[calc(240px+2.5rem)] lg:pl-[calc(300px+3.5rem)]">
                            {detailPoints.length > 0 && (
                              <ul className="list-disc list-inside space-y-3 text-base leading-relaxed text-gray-400 marker:text-cyan-400/80">
                                {detailPoints.map((point, pointIndex) => (
                                  <li key={pointIndex}>{point}</li>
                                ))}
                              </ul>
                            )}
                            {experience.images && experience.images.length > 0 && (
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                {experience.images.map((img: string, i: number) => (
                                  <Image
                                    key={i}
                                    src={img}
                                    alt={`${experience.company} image`}
                                    width={600}
                                    height={350}
                                    className="rounded-lg border border-white/20 object-cover"
                                  />
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                )
              })()}
            </div>
          )
        })}
      </div>
    </div>
  )
}
