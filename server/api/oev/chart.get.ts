import {
  prepareAllLiquidationChart,
  prepareSingleLiquidationChart,
} from "~/server/services/oev-parser/oev";
import { OevChart } from "~/server/models/OevChart";
import { queryCache, cacheInterval } from "~/server/services/cache";

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
    const cached = queryCache.get(`charts-${protocolId}-${period}`);
    let result;
    if (!cached) {
      result = await OevChart.findOne({ id: protocolId, period });
      queryCache.set(`charts-${protocolId}-${period}`, result, cacheInterval);
    }
    result = cached;

    if (!result) {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Chart not found for the given protocolId and period",
      };
    }

    event.node.req.statusCode = 200;
    return result?.data;
  } catch (err: any) {
    console.log("fetch articles error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
