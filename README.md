# Surya Tech Codex

A modern technical publication for practical writing on .NET, Azure, AI architecture, software engineering careers, and entrepreneurship.

**Live site:** https://suryatechcodex.com/

## Stack

- Astro
- Markdown content collections
- GitHub Pages
- GitHub Actions
- SEO sitemap and social metadata
- RSS, article search, reading progress, sharing, and structured data
- Giscus-ready discussions and reactions

## Local development

```bash
npm install
npm run dev
```

## Publishing an article

Add a Markdown file to `src/content/articles/` using the frontmatter structure in the existing SQL Server article. Push to `main`; GitHub Actions builds and deploys the site automatically.

## Current milestone

Professional publication: responsive navigation, editorial homepage, article reading experience, social sharing, RSS, search, SEO, and automated Pages deployment.

See [the publishing workflow](docs/PUBLISHING.md) and [external setup checklist](docs/EXTERNAL-SETUP.md).
