import { OevTotal } from "~/server/models/OevTotal";
import { cacheInterval, queryCache } from "~/server/services/cache";
import { checkConnection } from "~/server/utils/checkConnection";

export default checkConnection(
  defineEventHandler(async (event) => {
    try {
      const cacheKey = "oev-totals";
      let cachedData: any = queryCache.get(cacheKey);

      if (cachedData !== undefined) {
        event.node.res.statusCode = 200;

        return JSON.parse(cachedData);
      }

      const protocols = await OevTotal.find({});

      const filtered = protocols.filter(
        (protocol) => protocol.totalProfitUSD !== 0
      );

      // cache result with new queries
      queryCache.set(cacheKey, JSON.stringify(filtered), cacheInterval);

      event.node.req.statusCode = 200;
      return filtered;
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
