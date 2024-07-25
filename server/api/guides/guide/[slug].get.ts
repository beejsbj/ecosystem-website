import { cacheInterval, queryCache } from "~/server/services/cache";
import { getGuideCodeWithSteps } from "~/server/services/github";

export default defineEventHandler(async (event) => {
  try {
    const guideSlug = event.context?.params?.slug;

    if (!guideSlug) {
      event.node.res.statusCode = 400;
      return {
        code: "INVALID_SLUG",
        message: "Invalid guide slug",
      };
    }

    const branch = guideSlug;
    const cacheKey = `guide-steps-${branch}`;

    let commits: any[] | undefined = queryCache.get(cacheKey);

    if (commits === undefined) {
      commits = await getGuideCodeWithSteps(branch);
      queryCache.set(cacheKey, commits, cacheInterval);
    }

    event.node.req.statusCode = 200;
    return { steps: commits };
  } catch (err: any) {
    console.log("get tutorial guide steps  error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Failed to fetch guides",
    };
  }
});
