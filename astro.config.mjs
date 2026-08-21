import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://surya99.github.io",
  base: "/surya-tech-codex",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: "github-dark" }
  }
});
