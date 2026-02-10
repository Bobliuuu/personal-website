"use client"

import { publications, awards } from "@/constants/achievements"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function Achievements() {
  return (
    <section className="w-full px-6 sm:px-12 lg:px-24 pb-10 pt-[100px]">
      <h2 className="text-4xl sm:text-4xl lg:text-5xl font-medium mb-8 animate-glow">
        <span className="bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
          Achievements
        </span>
      </h2>

      {/* Publications Section */}
      <div className="mb-12">
        <h3 className="text-2xl font-semibold text-white mb-6">Publications</h3>
        <div className="flex flex-col gap-4">
          {publications.map((pub, index) => (
            <Link
              key={index}
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-cyan-400/50 hover:bg-white/[0.06]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h4 className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors leading-snug mb-2">
                    {pub.title}
                  </h4>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-400">
                    <span className="font-medium text-cyan-400/90">{pub.publisher}</span>
                    <span>•</span>
                    <span>{pub.date}</span>
                  </div>
                </div>
                <ArrowTopRightOnSquareIcon className="w-5 h-5 text-gray-400 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Awards Section */}
      <div>
        <h3 className="text-2xl font-semibold text-white mb-6">Awards & Honors</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {awards.map((award, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-white/20 hover:bg-white/[0.06]"
            >
              <h4 className="text-lg font-semibold text-white mb-1">
                {award.title}
              </h4>
              <p className="text-cyan-400/90 text-sm font-medium mb-1">
                {award.issuer}
              </p>
              <p className="text-gray-400 text-xs mb-2">{award.date}</p>
              {award.description && (
                <p className="text-gray-400 text-sm leading-relaxed mt-3">
                  {award.description}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
