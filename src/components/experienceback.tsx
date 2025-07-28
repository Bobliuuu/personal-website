'use client';

import { useEffect } from 'react';
import $ from 'jquery';

export default function RippleExperience() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).jQuery = $;
      (window as any).$ = $;

      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/gh/sirxemic/jquery.ripples/jquery.ripples-min.js';
      script.async = true;
      script.onload = () => {
        $('.ripple-container').ripples({
          resolution: 512,
          dropRadius: 20,
          perturbance: 0.04,
        });
      };
      document.body.appendChild(script);
    }

    return () => {
      try {
        $('.ripple-container').ripples('destroy');
      } catch {}
    };
  }, []);

  return (
    <div
      className="ripple-container relative w-screen h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/underwater.jpg')" }}
    >
      {/* Top gradient fade */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#3bf1f7] via-transparent to-transparent pointer-events-none z-20" />

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none z-20" />

      {/* Centered heading */}
      <h1 className="absolute inset-0 z-30 flex items-center justify-center text-6xl text-white font-bold animate-glow pointer-events-none">
        experiences
      </h1>
    </div>
  );
}
