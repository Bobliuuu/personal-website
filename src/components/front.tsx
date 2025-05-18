"use client";

import { useRef, useEffect, useState } from "react";

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
        <img
          src="/forest2.jpg"
          alt="Forest background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-black/40" />
        {/* You can add overlay content here if needed */}
      </section>
    </>
  );
} 