import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context) {
  const articles = (await getCollection("articles", ({ data }) => !data.draft))
    .sort((a, b) => b.data.publishedDate.valueOf() - a.data.publishedDate.valueOf());

  return rss({
    title: "Surya Tech Codex",
    description: "Practical .NET, Azure, AI architecture, career, and product-building notes.",
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedDate,
      link: `articles/${article.id}/`,
      categories: [article.data.category, ...article.data.tags],
    })),
  });
}
