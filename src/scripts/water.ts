// Interactive water: WebGL2 height-field ripple simulation refracting a photo.
// Replaces jQuery + jquery.ripples (CDN) with ~100 lines and zero dependencies.
const VS = `#version 300 es
out vec2 uv; void main(){ vec2 p = vec2((gl_VertexID<<1)&2, gl_VertexID&2); uv = p; gl_Position = vec4(p*2.-1.,0,1); }`;

const FS_DROP = `#version 300 es
precision highp float; in vec2 uv; out vec4 o; uniform sampler2D t; uniform vec2 c; uniform float r, s, asp;
void main(){ vec4 i = texture(t, uv); vec2 d = (uv-c)*vec2(asp,1.); float k = max(0., 1.-length(d)/r); k = .5-cos(k*3.14159)*.5; i.r += k*s; o = i; }`;

const FS_STEP = `#version 300 es
precision highp float; in vec2 uv; out vec4 o; uniform sampler2D t; uniform vec2 px;
void main(){ vec4 i = texture(t, uv);
  float a = (texture(t, uv+vec2(px.x,0)).r + texture(t, uv-vec2(px.x,0)).r + texture(t, uv+vec2(0,px.y)).r + texture(t, uv-vec2(0,px.y)).r) * .25;
  i.g += (a - i.r) * 2.; i.g *= .992; i.r += i.g; i.r *= .9995; o = i; }`;

const FS_VIEW = `#version 300 es
precision highp float; in vec2 uv; out vec4 o; uniform sampler2D t, bg; uniform vec2 px, sc;
void main(){
  float dx = texture(t, uv+vec2(px.x,0)).r - texture(t, uv-vec2(px.x,0)).r;
  float dy = texture(t, uv+vec2(0,px.y)).r - texture(t, uv-vec2(0,px.y)).r;
  vec2 n = vec2(dx, dy);
  vec2 buv = (uv - .5) * sc + .5 + n * .55;
  vec3 col = texture(bg, buv).rgb;
  float spec = pow(max(0., 1. - length(n) * 9.), 28.) * 0.0 + pow(clamp(length(n) * 14., 0., 1.), 3.) * .55;
  col += vec3(.75, 1., 1.) * spec * (n.x - n.y > 0. ? 1. : .35);
  col *= 1. + length(n) * 6.;
  o = vec4(col, 1.); }`;

