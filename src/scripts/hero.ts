// Scroll-driven hero: video panel crops into the portrait panel, copy slides in.
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function initHero(reduce: boolean) {
  const hero = document.querySelector<HTMLElement>("[data-hero]");
  if (!hero) return;
  if (reduce) { hero.classList.add("static"); hero.querySelector("video")?.pause(); return; }

  let ticking = false;
  const update = () => {
    ticking = false;
    const span = hero.offsetHeight - innerHeight;
    const raw = clamp(scrollY / span);
    hero.style.setProperty("--p", ease(clamp((raw - 0.04) / 0.6)).toFixed(4));
    hero.style.setProperty("--c", ease(clamp((raw - 0.38) / 0.4)).toFixed(4));
  };
  const onScroll = () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } };
  addEventListener("scroll", onScroll, { passive: true });
  addEventListener("resize", onScroll, { passive: true });
  update();

  // pause the video once it's off screen
  const v = hero.querySelector("video");
  if (v) new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause())).observe(hero);
}
