import updateArticleView from "~/server/services/updateView";
import { View } from "../../../models/View";
import { Article } from "~/server/models/Article";

export default defineEventHandler(async (event) => {
  const articleSlug = event.context?.params?.slug;
  const clientIp = event.node.req.headers?.["x-forwarded-for"];

  try {
    if (!articleSlug) {
      event.node.res.statusCode = 400;
      return {
        code: "INVALID_SLUG",
        message: "Invalid article slug",
      };
    }
    const article = await Article.findOne({ slug: articleSlug });

    if (!article) {
      event.node.res.statusCode = 404;
      return {
        code: "ARTICLE_NOT_FOUND",
        message: `Article not found `,
      };
    }

    if (clientIp !== undefined) {
      await updateArticleView(clientIp, article.id);
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
