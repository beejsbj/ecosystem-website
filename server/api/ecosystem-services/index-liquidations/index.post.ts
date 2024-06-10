import { queryCache } from "~/server/services/cache";
import { indexLiquidations } from "../../../services/protocol-liquidation-data-extraction/liquidationHandler";
import { ROLE } from "~/server/types";

export default authenticated(
  checkConnection(
    defineEventHandler(async (event) => {
      const cacheKey = `oev-data-indexing`;
      try {
        let cachedData: any = queryCache.get(cacheKey);

        if (cachedData !== undefined) {
          event.node.res.statusCode = 200;
          return { message: "Indexing is already in progress" };
        }

        queryCache.set(cacheKey, "Indexing", 100000);

        await indexLiquidations(cacheKey);

        event.node.req.statusCode = 200;
        return { message: "Indexing started" };
      } catch (err: any) {
        queryCache.del(cacheKey);
        console.log("/api/ecosystem-services/index-liquidation error  ", err);
        event.node.req.statusCode = 500;
        return {
          code: "ERROR",
          message: "Something went wrong.",
        };
      }
    })
  ),
  ROLE.SERVICE_WEBHOOK
);
