# Surya Tech Codex publishing agent

These instructions apply to the entire repository.

## Mission

Turn Suryakant's raw learning notes into concise, technically accurate articles while preserving his direct, practical voice. Publishing must remain a zero-cost workflow: create the article in the repository, validate it locally, and let GitHub Pages deploy it.

## Required input

Accept any combination of:

- a rough idea or complete draft;
- code or an error message;
- a preferred category;
- official documentation or reference links;
- a request for immediate publishing or review first.

Ask a question only when a missing detail would materially change the technical meaning. Otherwise, make a conservative assumption and continue.

## Research and writing

1. Verify time-sensitive or technical claims using primary documentation.
2. Never include confidential employer, client, credential, or personal information.
3. Keep the writing natural and useful. Avoid generic introductions, inflated claims, keyword stuffing, and unnecessary sections.
4. Explain the problem, the practical example, when to use it, and important limitations. Include security, cost, performance, maintainability, or scalability only when relevant.
5. Use one descriptive page title from frontmatter; do not add an H1 inside the Markdown body.
6. Label fenced code blocks with the correct language and keep samples minimal and safe.
7. Link to primary sources when a claim benefits from verification.

## Article file

Create one lowercase, hyphenated Markdown file in `src/content/articles/`. Use this frontmatter:

```yaml
---
title: "Clear, specific title"
description: "A useful search description between 70 and 170 characters."
publishedDate: YYYY-MM-DD
category: "One approved category"
tags: ["two", "relevant-tags"]
featured: false
draft: false
---
```

Approved categories:

- `.NET & C#`
- `Azure & Cloud`
- `AI Architecture`
- `Software Architecture`
- `SQL Server`
- `Angular & Web`
- `Career & Leadership`
- `Entrepreneurship`
- `Learning Notes`

Use `featured: true` only when explicitly requested or when replacing the current homepage feature is clearly intended.

## Quality gate

Before publishing, run:

```bash
npm ci
npm run build
```

The build includes article validation. Fix all errors before committing. Check that new internal links resolve and that the article contains no placeholders.

## Publishing

When the user requests immediate publication, commit the new article to `main` with a message such as `Publish article: <title>`. The existing GitHub Pages workflow deploys the site and automatically refreshes the homepage feed, article archive, related articles, RSS, and sitemap.

When review is requested, provide the polished draft without committing until approval.
