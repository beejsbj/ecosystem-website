import { ArticleUpvote } from "~/server/models/ArticleUpvote";
import { Article } from "~/server/models/Article";

export default defineEventHandler(async (event) => {
  const articleSlug = event.context?.params?.slug;
  const clientIp = event.node.req.headers?.["x-forwarded-for"];

  try {
    if (!articleSlug) {
      event.node.res.statusCode = 400;
      return {
        code: "INVALID_TITLE",
        message: "Invalid article title",
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

    // Check if the IP has already upvoted the article in the last 24 hours
    const lastUpvote = await ArticleUpvote.findOne({
      ipAddress: clientIp,
      article: article.id,
      timestamp: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (!lastUpvote) {
      const newUpvote = new ArticleUpvote({
        ipAddress: clientIp,
        article: article.id,
      });
      await newUpvote.save();
      await Article.findByIdAndUpdate(article.id, { $inc: { upvotes: 1 } });
    }

    event.node.res.statusCode = 201;
    return {
      code: "OK",
      message: "Upvote success!",
    };
  } catch (err) {
    console.dir("article upvote: error ", err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Failed to handle upvote",
    };
  }
});
