import { useEffect, useState } from "react";

export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    if (progress < 100) {
      const timeout = setTimeout(() => {
        setProgress(p => Math.min(100, p + Math.random() * 5 + 1));
      }, 30);
      return () => clearTimeout(timeout);
    } else {
      // Begin fade-out after short pause
      const fadeDelay = 400;
      const minTimeBeforeDone = 2500; // Absolute minimum time on screen
      setTimeout(() => setFade(true), fadeDelay);
  
      const start = performance.now();
  
      const checkReadyAndDone = () => {
        const elapsed = performance.now() - start;
        const delay = Math.max(0, minTimeBeforeDone - elapsed);
  
        const finish = () => {
          requestAnimationFrame(() => {
            console.log("✅ Visually ready, ending loading screen");
          });
        };
  
        if (document.readyState === "complete") {
          setTimeout(finish, delay);
        } else {
          window.addEventListener("load", () => setTimeout(finish, delay), { once: true });
        }
      };
  
      checkReadyAndDone();
    }
  }, [progress, onDone]);
  

  // Glow/brightness ramps up to max at 70% progress, then stays there
  let glowFactor = 0;
  if (progress < 70) {
    glowFactor = progress / 70;
  } else {
    glowFactor = 1;
  }
  const maxGlow = 30;
  const cappedGlow = maxGlow * glowFactor;
  const brightness = 0.7 + 0.3 * glowFactor; // 0.7 to 1.0, maxes out at 70%
  const textShadow = `0 0 ${cappedGlow / 20}vw #fff, 0 0 ${cappedGlow / 40}vw #60a5fa, 0 0 ${cappedGlow / 7}vw #a78bfa`;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col justify-center items-center bg-black transition-opacity duration-800 ${fade ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      {/* Centered text */}
      <div className="flex-1 flex items-center justify-center w-full">
        <span
          className="font-[Pacifico] text-[6vw] text-white tracking-wide select-none transition-all duration-200"
          style={{
            textShadow,
            filter: `brightness(${brightness})`,
          }}
        >
          jerry zhu
        </span>
      </div>
      {/* Loading bar */}
      <div className="absolute bottom-6 left-6 right-6 h-3 bg-gray-800 rounded-lg overflow-hidden">
        <div
          className="h-full rounded-lg transition-all duration-200"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #ef4444, #f87171 60%, #222 100%)",
          }}
        />
      </div>
    </div>
  );
} 