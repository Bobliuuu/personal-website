import { initHero } from "./hero";
import { initBoids } from "./boids";
import { initReveal } from "./reveal";

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

initHero(reduce);
initReveal(reduce);
initBoids(reduce);

document.getElementById("theme")?.addEventListener("click", () => {
  const next = document.documentElement.dataset.theme === "light" ? "dark" : "light";
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem("theme", next); } catch {}
});
