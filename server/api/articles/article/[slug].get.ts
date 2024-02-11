import axios from "axios";
import { parseMarkdown } from "@/utils/parseMarkdown";
import { cacheInterval, queryCache } from "~/server/services/cache";

export default defineEventHandler(async (event) => {
  const articleSlug = event.context?.params?.slug;

  try {
    if (!articleSlug) {
      event.node.res.statusCode = 400;
      return {
        code: "INVALID_SLUG",
        message: "Invalid article slug",
      };
    }

    const repoOwner = "api3-ecosystem";
    const repoName = "ecosystem-markdown-articles";
    let article = queryCache.get(`article-${articleSlug}`);

    if (article === undefined) {
      const downloadUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/master/${articleSlug}/index.md`;
      const articleMd = (await axios.get(downloadUrl)).data;

      if (!articleMd) {
        event.node.res.statusCode = 404;
        return {
          code: "ARTICLE_NOT_FOUND",
          message: `Article not found `,
        };
      }
      const parsedMd = await parseMarkdown({ content: articleMd });

      article = {
        author: {
          name: parsedMd?.author,
          bio: parsedMd?.bio,
        },
        title: parsedMd?.title,
        slug: articleSlug,
        subtitle: parsedMd?.subtitle,
        description: parsedMd?.description,
        content: parsedMd?.body,
        cover: parsedMd?.image,
        category: parsedMd?.category,
        created_at: parsedMd?.date_published,
      };

      queryCache.set(`article-${articleSlug}`, article, cacheInterval);
    }

    if (!article) {
      event.node.res.statusCode = 404;
      return {
        code: "ARTICLE_NOT_FOUND",
        message: `Article not found `,
      };
    }

    event.node.res.statusCode = 200;
    return article;
  } catch (err) {
    console.dir("get article by id error ", err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
