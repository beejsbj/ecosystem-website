import { showcaseOevProtocols } from "~/server/data/showcaseOev";

export default defineEventHandler(async (event) => {
  try {
    const { protocolId }: any = getQuery(event);

    if (!protocolId) {
      event.node.res.statusCode = 400;
      return {
        code: "ERROR",
        message: "Invalid protocolId in query params",
      };
    }

    const protocol = showcaseOevProtocols.find((item) => item.slug === protocolId);

    if (!protocol) {
      event.node.res.statusCode = 404;
      return {
        code: "ERROR",
        message: "No showcase data found for the given query params",
      };
    }

    event.node.req.statusCode = 200;
    return {
      totalLiquidatedCollateralUSD: protocol.totalLiquidated,
      totalSentToBuilderUSD: protocol.totalSentToBuilderUSD,
      totalMadeBySearcherUSD: protocol.totalProfitUSD,
      totalTxCostUSD: 0,
      totalOevLostUSD: protocol.totalOevLostUSD,
    };
  } catch (err: any) {
    console.log("fetch total oev lost error ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
