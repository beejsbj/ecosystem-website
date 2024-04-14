import { OevChart } from "~/server/models/OevChart";
import { cacheInterval, queryCache } from "~/server/services/cache";

export default defineEventHandler(async (event) => {
  try {
    const { protocolId, period }: any = getQuery(event);

    if (!protocolId) {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Invalid protocolId in query params",
      };
    }

    const cacheKey = `charts-${protocolId}-${period}`;

    const cachedData: any = await queryCache.get(cacheKey);

    if (cachedData !== undefined) {
      event.node.res.statusCode = 200;
      console.log("getting from cache");
      return JSON.parse(cachedData);
    }

    const result = await OevChart.findOne({ id: protocolId, period });

    if (!result) {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Chart not found for the given protocolId and period",
      };
    }

    const response = result.data;
    // cache result with new queries
    queryCache.set(cacheKey, JSON.stringify(response), cacheInterval);

    event.node.req.statusCode = 200;
    return response;
  } catch (err: any) {
    console.log("fetch articles error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
