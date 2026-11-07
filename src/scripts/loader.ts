// Port of the original loading screen: glowing script name that brightens with progress + red bar.
export function initLoader() {
  const root = document.documentElement;
  const el = document.getElementById("loader");
  if (!el || !root.classList.contains("loading")) return;
  const name = document.getElementById("loader-name")!, bar = document.getElementById("loader-bar")!;
  let p = 0; const t0 = performance.now();
  const done = () => { el.classList.add("out"); root.classList.remove("loading"); try { sessionStorage.setItem("seen", "1"); } catch {} setTimeout(() => el.remove(), 900); };
  const loaded = new Promise<void>((r) => (document.readyState === "complete" ? r() : addEventListener("load", () => r(), { once: true })));
  let ready = false; loaded.then(() => (ready = true));
  const tick = () => {
    p = Math.min(ready ? 100 : 92, p + Math.random() * 3 + 0.6);
    const g = Math.min(1, p / 70) * 30;
    name.style.textShadow = `0 0 ${g / 20}vw #fff, 0 0 ${g / 40}vw #60a5fa, 0 0 ${g / 7}vw #a78bfa`;
    name.style.filter = `brightness(${0.7 + 0.3 * Math.min(1, p / 70)})`;
    bar.style.width = p + "%";
    if (p >= 100 && performance.now() - t0 > 1100) return setTimeout(done, 250);
    setTimeout(tick, 30);
  };
  tick();
}
