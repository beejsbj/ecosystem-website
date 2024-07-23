import { cacheInterval, queryCache } from "~/server/services/cache";
import { getGuideCodeWithSteps } from "~/server/services/github";

export default defineEventHandler(async (event) => {
  try {
    const {}: any = getQuery(event);

    const branch = "main";

    let commits: any[] | undefined = queryCache.get("guides");

    if (commits === undefined) {
      commits = await getGuideCodeWithSteps(branch);
      queryCache.set("guides", commits, cacheInterval);
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
