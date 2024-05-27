import { queryCache } from "../cache";
import type { LiquidationTotal } from "../types";
import {
  batchUpdateCharts,
  prepareLiquidationTotals,
  prepareSingleLiquidationChart,
  updateTotalsInDb,
} from "./db";

export const prepareStats = async (cacheKey: string) => {
  console.log("####### Starting Indexer ##########");

  const totals: LiquidationTotal[] = await prepareLiquidationTotals();

  const {
    dailyCharts,
    weeklyCharts,
    monthlyCharts,
    cumulativeCharts,
    combinedCharts,
  } = await prepareSingleLiquidationChart();
  // const charts: any[] = [];
  // const table = getLiquidationModel("aavev3");
  // await getCumulativeData(table);
  // console.log({  });

  // update totals in db

  console.log("##### Updating totals ########");
  await updateTotalsInDb(totals);

  console.log("##### Updating Daily charts ########");
  await batchUpdateCharts(dailyCharts);
  console.log("##### Updating Weekly charts ########");
  await batchUpdateCharts(weeklyCharts);
  console.log("##### Updating Monthly charts ########");
  await batchUpdateCharts(monthlyCharts);
  console.log("##### Updating Cumulative charts ########");
  await batchUpdateCharts(cumulativeCharts);
  console.log("##### Updating Combined charts ########");
  await batchUpdateCharts(combinedCharts);

  // update charts in db

  console.log("########### All Stats updated ##############");

  queryCache.del(cacheKey);

  return {
    message: "Stats updated",
    cumulativeCharts,
  };
};
