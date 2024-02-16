import {
  prepareAllLiquidationChart,
  prepareSingleLiquidationChart,
} from "~/server/services/oev-parser/oev";

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

    let result: any = [];

    if (protocolId !== "all") {
      const file = protocolId?.split("-")?.[0] + ".json";
      const chainId = protocolId?.split("-")?.[1];

      if (!chainId) {
        event.node.res.statusCode = 401;
        return {
          code: "ERROR",
          message: "Invalid ProtocolId in query params",
        };
      }

      if (!file) {
        event.node.res.statusCode = 401;
        return {
          code: "ERROR",
          message: "Invalid ProtocolId in query params",
        };
      }

      if (!period) {
        event.node.res.statusCode = 401;
        return {
          code: "ERROR",
          message: "Invalid period in query params",
        };
      }

      result = await prepareSingleLiquidationChart(file, chainId, period);
    } else {
      result = await prepareAllLiquidationChart(period);
    }

    event.node.req.statusCode = 200;
    return result;
  } catch (err: any) {
    console.log("fetch articles error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
