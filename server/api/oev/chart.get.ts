import { OevChart } from "~/server/models/OevChart";
import { cacheInterval, queryCache } from "~/server/services/cache";

export default defineEventHandler(async (event) => {
  try {
    const { protocolId, period, type, fromDate, toDate }: any = getQuery(event);

    if (!protocolId) {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Invalid protocolId in query params",
      };
    }

    const cacheKey = `charts-${protocolId}-${period}-${type}`;

    const cachedData: any = await queryCache.get(cacheKey);

    // if (cachedData !== undefined) {
    //   event.node.res.statusCode = 200;
    //   console.log("getting from cache");
    //   return JSON.parse(cachedData);
    // }

    if (type === "total") {
      const result = await OevChart.findOne({
        id: protocolId,
        period: "daily",
      });

      const chartItems: any[] | undefined = result?.data;

      const fromIndex = chartItems?.findIndex(
        (el) => new Date(fromDate).getTime() >= new Date(el[0]).getTime()
      );
      const toIndex = chartItems?.findIndex(
        (el) => new Date(toDate).getTime() <= new Date(el[0]).getTime()
      );

      if (fromIndex === undefined || toIndex === undefined) {
        event.node.req.statusCode = 200;
        return {
          totalLiquidated: 0,
          totalSentToBuilder: 0,
          totalMadeBySearcher: 0,
          totalOevLost: 0,
        };
      }
      const filteredItem = chartItems?.slice(fromIndex, toIndex + 1);

      if (!filteredItem || !chartItems || filteredItem.length === 0) {
        event.node.req.statusCode = 200;
        return {
          totalLiquidated: 0,
          totalSentToBuilder: 0,
          totalMadeBySearcher: 0,
          totalOevLost: 0,
        };
      }

      const totalLiquidated = filteredItem.reduce((sum, el) => sum + el[1], 0);
      const totalSentToBuilder = filteredItem.reduce(
        (sum, el) => sum + el[2],
        0
      );
      const totalMadeBySearcher = filteredItem.reduce(
        (sum, el) => sum + el[3],
        0
      );
      const totalOevLost = filteredItem.reduce((sum, el) => sum + el[4], 0);
      // let totalOevLost = 0

      event.node.req.statusCode = 200;
      return {
        totalLiquidated,
        totalSentToBuilder,
        totalMadeBySearcher,
        totalOevLost,
      };
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
