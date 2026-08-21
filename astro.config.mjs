import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://suryatechcodex.com",
  integrations: [sitemap()],
  markdown: {
    shikiConfig: { theme: "github-dark" }
  }
});
