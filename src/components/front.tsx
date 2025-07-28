"use client";

import { useRef, useEffect, useState } from "react";
import { ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Front() {
  const navbarRef = useRef<HTMLDivElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);

  useEffect(() => {
    if (navbarRef.current) {
      setNavbarHeight(navbarRef.current.offsetHeight);
    }
    // Listen for window resize to update height
    const handleResize = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Navbar clone for measurement, hidden visually */}
      <div ref={navbarRef} style={{ position: 'absolute', visibility: 'hidden', pointerEvents: 'none', width: '100vw', top: 0, left: 0, zIndex: -1 }}>
        <header className="py-6">
          <div className="max-w-[1800px] mx-auto px-12 sm:px-16 lg:px-24 flex justify-between items-center">
            <span className="text-2xl font-bold">Jerry Zhu</span>
          </div>
        </header>
      </div>
      <section
        className="relative w-screen flex items-center justify-center overflow-hidden overflow-x-hidden"
        style={{ height: `calc(100vh - ${navbarHeight}px)`, marginTop: `${navbarHeight}px` }}
      >
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        >
          <source src="/video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Fading gradient overlay for smooth transition to next section */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#183c1e] to-transparent z-10"></div>
        
        {/* You can add overlay content here if needed */}
        {/* Down Arrow Button */}
        <button
          onClick={() => {
            const el = document.getElementById('hero');
            const navbar = document.querySelector('header');
            if (el) {
              const rect = el.getBoundingClientRect();
              const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
              const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
              const top = rect.top + scrollTop - navbarHeight - 32;
              window.scrollTo({ top, behavior: 'smooth' });
            }
          }}
          className="absolute z-20 bg-transparent hover:bg-transparent rounded-full p-2 transition-all animate-bounce-custom glow-button"
          style={{ bottom: '20%' }}
          aria-label="Scroll down"
        >
          <ChevronDownIcon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400 animate-bounce-custom" />
        </button>
      </section>
    </>
  );
} 