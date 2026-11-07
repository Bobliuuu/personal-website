import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://jerryzhu.org",
  output: "static",
  integrations: [sitemap()],
  build: { inlineStylesheets: "auto" },
  prefetch: { prefetchAll: false },
});
