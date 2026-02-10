"use client";

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";

export default function ProjectsBack() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inViewIn = useInView(sectionRef, { amount: 0.3 }); 
  const [showClouds, setShowClouds] = useState(false);
  const lastScrollY = useRef(0);
  const [scrollDir, setScrollDir] = useState<'up' | 'down'>('down');

  useEffect(() => {
    function onScroll() {
      const y = window.scrollY;
      if (y > lastScrollY.current) setScrollDir('down');
      else if (y < lastScrollY.current) setScrollDir('up');
      lastScrollY.current = y;
    }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (scrollDir === 'down') {
      if (inViewIn) setShowClouds(true);
    } else {
      if (inViewIn) setShowClouds(true);
      else if (!inViewIn) setShowClouds(false);
    }
  }, [inViewIn, scrollDir]);

  // Show/hide clouds based on scroll and inViewIn (works for both directions)
  useEffect(() => {
    function onScroll() {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (inViewIn && rect.top >= -window.innerHeight * 0.1) {
        setShowClouds(true);
      } else {
        setShowClouds(false);
      }
    }
    window.addEventListener('scroll', onScroll);
    onScroll(); // run on mount and when inViewIn changes
    return () => window.removeEventListener('scroll', onScroll);
  }, [inViewIn]);

  return (
    <div ref={sectionRef} className="relative w-full h-screen bg-black overflow-hidden flex flex-col items-center justify-end">
      {/* Glowing Projects Text */}
      <h1 className="absolute top-10 left-1/2 -translate-x-1/2 z-20 text-6xl md:text-7xl font-bold text-white font-inter animate-glow pointer-events-none text-center drop-shadow-[0_0_40px_#a5f3fc]">
        Projects
      </h1>
      {/* Clouds - left */}
      <motion.div
        animate={showClouds ? { x: 0, opacity: 1, scale: 1 } : { x: -200, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.3 }}
        className="absolute top-24 left-0 z-10 w-1/3 max-w-[400px]"
      >
        <Image src="/cloud.png" alt="Cloud left" width={400} height={120} className="opacity-80" />
      </motion.div>
      {/* Clouds - right */}
      <motion.div
        animate={showClouds ? { x: 0, opacity: 1, scale: 1 } : { x: 200, opacity: 0, scale: 0.7 }}
        transition={{ duration: 0.7, type: "spring", bounce: 0.3, delay: 0.1 }}
        className="absolute top-32 right-0 z-10 w-1/3 max-w-[400px]"
      >
        <Image src="/cloud.png" alt="Cloud right" width={400} height={120} className="opacity-80" />
      </motion.div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-[#0d1f2d] to-transparent z-40 pointer-events-none" />

      {/* Mountains - full width and height */}
      <div className="absolute inset-0 w-full h-full z-30">
        <Image src="/mountain.png" alt="Mountains" fill className="object-cover" priority />
      </div>
    </div>
  );
} 