import BigNumber from "bignumber.js";
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

      const finalChartData = response.map((el) => {
        const sentToBuilderUSD = !el?.[2] ? 0 : el?.[2];
        const madeBySearcherUSD = !el?.[3] ? 0 : el?.[3];
        const totalOevLost = new BigNumber(sentToBuilderUSD)
          .plus(madeBySearcherUSD)
          .toString();
        const item: any[] = el?.toObject();

        return [...item, totalOevLost];
      });

      // cache result with new queries
      queryCache.set(cacheKey, JSON.stringify(finalChartData), cacheInterval);

      event.node.req.statusCode = 200;
      return finalChartData;
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
