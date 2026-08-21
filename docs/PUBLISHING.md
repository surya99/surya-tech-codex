# Publishing workflow

Surya Tech Codex is designed so that publishing does not require editing layouts, navigation, feeds, or deployment settings.

## What the publishing assistant receives

- Raw notes or a draft
- Preferred category
- Any code and source links
- Whether the article should be featured

## What the publishing assistant produces

1. A clear SEO title and description.
2. A URL-safe filename.
3. Valid article frontmatter.
4. Correct heading hierarchy.
5. Formatted and labelled code blocks.
6. Practical examples and trade-offs without unnecessary padding.
7. Relevant internal links and tags.
8. A Markdown file in `src/content/articles/`.

Pushing the file to `main` triggers the GitHub Pages workflow. Astro automatically updates the article archive, RSS feed, sitemap, related content, and homepage feed.

## Quality gate

- Technical claims are verified against primary documentation.
- The writing retains Surya's direct, practical voice.
- Code is minimal, safe, and syntactically correct.
- The article includes security, performance, cost, or scalability only when relevant.
- No confidential employer or client information is included.
- The production build must pass before publishing.

## Future automation

The final assistant workflow will accept article details in conversation, create the Markdown entry, run validation, commit it to GitHub, and verify the automatic deployment.
