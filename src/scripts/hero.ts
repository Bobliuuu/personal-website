// Scroll-scrubbed hero: video time follows scroll; panel crops into portrait; copy slides in.
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function initHero(reduce: boolean) {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return;
  const v = hero.querySelector<HTMLVideoElement>("[data-scrub-video]");
  if (reduce) { hero.classList.add("static"); return; }

  let raw = 0, shown = 0, target = 0, raf = 0;
  const update = () => {
    raw = clamp(scrollY / (hero.offsetHeight - innerHeight));
    hero.style.setProperty("--p", ease(clamp((raw - 0.25) / 0.45)).toFixed(4));
    hero.style.setProperty("--c", ease(clamp((raw - 0.55) / 0.35)).toFixed(4));
    target = raw;
    if (!raf) raf = requestAnimationFrame(seek);
  };
  // lerp the playhead toward the scroll position so scrubbing feels fluid
  const seek = () => {
    raf = 0;
    shown += (target - shown) * 0.18;
    if (v && v.duration) { const t = shown * (v.duration - 0.05); if (Math.abs(v.currentTime - t) > 0.016) v.currentTime = t; }
    if (Math.abs(target - shown) > 0.001) raf = requestAnimationFrame(seek);
  };
  addEventListener("scroll", update, { passive: true });
  addEventListener("resize", update, { passive: true });
  v?.addEventListener("loadedmetadata", update);
  // iOS needs a user gesture to unlock programmatic seeking
  addEventListener("touchstart", () => v?.play().then(() => v.pause()).catch(() => {}), { once: true, passive: true });
  update();
}
