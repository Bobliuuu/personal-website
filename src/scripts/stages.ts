import { initWater } from "./water";

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

export function initStages(reduce: boolean) {
  // --t: scroll progress (0..1) through any [data-scrub] section; CSS does the rest.
  const scrubs = [...document.querySelectorAll<HTMLElement>("[data-scrub]:not([data-hero])")];
  if (!reduce) {
    let tick = false;
    const run = () => { tick = false; for (const el of scrubs) { const r = el.getBoundingClientRect(); if (r.bottom < -200 || r.top > innerHeight + 200) continue;
      el.style.setProperty("--t", clamp(-r.top / Math.max(1, r.height - innerHeight)).toFixed(4)); } };
    const on = () => { if (!tick) { tick = true; requestAnimationFrame(run); } };
    addEventListener("scroll", on, { passive: true }); addEventListener("resize", on); run();
  }

  // lazy 3D title (three.js only loads when the section is near)
  const t3 = document.querySelector<HTMLElement>("[data-title3d]");
  if (t3) new IntersectionObserver(([e], io) => { if (e.isIntersecting) { io.disconnect(); import("./title3d").then((m) => m.initTitle3D(t3)).catch(() => {}); } }, { rootMargin: "800px" }).observe(t3);

  // WebGL water
  const w = document.querySelector<HTMLCanvasElement>("[data-water]");
  if (w) new IntersectionObserver(([e], io) => { if (e.isIntersecting) { io.disconnect(); initWater(w, w.dataset.src!, reduce); } }, { rootMargin: "600px" }).observe(w);

  // frisbee arc when About enters view (original behaviour)
  const fr = document.querySelector<SVGElement>("[data-frisbee]");
  if (fr && !reduce) new IntersectionObserver(([e]) => { if (e.isIntersecting) { fr.classList.remove("fly"); void fr.getBoundingClientRect(); fr.classList.add("fly"); } }, { threshold: 0.5 }).observe(fr.parentElement!);

  // skills books
  document.querySelectorAll<HTMLElement>("[data-book]").forEach((b) => b.addEventListener("click", () => {
    document.querySelectorAll("[data-book]").forEach((x) => { x.classList.toggle("on", x === b); x.setAttribute("aria-pressed", String(x === b)); });
    document.querySelectorAll<HTMLElement>("[data-shelf]").forEach((s) => (s.hidden = s.dataset.shelf !== b.dataset.book));
  }));

  // trading-card tilt + foil sheen (fine pointers only); tap-to-flip on touch
  const fine = matchMedia("(hover: hover) and (pointer: fine)").matches;
  document.querySelectorAll<HTMLElement>("[data-card]").forEach((c) => {
    if (!fine) { c.addEventListener("click", (e) => { if (!c.classList.contains("flip")) { e.preventDefault(); document.querySelectorAll(".tcard.flip").forEach((x) => x.classList.remove("flip")); c.classList.add("flip"); } }); return; }
    c.addEventListener("pointermove", (e) => { const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      c.style.setProperty("--mx", x * 100 + "%"); c.style.setProperty("--my", y * 100 + "%"); c.style.transform = `perspective(1500px) rotateX(${(0.5 - y) * 8}deg) rotateY(${(x - 0.5) * 8}deg)`; });
    c.addEventListener("pointerleave", () => (c.style.transform = ""));
  });
  document.querySelectorAll<HTMLElement>("[data-tilt]").forEach((c) => {
    if (!fine) return;
    c.addEventListener("pointermove", (e) => { const r = c.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; c.style.transform = `perspective(1200px) rotateX(${(0.5 - y) * 3}deg) rotateY(${(x - 0.5) * 3}deg) translateY(-2px)`; });
    c.addEventListener("pointerleave", () => (c.style.transform = ""));
  });

  // contact form -> mailto (static site, no backend)
  document.querySelector<HTMLFormElement>("[data-contact]")?.addEventListener("submit", (e) => { e.preventDefault(); const f = e.currentTarget as HTMLFormElement; const d = new FormData(f);
    location.href = `mailto:${f.dataset.to}?subject=${encodeURIComponent("Hello from " + d.get("name"))}&body=${encodeURIComponent(d.get("message") + "\n\n" + d.get("name") + " <" + d.get("email") + ">")}`; });
}
