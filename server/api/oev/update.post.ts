import { Article } from "~/server/models/Article";
import {
  parseOevSnapshot,
  prepareSingleLiquidationChart,
  prepareAllLiquidationChart,
} from "~/server/services/oev-parser/oev";
import { OevChart } from "~/server/models/OevChart";
import { OevTotal } from "~/server/models/OevTotal";
import type { ArticleType } from "~/server/types/Article";
import slug from "slug";

export default defineEventHandler(async (event: any) => {
  try {
    // check if origin is localhost
    if (event.node.req.rawHeaders?.[9] !== "localhost:3000") {
      event.node.res.statusCode = 401;
      return {
        code: "ERROR",
        message: "Unauthorized access",
      };
    }

    // update totals
    console.log("Updating snapshot...");
    await parseOevSnapshot();
    console.log("Snapshot updated!");

    const protocols = await OevTotal.find({});
    console.log("updating charts for each protocol...");

    // clean oev charts table
    await OevChart.deleteMany({});
    console.log("Starting single chart updates...");
    const periods = ["daily", "weekly", "monthly", "cumulative"];
    for (const protocol of protocols.slice(0, protocols.length - 1)) {
      const protocolId = protocol.id;
      const file = protocolId?.split("-")?.[0] + ".json";
      const chainId = protocolId?.split("-")?.[1];

      const results = await Promise.all([
        ...periods.map((period) =>
          prepareSingleLiquidationChart(file, chainId, period)
        ),
      ]);

      for (let i = 0; i < periods.length; i++) {
        console.log("Updating chart for ", protocolId, " ", periods[i]);
        await new OevChart({
          id: protocolId,
          period: periods[i],
          data: results[i],
        }).save();
      }
    }
    console.log("Charts updated!");

    console.log("updating total chart...");

    const results = await Promise.all([
      ...periods.map((period) => prepareAllLiquidationChart(period)),
    ]);

    for (let i = 0; i < periods.length; i++) {
      console.log("Updating total chart for ", periods[i]);
      await new OevChart({
        id: "all",
        period: periods[i],
        data: results[i],
      }).save();
    }
    console.log("Total chart updated!");
    event.node.res.statusCode = 201;
    return { code: "OK", message: "All oev data synced with files!" };
  } catch (err: any) {
    console.log("Update error ", err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Failed to update OEV data!",
    };
  }
});
