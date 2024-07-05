import { LiquidationTotalModel } from "~/server/models/common";
import { checkConnection } from "~/server/utils/checkConnection";
import { useRouteCache } from "#nuxt-multi-cache/composables";
import BigNumber from "bignumber.js";

export default checkConnection(
  defineEventHandler(async (event) => {
    useRouteCache((helper) => {
      helper.setCacheable();
    }, event);

    try {
      const protocols = await LiquidationTotalModel.find({
        totalLiquidated: { $gt: 0 },
      });

      const formattedTotals = protocols.map((el) => {
        return {
          ...el.toJSON(),
          totalOevLostUSD: new BigNumber(el.totalProfitUSD || 0)
            .plus(el.totalSentToBuilderUSD || 0)
            .toString(),
        };
      });

      event.node.req.statusCode = 200;
      return formattedTotals;
    } catch (err: any) {
      console.log("fetch oev totals data error  ", err);
      event.node.req.statusCode = 500;
      return {
        code: "ERROR",
        message: "Something went wrong.",
      };
    }
  })
);
