import {
  prepareAllLiquidationChart,
  prepareSingleLiquidationChart,
} from "~/server/services/oev-parser/oev";
import { OevChart } from "~/server/models/OevChart";
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

    const result = await OevChart.findOne({ id: protocolId, period });

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
