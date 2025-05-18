"use client";
import Image from "next/image";

export default function Education() {
  return (
    <section className="max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24 pt-0 mt-8">
      <div>
        <h2 className="text-4xl sm:text-4xl lg:text-5xl font-medium mb-8">
          <span className="bg-gradient-to-r from-gray-400 via-gray-100 via-50% to-gray-400 bg-clip-text text-transparent">
            Education
          </span>
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
              Bachelor&apos;s Degree of Math (BMath) in Computer Science, Combinatorics and Optimization Joint
            </p>
          </div>
        </div>
      </div>
    </section>
  );
} 