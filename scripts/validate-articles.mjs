import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const articlesDirectory = new URL("../src/content/articles/", import.meta.url);
const approvedCategories = new Set([
  ".NET & C#",
  "Azure & Cloud",
  "AI Architecture",
  "Software Architecture",
  "SQL Server",
  "Angular & Web",
  "Career & Leadership",
  "Entrepreneurship",
  "Learning Notes",
]);

const files = (await readdir(articlesDirectory)).filter((file) => /\.mdx?$/.test(file));
const errors = [];

const scalar = (frontmatter, key) => {
  const match = frontmatter.match(new RegExp(`^${key}:\\s*["']?([^"'\\n]+)["']?\\s*$`, "m"));
  return match?.[1].trim() ?? "";
};

for (const file of files) {
  const content = await readFile(new URL(file, articlesDirectory), "utf8");
  const document = content.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);

  if (!document) {
    errors.push(`${file}: missing valid YAML frontmatter`);
    continue;
  }

  const [, frontmatter, body] = document;
  const title = scalar(frontmatter, "title");
  const description = scalar(frontmatter, "description");
  const publishedDate = scalar(frontmatter, "publishedDate");
  const category = scalar(frontmatter, "category");
  const tags = frontmatter.match(/^tags:\s*\[([^\]]*)\]\s*$/m)?.[1]
    .split(",")
    .map((tag) => tag.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean) ?? [];

  if (title.length < 15 || title.length > 75) errors.push(`${file}: title must contain 15–75 characters`);
  if (description.length < 70 || description.length > 170) errors.push(`${file}: description must contain 70–170 characters`);
  if (!/^\d{4}-\d{2}-\d{2}$/.test(publishedDate) || Number.isNaN(Date.parse(`${publishedDate}T00:00:00Z`))) errors.push(`${file}: publishedDate must use YYYY-MM-DD`);
  if (!approvedCategories.has(category)) errors.push(`${file}: category "${category}" is not approved`);
  if (tags.length < 2) errors.push(`${file}: add at least two relevant tags`);
  if (/^#\s+/m.test(body)) errors.push(`${file}: do not add an H1 inside the article body`);
  if ((body.match(/```/g) ?? []).length % 2 !== 0) errors.push(`${file}: code fences are not balanced`);
  if (/\b(TODO|TBD|lorem ipsum|replace me)\b/i.test(content)) errors.push(`${file}: unresolved placeholder text found`);

  const slug = path.basename(file, path.extname(file));
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) errors.push(`${file}: filename must be lowercase and hyphenated`);
}

if (errors.length) {
  console.error(`Article validation failed with ${errors.length} issue(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(`Article validation passed for ${files.length} article(s).`);
