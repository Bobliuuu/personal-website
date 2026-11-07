export function initReveal(reduce: boolean) {
  const els = document.querySelectorAll<HTMLElement>(".reveal");
  if (reduce || !("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("in")); }
  else {
    const io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { rootMargin: "0px 0px -8% 0px" });
    els.forEach((e) => io.observe(e));
  }
  // count-up stats
  document.querySelectorAll<HTMLElement>("[data-count]").forEach((el) => {
    const to = Number(el.dataset.count); const suffix = el.dataset.suffix ?? "";
    if (reduce) { el.textContent = to + suffix; return; }
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return; io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => { const k = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4))) + suffix; if (k < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }); io.observe(el);
  });
}
