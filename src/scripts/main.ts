import { initLoader } from "./loader";
import { initHero } from "./hero";
import { initBoids } from "./boids";
import { initReveal } from "./reveal";
import { initStages } from "./stages";

const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
initLoader();
initHero(reduce);
initReveal(reduce);
initBoids(reduce);
initStages(reduce);
