import { showcaseArticleFixtures } from "~/server/data/showcaseArticles";

export default defineEventHandler(async (event) => {
  try {
    const { page }: any = getQuery(event);

    const _page = page || 1;

    const limit = _page * 10;
    const skips = (_page - 1) * 10;

    const articleListData = showcaseArticleFixtures.map(
      ({ markdown, ...article }) => article
    );

    const total = articleListData?.length;

    event.node.req.statusCode = 200;
    return { articles: articleListData?.slice(skips, limit), total };
  } catch (err: any) {
    console.log("fetch articles error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
