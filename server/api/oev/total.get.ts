import { cacheInterval, queryCache } from "~/server/services/cache";
import { getLiquidationModel } from "~/server/services/protocol-liquidation-data-extraction/db";

export default checkConnection(
  defineEventHandler(async (event) => {
    try {
      const { protocolId, fromDate, toDate }: any = getQuery(event);

      if (!protocolId) {
        event.node.res.statusCode = 400;
        return {
          code: "ERROR",
          message: "Invalid protocolId in query params",
        };
      }

      const cacheKey = `charts-${protocolId}-${fromDate}-${toDate}`;

      const cachedData: any = await queryCache.get(cacheKey);

      if (cachedData !== undefined) {
        event.node.res.statusCode = 200;
        console.log("getting from cache");
        return JSON.parse(cachedData);
      }

      const protocolSlug = protocolId?.toLowerCase();
      const LiquidationModel = getLiquidationModel(protocolSlug);
      console.log("liq model ", LiquidationModel);

      const startDate = new Date(fromDate);
      const endDate = new Date(toDate);

      console.log({ startDate, endDate });

      const result = await LiquidationModel.aggregate([
        {
          $addFields: {
            dateObj: {
              $dateFromString: { dateString: "$date", format: "%m/%d/%Y" },
            },
            liquidatedCollateralUSDNum: {
              $toDouble: "$liquidatedCollateralUSD",
            },
            totalSentToBuilderUSDNum: {
              $toDouble: "$sentToBuilderUSD",
            },
            totalMadeBySearcherUSDNum: {
              $toDouble: "$madeBySearcherUSD",
            },
            totalIncentiveUSDNum: {
              $toDouble: "$incentiveUSD",
            },
            totalTxCostUSDNum: {
              $toDouble: "$txCostUSD",
            },
          },
        },

        {
          $match: {
            dateObj: {
              $gte: startDate,
              $lte: endDate,
            },
          },
        },

        {
          $group: {
            _id: null,
            totalLiquidatedCollateralUSD: {
              $sum: "$liquidatedCollateralUSDNum",
            },
            totalSentToBuilderUSD: { $sum: "$totalSentToBuilderUSDNum" },
            totalMadeBySearcherUSD: { $sum: "$totalMadeBySearcherUSDNum" },
            totalIncentiveUSD: { $sum: "$totalIncentiveUSDNum" },
            totalTxCostUSD: { $sum: "$totalTxCostUSDNum" },
          },
        },
      ]);

      if (!result || result?.length === 0) {
        console.log({ protocolId });
        event.node.res.statusCode = 400;
        return {
          code: "ERROR",
          message: "No data found for the give query params",
        };
      }

      const response = {
        totalLiquidatedCollateralUSD: result?.[0]?.totalLiquidatedCollateralUSD,
        totalSentToBuilderUSD: result?.[0]?.totalSentToBuilderUSD,
        totalMadeBySearcherUSD: result?.[0]?.totalMadeBySearcherUSD,
        totalTxCostUSD: result?.[0]?.totalTxCostUSD,
        totalOevLostUSD: result?.[0]?.totalIncentiveUSD,
      };

      queryCache.set(cacheKey, JSON.stringify(response), cacheInterval);

      event.node.req.statusCode = 200;
      return response;
    } catch (err: any) {
      console.log("fetch total oev lost  error  ", err);
      event.node.req.statusCode = 500;
      return {
        code: "ERROR",
        message: "Something went wrong.",
      };
    }
  })
);
