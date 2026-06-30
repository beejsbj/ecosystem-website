import { parseMarkdown } from "@/utils/parseMarkdown";
import { getShowcaseArticle } from "~/server/data/showcaseArticles";

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

    const fixture = getShowcaseArticle(articleSlug);

    if (!fixture) {
      event.node.res.statusCode = 404;
      return {
        code: "ARTICLE_NOT_FOUND",
        message: `Article not found `,
      };
    }

    const parsedMd = await parseMarkdown({ content: fixture.markdown });
    const { markdown, ...article } = fixture;

    event.node.res.statusCode = 200;
    return { ...article, content: parsedMd?.body };
  } catch (err) {
    console.dir("get article by id error ", err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
