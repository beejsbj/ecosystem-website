import { cacheInterval, queryCache } from "~/server/services/cache";
import { getGuideCodeWithSteps, getGuides } from "~/server/services/github";

export default defineEventHandler(async (event) => {
  try {
    const {}: any = getQuery(event);

    let guides: any[] | undefined = queryCache.get("guides");

    if (guides === undefined) {
      guides = await getGuides();
      queryCache.set("guides", guides, cacheInterval);
    }

    event.node.req.statusCode = 200;
    return { guides: guides };
  } catch (err: any) {
    console.log("get guides  error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Failed to fetch guides",
    };
  }
});
