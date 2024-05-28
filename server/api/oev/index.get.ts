import { OevTotal } from "~/server/models/OevTotal";
import { LiquidationTotalModel } from "~/server/models/common";
import { checkConnection } from "~/server/utils/checkConnection";
import { useRouteCache } from "#nuxt-multi-cache/composables";

export default checkConnection(
  defineEventHandler(async (event) => {
    useRouteCache((helper) => {
      helper.setCacheable();
    }, event);

    try {
      const protocols = await LiquidationTotalModel.find({
        totalLiquidated: { $gt: 0 },
      });

      event.node.req.statusCode = 200;
      return protocols;
    } catch (err: any) {
      console.log("fetch oev data error  ", err);
      event.node.req.statusCode = 500;
      return {
        code: "ERROR",
        message: "Something went wrong.",
      };
    }
  })
);
