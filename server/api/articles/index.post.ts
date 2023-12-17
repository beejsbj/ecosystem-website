import { Article } from "~/server/models/Article";
import { authenticated } from "../../utils/authenticated";
import { imageUploadHandler } from "../../utils/imageUpload";
import { ROLE, UPLOAD_TYPE } from "~/server/types";
import { ArticleType } from "server/types/Article";
import slug from "slug";

export default authenticated(
  imageUploadHandler(
    defineEventHandler(async (event: any) => {
      try {
        const { article } = await (event.node?.req?.body || readBody(event));

        const articleData = JSON.parse(article);

        let coverImage;
        if (!event.node.req?.files?.cover?.[0]?.location) {
          // check cover image is available in parsed markdown
          coverImage = articleData?.image;
        } else {
          coverImage = event.node.req?.files?.cover?.[0]?.location;
        }

        // extract article metadata
        const articlePayload: ArticleType = {
          slug: slug(articleData.title),
          title: articleData.title,
          subtitle: articleData.subtitle,
          description: articleData.description,
          author: { name: articleData.author, bio: articleData?.bio },
          content: articleData.body,
          cover: coverImage,
          category: articleData.category,
          created_at: new Date(),
        };

        // check if an article with same title already exists
        const existingArticle = await Article.findOne({
          slug: articlePayload.slug,
        });

        if (existingArticle) {
          event.node.res.statusCode = 401;
          return {
            code: "ERROR",
            message: "Article with same title already exists",
          };
        }

        const articleCreated = await new Article(articlePayload).save();

        if (!articleCreated.id) {
          event.node.res.statusCode = 401;
          return {
            code: "ERROR",
            message: "Failed to save article in db.",
          };
        }

        event.node.res.statusCode = 201;
        return { code: "OK", message: "Project submitted successfully!" };
      } catch (err: any) {
        console.log("add article error ", err);
        event.node.res.statusCode = 500;
        return {
          code: "ERROR",
          message: "Failed to add, Invalid markdown file!",
        };
      }
    }),
    UPLOAD_TYPE.article
  ),
  ROLE.MODERATOR
);
