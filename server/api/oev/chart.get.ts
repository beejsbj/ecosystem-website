import { getShowcaseOevChart } from "~/server/data/showcaseOev";

export default defineEventHandler(async (event) => {
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

    event.node.req.statusCode = 200;
    return getShowcaseOevChart(protocolId, period);
  } catch (err: any) {
    console.log("fetch chart data error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
