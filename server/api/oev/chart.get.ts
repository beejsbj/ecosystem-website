import { LiquidationChartModel } from "~/server/models/common";
import { cacheInterval, queryCache } from "~/server/services/cache";

export default checkConnection(
  defineEventHandler(async (event) => {
    try {
      const { protocolId, period }: any = getQuery(event);

      if (!protocolId) {
        event.node.res.statusCode = 400;
        return {
          code: "ERROR",
          message: "Invalid protocolId in query params",
        };
      }

      if (protocolId?.split("-").length !== 2) {
        event.node.res.statusCode = 400;
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

      const result = await LiquidationChartModel.findOne({
        slug: protocolId?.split("-")?.[0],
        chainId: protocolId?.split("-")?.[1],
        period,
      });

      if (!result) {
        console.log({ protocolId });
        event.node.res.statusCode = 400;
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
      console.log("fetch chart data error  ", err);
      event.node.req.statusCode = 500;
      return {
        code: "ERROR",
        message: "Something went wrong.",
      };
    }
  })
);