export function initWater(canvas: HTMLCanvasElement, src: string, reduce: boolean) {
  const gl = canvas.getContext("webgl2", { antialias: false, alpha: false, powerPreference: "low-power" });
  if (!gl || !gl.getExtension("EXT_color_buffer_float")) { canvas.dataset.fallback = "1"; return; }
  const prog = (fs: string) => {
    const mk = (type: number, s: string) => { const h = gl.createShader(type)!; gl.shaderSource(h, s); gl.compileShader(h); return h; };
    const p = gl.createProgram()!; gl.attachShader(p, mk(gl.VERTEX_SHADER, VS)); gl.attachShader(p, mk(gl.FRAGMENT_SHADER, fs)); gl.linkProgram(p);
    return p;
  };
  const pDrop = prog(FS_DROP), pStep = prog(FS_STEP), pView = prog(FS_VIEW);
  const U = (p: WebGLProgram, n: string) => gl.getUniformLocation(p, n);

  const SIM = 384;
  const mkTex = () => { const t = gl.createTexture()!; gl.bindTexture(gl.TEXTURE_2D, t); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA16F, SIM, SIM, 0, gl.RGBA, gl.HALF_FLOAT, null);
    for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE], [gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE]] as const) gl.texParameteri(gl.TEXTURE_2D, k, v);
    const f = gl.createFramebuffer()!; gl.bindFramebuffer(gl.FRAMEBUFFER, f); gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0); return { t, f }; };
  let A = mkTex(), B = mkTex();
  const bg = gl.createTexture()!; let imgAspect = 1.5;
  const img = new Image(); img.decoding = "async";
  img.onload = () => { gl.bindTexture(gl.TEXTURE_2D, bg); gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true); gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, img);
    for (const [k, v] of [[gl.TEXTURE_MIN_FILTER, gl.LINEAR], [gl.TEXTURE_MAG_FILTER, gl.LINEAR], [gl.TEXTURE_WRAP_S, gl.MIRRORED_REPEAT], [gl.TEXTURE_WRAP_T, gl.MIRRORED_REPEAT]] as const) gl.texParameteri(gl.TEXTURE_2D, k, v);
    imgAspect = img.width / img.height; canvas.dataset.ready = "1"; };
  img.src = src;

  const resize = () => { const d = Math.min(devicePixelRatio || 1, 1.5); canvas.width = canvas.clientWidth * d; canvas.height = canvas.clientHeight * d; };
  resize(); addEventListener("resize", resize);

  const pass = (p: WebGLProgram, target: { f: WebGLFramebuffer } | null, src: WebGLTexture, set?: () => void) => {
    gl.bindFramebuffer(gl.FRAMEBUFFER, target ? target.f : null);
    gl.viewport(0, 0, target ? SIM : canvas.width, target ? SIM : canvas.height);
    gl.useProgram(p); gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, src); gl.uniform1i(U(p, "t"), 0); set?.();
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  const swap = () => { const x = A; A = B; B = x; };
  const drop = (x: number, y: number, r = 0.035, s = 0.05) => {
    pass(pDrop, B, A.t, () => { gl.uniform2f(U(pDrop, "c"), x, y); gl.uniform1f(U(pDrop, "r"), r); gl.uniform1f(U(pDrop, "s"), s); gl.uniform1f(U(pDrop, "asp"), canvas.clientWidth / canvas.clientHeight); }); swap();
  };
  const frame = () => {
    pass(pStep, B, A.t, () => gl.uniform2f(U(pStep, "px"), 1 / SIM, 1 / SIM)); swap();
    pass(pView, null, A.t, () => {
      const ca = canvas.clientWidth / canvas.clientHeight; // cover-fit the photo
      gl.uniform2f(U(pView, "px"), 1 / SIM, 1 / SIM);
      gl.uniform2f(U(pView, "sc"), ca > imgAspect ? 1 : ca / imgAspect, ca > imgAspect ? imgAspect / ca : 1);
      gl.activeTexture(gl.TEXTURE1); gl.bindTexture(gl.TEXTURE_2D, bg); gl.uniform1i(U(pView, "bg"), 1);
    });
  };

  const host = canvas.parentElement!;
  let last = 0;
  host.addEventListener("pointermove", (e) => {
    const r = canvas.getBoundingClientRect(); const now = performance.now(); if (now - last < 24) return; last = now;
    drop((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height, 0.03, 0.035);
  }, { passive: true });
  host.addEventListener("pointerdown", (e) => { const r = canvas.getBoundingClientRect(); drop((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height, 0.07, 0.25); });
  // frisbee (or anything) can splash: window.dispatchEvent(new CustomEvent("water:drop", {detail:{x,y}}))
  addEventListener("water:drop", (e) => { const d = (e as CustomEvent).detail; const r = canvas.getBoundingClientRect();
    if (d.y < r.top || d.y > r.bottom) return; drop((d.x - r.left) / r.width, 1 - (d.y - r.top) / r.height, 0.045, 0.12); });

  if (reduce) { drop(.5, .5, .1, .2); for (let i = 0; i < 40; i++) frame(); return; }
  let raf = 0, visible = false, tick = 0;
  const loop = () => { frame(); if (++tick % 150 === 0) drop(Math.random(), Math.random(), 0.04, 0.08); raf = requestAnimationFrame(loop); };
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; cancelAnimationFrame(raf); if (visible) raf = requestAnimationFrame(loop); }).observe(canvas);
}
