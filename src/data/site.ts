export const profile = {
  name: "Jerry Zhu",
  first: "Jerry",
  last: "Zhu",
  tagline: "Software engineer: data, infra, and ML systems",
  team: "Waterloo Warriors · Varsity Ultimate (Open B)",
  school: "University of Waterloo",
  class: "2027",
  location: "Waterloo / Toronto, Canada",
  email: "j25zhuo@uwaterloo.ca",
  resume: "/ZhuJerryResume.pdf",
};

export const links = [
  { name: "GitHub", href: "https://github.com/bobliuuu" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/jerryzhu2/" },
  { name: "X", href: "https://x.com/Bobliuuu/" },
  { name: "Blog", href: "https://blog.jerryzhu.org" },
  { name: "Devpost", href: "https://devpost.com/Bobliuuu" },
  { name: "YouTube", href: "https://youtube.com/@jerryzhu" },
];

/** Hero + stats strip. Every number traces to experience/awards data. */
export const heroStats = [
  { value: "3.8", label: "GPA · Waterloo CS" },
  { value: "8×", label: "Pipeline throughput" },
  { value: "35%", label: "Lower fetch latency" },
  { value: "0.5%", label: "Codingame rank, top" },
];

export const seasonStats = [
  { value: 100, suffix: "+", label: "Critical incidents resolved (SRE)" },
  { value: 500, suffix: "+", label: "Companies reached, $10k+ raised" },
  { value: 2, suffix: "M+", label: "Monthly views, Hackathons Canada" },
  { value: 50, suffix: "+", label: "dbt models built and audited" },
];

export const scouting = [
  ["Class", "2027"],
  ["School", "University of Waterloo"],
  ["Program", "BMath · CS (co-op) · Pure Math joint"],
  ["Team", "Waterloo Warriors, Open B"],
  ["Primary", "Backend · Data · Infra"],
  ["Secondary", "ML systems · Full-stack"],
  ["Based", "Waterloo / Toronto"],
  ["Currently", "SWE @ StackAdapt"],
];

export type Featured = { title: string; blurb: string; href: string; tag: string; stat?: string };
export const featured: Featured[] = [
  { title: "qwenTPU", tag: "ML SYSTEMS", stat: "★ 19", href: "https://github.com/Bobliuuu/qwentpu", blurb: "A TPU compiled into the weights of a stock Qwen3.5. No hardware, no training: a language model that does exact matrix multiplication." },
  { title: "QwenOS", tag: "SYSTEMS", stat: "★ 8", href: "https://github.com/Bobliuuu/qwen-os", blurb: "A tiny OS that boots, opens a shell, and runs real DOOM on a RISC-V CPU living inside Qwen's weights." },
  { title: "qwentensor", tag: "ML SYSTEMS", stat: "★ 5", href: "https://github.com/Bobliuuu/qwentensor", blurb: "Write a PyTorch net, quantize it, run it inside Qwen3.5. The program is the prompt." },
  { title: "Qwen in Qwen", tag: "RESEARCH", href: "https://github.com/Bobliuuu/qweninqwen", blurb: "A real Qwen3-0.6B token, computed by the weights and recurrent state of another stock Qwen." },
  { title: "10% Challenge", tag: "COMPRESSION", stat: "★ 21", href: "https://github.com/Bobliuuu/ten-percent-challenge", blurb: "A 7B model at roughly a tenth of its bf16 size, still useful and still learning." },
  { title: "Flapping Airplanes", tag: "CUDA", stat: "★ 132", href: "https://github.com/Bobliuuu/open-flapping-airplanes", blurb: "Reproducing the Flapping Airplanes megakernel, in collaboration with Magni." },
  { title: "allgit", tag: "RUST", stat: "★ 3", href: "https://github.com/Bobliuuu/allgit", blurb: "Next-gen version control: one global object graph, independent zones, S3-backed remotes." },
  { title: "bobliu-os", tag: "C · x86", stat: "★ 1", href: "https://github.com/Bobliuuu/bobliu-os", blurb: "From-scratch 32-bit x86 OS: preemptive multitasking, COW fork, VFS, libc, shell, Lua, and DOOM." },
];
