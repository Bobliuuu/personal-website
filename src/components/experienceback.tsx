'use client';

import { useEffect } from 'react';
import $ from 'jquery';

export default function RippleExperience() {
  useEffect(() => {
    // Attach jQuery to window (required by jquery.ripples)
    if (typeof window !== 'undefined') {
      (window as any).jQuery = $;
      (window as any).$ = $;

      // Dynamically load the plugin script
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
      <h1 className="absolute inset-0 z-10 flex items-center justify-center text-6xl text-white font-bold animate-glow pointer-events-none">
        experiences
      </h1>
    </div>
  );
}
