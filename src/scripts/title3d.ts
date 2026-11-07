// Port of the original Star Wars-style 3D title ("jerry zhu" + resume/blog buttons), in vanilla three.js.
// Lazy-loaded when the section approaches the viewport so it never blocks first paint.
import { Scene, PerspectiveCamera, WebGLRenderer, Group, Mesh, BoxGeometry, MeshStandardMaterial, AmbientLight, DirectionalLight, Raycaster, Vector2, Color } from "three";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

export async function initTitle3D(host: HTMLElement) {
  const canvas = host.querySelector("canvas")!;
  const renderer = new WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
  const scene = new Scene();
  const cam = new PerspectiveCamera(60, 1, 0.1, 100); cam.position.set(0, -2, 10);
  scene.add(new AmbientLight(0xffffff, 1.4)); const dl = new DirectionalLight(0xffffff, 2.6); dl.position.set(0, 10, 10); scene.add(dl);

  const font = new FontLoader().parse(await (await fetch("/fonts/starjedi_regular.json")).json());
  const root = new Group(); root.rotation.x = -Math.PI / 6; root.position.y = 1.0; scene.add(root);

  const text = (str: string, size: number, color: number, depth = 0.17) => {
    const g = new TextGeometry(str, { font, size, depth, bevelEnabled: true, bevelThickness: 0.04, bevelSize: 0.015, bevelSegments: 5 } as never);
    g.computeBoundingBox(); const m = new Mesh(g, new MeshStandardMaterial({ color })); return m;
  };
  const title = text("jerry zhu", 1.15, 0xffe81f); const tb = title.geometry.boundingBox!;
  title.position.set(-(tb.max.x - tb.min.x) / 2, 1.6, 0); root.add(title);

  const buttons: { mesh: Mesh; label: Mesh; href: string }[] = [];
  const mkBtn = (label: string, x: number, w: number, href: string) => {
    const g = new Group(); g.position.set(x, -2.6, -1);
    const box = new Mesh(new BoxGeometry(w, 0.7, 0.3), new MeshStandardMaterial({ color: 0x555555, transparent: true, opacity: 0.85 }));
    const t = text(label, 0.42, 0xf9facd, 0.08); t.geometry.computeBoundingBox(); const b = t.geometry.boundingBox!;
    t.position.set(-(b.max.x - b.min.x) / 2, -0.2, 0.25); g.add(box, t); root.add(g); buttons.push({ mesh: box, label: t, href });
  };
  mkBtn("resume", -2.6, 3.2, "/ZhuJerryResume.pdf"); mkBtn("blog", 2.6, 3.2, "https://blog.jerryzhu.org");

  const size = () => { const w = host.clientWidth, h = host.clientHeight; renderer.setSize(w, h, false); cam.aspect = w / h; cam.position.z = Math.max(10, 10 * (1.9 / (w / h)) ); cam.updateProjectionMatrix(); };
  size(); addEventListener("resize", size);

  const ray = new Raycaster(), mouse = new Vector2(); let hover = -1;
  host.addEventListener("pointermove", (e) => { const r = canvas.getBoundingClientRect(); mouse.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(mouse, cam); const hit = ray.intersectObjects(buttons.map((b) => b.mesh))[0]; hover = hit ? buttons.findIndex((b) => b.mesh === hit.object) : -1; host.style.cursor = hover >= 0 ? "pointer" : "auto";
    root.rotation.y = mouse.x * 0.12; root.rotation.x = -Math.PI / 6 + mouse.y * 0.05; });
  host.addEventListener("click", () => { if (hover >= 0) open(buttons[hover].href, "_blank"); });

  let raf = 0; const clock = performance.now();
  const loop = () => {
    const t = (performance.now() - clock) / 1000; root.position.y = 1.0 + Math.sin(t * 1.2) * 0.18;
    buttons.forEach((b, i) => { (b.mesh.material as MeshStandardMaterial).color = new Color(i === hover ? 0x777777 : 0x555555); (b.label.material as MeshStandardMaterial).emissive = new Color(i === hover ? 0xffeb3b : 0x000000); (b.label.material as MeshStandardMaterial).emissiveIntensity = i === hover ? 0.5 : 0; });
    renderer.render(scene, cam); raf = requestAnimationFrame(loop);
  };
  new IntersectionObserver(([e]) => { cancelAnimationFrame(raf); if (e.isIntersecting) raf = requestAnimationFrame(loop); }).observe(host);
  host.dataset.ready = "1";
}
