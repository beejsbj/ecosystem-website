import { queryCache } from "~/server/services/cache";
import { prepareStats } from "~/server/services/protocol-liquidation-data-extraction/statsHandler";
import { ROLE } from "~/server/types";

export default authenticated(
  checkConnection(
    defineEventHandler(async (event) => {
      const cacheKey = `stats-syncing`;
      try {
        let cachedData: any = queryCache.get(cacheKey);

        if (cachedData !== undefined) {
          event.node.res.statusCode = 200;
          return { message: "Stats sync is already in progress" };
        }

        queryCache.set(cacheKey, "stats-syncing", 100000);

        await prepareStats(cacheKey);

        event.node.req.statusCode = 200;
        return { message: "Stats sync started" };
      } catch (err: any) {
        queryCache.del(cacheKey);
        console.log("fetch oev data error  ", err);
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
