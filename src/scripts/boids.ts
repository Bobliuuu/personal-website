// Boids = a flock of discs. Cohesion / alignment / separation + cursor "catch" attraction.
export function initBoids(reduce: boolean) {
  const cv = document.getElementById("boids") as HTMLCanvasElement | null;
  const ctx = cv?.getContext("2d");
  if (!cv || !ctx) return;
  const dpr = Math.min(devicePixelRatio || 1, 1.5);
  let W = 0, H = 0;
  const resize = () => { W = innerWidth; H = innerHeight; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); };
  resize(); addEventListener("resize", resize);

  const N = innerWidth < 700 ? 50 : 110;
  const b = Array.from({ length: N }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: Math.random() - .5, vy: Math.random() - .5 }));
  const mouse = { x: -999, y: -999 };
  addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

  const accent = () => getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#d4ff3a";
  const R = 70, MAXV = 2.2;
  function step() {
    for (const a of b) {
      let cx = 0, cy = 0, ax = 0, ay = 0, sx = 0, sy = 0, n = 0;
      for (const o of b) {
        if (o === a) continue;
        const dx = o.x - a.x, dy = o.y - a.y, d2 = dx * dx + dy * dy;
        if (d2 < R * R) { n++; cx += o.x; cy += o.y; ax += o.vx; ay += o.vy; if (d2 < 22 * 22) { sx -= dx; sy -= dy; } }
      }
      if (n) { a.vx += ((cx / n - a.x) * 0.0008) + ((ax / n - a.vx) * 0.04) + sx * 0.002; a.vy += ((cy / n - a.y) * 0.0008) + ((ay / n - a.vy) * 0.04) + sy * 0.002; }
      const mx = mouse.x - a.x, my = mouse.y - a.y, md = Math.hypot(mx, my);
      if (md < 160) { a.vx -= (mx / md) * 0.12; a.vy -= (my / md) * 0.12; } // flee cursor
      const sp = Math.hypot(a.vx, a.vy) || 1;
      if (sp > MAXV) { a.vx = (a.vx / sp) * MAXV; a.vy = (a.vy / sp) * MAXV; }
      if (sp < 0.8) { a.vx *= 1.05; a.vy *= 1.05; }
      a.x += a.vx; a.y += a.vy;
      if (a.x < -20) a.x = W + 20; if (a.x > W + 20) a.x = -20;
      if (a.y < -20) a.y = H + 20; if (a.y > H + 20) a.y = -20;
    }
  }
  function draw() {
    ctx!.clearRect(0, 0, W, H);
    ctx!.fillStyle = accent();
    for (const a of b) {
      const ang = Math.atan2(a.vy, a.vx);
      ctx!.save(); ctx!.translate(a.x, a.y); ctx!.rotate(ang);
      ctx!.beginPath(); ctx!.ellipse(0, 0, 6, 2.2, 0, 0, Math.PI * 2); ctx!.fill(); // a tiny disc, edge-on
      ctx!.restore();
    }
  }
  if (reduce) { for (let i = 0; i < 120; i++) step(); draw(); return; }
  let raf = 0;
  const loop = () => { step(); draw(); raf = requestAnimationFrame(loop); };
  const toggle = () => { cancelAnimationFrame(raf); if (!document.hidden) raf = requestAnimationFrame(loop); };
  document.addEventListener("visibilitychange", toggle); toggle();
}
