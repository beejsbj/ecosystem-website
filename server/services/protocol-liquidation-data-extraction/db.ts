import {
  IndexingProgress,
  LambdaStatusModel,
  LiquidationSchema,
  LiquidationChartModel,
  LiquidationTotalModel,
} from "~/server/models/common";
import type { Liquidation, LiquidationTotal } from "../types";
import config from "./config.json";
import { sleep } from "./contractCalls";
import mongoose from "mongoose";

export function getLiquidationModel(protocol: string) {
  return mongoose.model(`${protocol}-liquidations`, LiquidationSchema);
}

export async function getLastUpdateStatus(
  protocolIndex: number
): Promise<string | null | undefined> {
  try {
    const protocol = config.protocols[protocolIndex].protocolVersion;

    const result = await IndexingProgress.findOne({ protocol });

    return result?.lastDocId;
  } catch (error) {
    console.log("db read error getBlock", error);
    return undefined;
  }
}

export async function getLastProtocolIndex(): Promise<number | undefined> {
  try {
    const result = await LambdaStatusModel.findOne({ type: "protocolIndex" });

    if (!result || result.protocolIndex === null) {
      return undefined;
    }

    return result.protocolIndex;
  } catch (error) {
    console.log("db read error getLastProtocolIndex", error);
    return undefined;
  }
}

export async function updateIndexingProgress(
  lastDocId: string,
  lastBlockNumber: number,
  currentProtocolIndex: number
) {
  try {
    const protocol = config.protocols[currentProtocolIndex];

    const doc = await IndexingProgress.findOne({
      protocol: protocol.protocolVersion,
    });

    if (!doc) {
      await new IndexingProgress({
        lastDocId: lastDocId,
        chainId: protocol.chainId,
        lastBlockNumber: lastBlockNumber,
        protocol: protocol.protocolVersion,
      }).save();
    }

    await IndexingProgress.updateOne(
      { protocol: protocol.protocolVersion },
      { $set: { lastDocId: lastDocId, lastBlockNumber: lastBlockNumber } }
    );

    return true;
  } catch (error) {
    console.log("db write error updateBlock", error);
    return false;
  }
}

export async function updateLambdaProgress(currentProtocolIndex: number) {
  try {
    const doc = await LambdaStatusModel.findOne({ type: "protocolIndex" });

    if (!doc) {
      await new LambdaStatusModel({
        protocolIndex: currentProtocolIndex,
        type: "protocolIndex",
      }).save();
      return;
    }

    await LambdaStatusModel.updateOne(
      { type: "protocolIndex" },
      { $set: { protocolIndex: currentProtocolIndex } }
    );

    return true;
  } catch (error) {
    console.log("db write error updateBlock", error);
    return false;
  }
}

export async function updateLiquidationData(
  liquidation: Liquidation,
  currentProtocolIndex: number
) {
  try {
    // check if liquidation entry already exists update the entry or add new entry to table

    const protocol = config.protocols[currentProtocolIndex].protocolVersion;
    const Model = getLiquidationModel(protocol?.toLowerCase());

    const existingDoc = await Model.findOne({
      hash: liquidation.hash,
    });

    if (existingDoc) {
      console.log("Updating existing doc ");
      await Model.findByIdAndUpdate(existingDoc.id, { $set: liquidation });
      return true;
    }

    await new Model(liquidation).save();

    return true;
  } catch (error) {
    console.log("db write error updateBlock", error);
    // return false;
    await sleep(500);
    console.log("retying...");

    return updateLiquidationData(liquidation, currentProtocolIndex);
  }
}

/*
          ############   Liquidation stats generator db operations ###########
*/

// Calculate the OEV rate for a protocol
function getOEVRate(totalSentToBuilderUSD: string, totalLiquidatedUSD: string) {
  return Number(totalSentToBuilderUSD) / Number(totalLiquidatedUSD);
}

// Calculate the OEV for a protocol
function getOEV(totalLiquidatedUSD: string, totalSentToBuilderUSD: string) {
  return Number(totalLiquidatedUSD) - Number(totalSentToBuilderUSD);
}

export const PERIOD = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
  cumulative: "cumulative",
};

export async function getTotalLiquidated(LiquidationTable: any) {
  try {
    const totals = await LiquidationTable.aggregate([
      {
        $group: {
          _id: null,
          totalLiquidatedUSD: {
            $sum: { $toDouble: "$liquidatedCollateralUSD" },
          },
          totalSentToBuilderUSD: {
            $sum: { $toDouble: "$sentToBuilderUSD" },
          },
          totalMadeBySearcherUSD: {
            $sum: { $toDouble: "$madeBySearcherUSD" },
          },
          totalIncentiveUSD: {
            $sum: { $toDouble: "$incentiveUSD" },
          },
        },
      },
    ]);

    const totalLiquidated = totals?.[0]?.totalLiquidatedUSD;
    const totalSentToBuilderUSD = totals?.[0]?.totalSentToBuilderUSD;
    const totalProfitUSD = totals?.[0]?.totalMadeBySearcherUSD;
    const totalIncentiveUSD = totals?.[0]?.totalIncentiveUSD;

    return {
      totalLiquidated,
      totalSentToBuilderUSD,
      totalProfitUSD,
      totalIncentiveUSD,
    };
  } catch (error) {
    console.log("error in func getTotalLiquidated ", error);
    return {};
  }
}

export async function getCumulativeChartData(LiquidationTable: any) {
  try {
    const pipeline = [
      {
        $addFields: {
          dateObj: {
            $dateFromString: { dateString: "$date", format: "%m/%d/%Y" },
          },
        },
      },
      {
        $group: {
          _id: {
            year: { $year: "$dateObj" },
            month: { $month: "$dateObj" },
            day: { $dayOfMonth: "$dateObj" },
          },
          date: { $first: "$date" },
          totalLiquidatedCollateralUSD: {
            $sum: { $toDouble: "$liquidatedCollateralUSD" },
          },
          totalSentToBuilderUSD: { $sum: { $toDouble: "$sentToBuilderUSD" } },
          totalMadeBySearcherUSD: { $sum: { $toDouble: "$madeBySearcherUSD" } },
          totalIncentiveUSD: { $sum: { $toDouble: "$incentiveUSD" } },
        },
      },
      {
        $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
      },
      {
        $setWindowFields: {
          partitionBy: null,
          sortBy: { "_id.year": 1, "_id.month": 1, "_id.day": 1 },
          output: {
            cumulativeLiquidatedCollateralUSD: {
              $sum: "$totalLiquidatedCollateralUSD",
              window: { documents: ["unbounded", "current"] },
            },
            cumulativeSentToBuilderUSD: {
              $sum: "$totalSentToBuilderUSD",
              window: { documents: ["unbounded", "current"] },
            },
            cumulativeMadeBySearcherUSD: {
              $sum: "$totalMadeBySearcherUSD",
              window: { documents: ["unbounded", "current"] },
            },
            cumulativeIncentiveUSD: {
              $sum: "$totalIncentiveUSD",
              window: { documents: ["unbounded", "current"] },
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          date: 1,
          cumulativeLiquidatedCollateralUSD: 1,
          cumulativeSentToBuilderUSD: 1,
          cumulativeMadeBySearcherUSD: 1,
          cumulativeIncentiveUSD: 1,
        },
      },
    ];

    const cumulativeData = await LiquidationTable.aggregate(pipeline);

    const cumulative = cumulativeData.map((el: any) => {
      return [
        new Date(el.date).toLocaleDateString(),
        el.cumulativeLiquidatedCollateralUSD,
        el.cumulativeSentToBuilderUSD,
        el.cumulativeMadeBySearcherUSD,
        el.cumulativeIncentiveUSD,
      ];
    });

    return cumulative;
  } catch (error) {
    console.log("getCumulativeChartData aggregation error ", error);
    return [];
  }
}

export async function getChartData(LiquidationTable: any) {
  try {
    const pipeline = (groupBy: any) => [
      {
        $addFields: {
          dateObj: {
            $dateFromString: { dateString: "$date", format: "%m/%d/%Y" },
          },
        },
      },
      {
        $group: {
          _id: groupBy,
          totalLiquidatedCollateralUSD: {
            $sum: { $toDouble: "$liquidatedCollateralUSD" },
          },
          totalSentToBuilderUSD: { $sum: { $toDouble: "$sentToBuilderUSD" } },
          totalMadeBySearcherUSD: { $sum: { $toDouble: "$madeBySearcherUSD" } },
          totalIncentiveUSD: { $sum: { $toDouble: "$incentiveUSD" } },
        },
      },
      {
        $project: {
          _id: 0,
          date: "$_id",
          totalLiquidatedCollateralUSD: 1,
          totalSentToBuilderUSD: 1,
          totalMadeBySearcherUSD: 1,
          totalIncentiveUSD: 1,
        },
      },
      {
        $sort: { date: 1 },
      },
    ];

    const dailyPipeline = pipeline({
      year: { $year: "$dateObj" },
      month: { $month: "$dateObj" },
      day: { $dayOfMonth: "$dateObj" },
    });

    const weeklyPipeline = pipeline({
      year: { $year: "$dateObj" },
      week: { $isoWeek: "$dateObj" },
    });

    const monthlyPipeline = pipeline({
      year: { $year: "$dateObj" },
      month: { $month: "$dateObj" },
    });

    const dailyData = await LiquidationTable.aggregate(dailyPipeline);
    const weeklyData = await LiquidationTable.aggregate(weeklyPipeline);
    const monthlyData = await LiquidationTable.aggregate(monthlyPipeline);

    const daily = dailyData.map((el: any) => {
      return [
        `${el.date.month}/${el.date.day}/${el.date.year}`,
        el.totalLiquidatedCollateralUSD,
        el.totalSentToBuilderUSD,
        el.totalMadeBySearcherUSD,
        el.totalIncentiveUSD,
      ];
    });

    function getDateFromYearAndWeek(year: number, week: number) {
      const jan1 = new Date(year, 0, 1);
      const daysOffset = (week - 1) * 7;
      const jan1Day = jan1.getDay();
      const firstWeekDay = jan1Day > 0 ? jan1Day - 1 : 6; // Adjust to start from Monday
      const daysToFirstThursday = 4 - firstWeekDay; // Thursday in the first week
      const firstThursday = new Date(year, 0, daysToFirstThursday + 1);
      const targetDate = new Date(firstThursday);
      targetDate.setDate(firstThursday.getDate() + daysOffset);
      return new Date(targetDate).toLocaleDateString();
    }

    const weekly = weeklyData.map((el: any) => {
      return [
        getDateFromYearAndWeek(el.date.year, el.date.week),
        el.totalLiquidatedCollateralUSD,
        el.totalSentToBuilderUSD,
        el.totalMadeBySearcherUSD,
        el.totalIncentiveUSD,
      ];
    });

    function getDateFromYearAndMonth(year: number, month: number) {
      // Ensure month is within range (0-11)
      const normalizedMonth = Math.max(0, Math.min(11, month - 1));
      return new Date(year, normalizedMonth).toLocaleDateString();
    }
    const monthly = monthlyData.map((el: any) => {
      return [
        getDateFromYearAndMonth(el.date.year, el.date.month),
        el.totalLiquidatedCollateralUSD,
        el.totalSentToBuilderUSD,
        el.totalMadeBySearcherUSD,
        el.totalIncentiveUSD,
      ];
    });

    return { daily, weekly, monthly };
  } catch (error) {
    console.log("error in func getChartData ", error);
    return { daily: [], weekly: [], monthly: [] };
  }
}

function combineArraysByDate(
  arrays: Array<Array<[string, ...number[]]>>
): Array<[string, ...number[]]> {
  const combined: { [key: string]: number[] } = {};

  arrays.forEach((array) => {
    array.forEach(([date, ...values]) => {
      if (!combined[date]) {
        combined[date] = [...values]; // If date doesn't exist, initialize with current values
      } else {
        combined[date] = combined[date].map(
          (value, index) => value + values[index]
        ); // Add values if date exists
      }
    });
  });

  // Convert the combined object back to an array of arrays
  let totals: any = Object.entries(combined).map(([date, values]) => [
    date,
    ...values,
  ]);

  totals = totals.sort(
    (a: (string | number | Date)[], b: (string | number | Date)[]): number =>
      new Date(a[0]).getTime() - new Date(b[0]).getTime()
  );
  return totals;
}

export async function prepareCombinedLiquidationChart(
  dailyCharts: any[],
  weeklyCharts: any[],
  monthlyCharts: any[],
  cumulativeCharts: any[]
) {
  // prepare totals for each

  const dailyItems = dailyCharts.map((el) => el.data);
  const weeklyItems = weeklyCharts.map((el) => el.data);
  const monthlyItems = monthlyCharts.map((el) => el.data);
  const cumulativeItems = cumulativeCharts.map((el) => el.data);

  // const dailyTotals = combineArraysByDate(dailyItems);

  // console.log({ monthlyItems });

  const dailyTotals = combineArraysByDate(dailyItems);
  const weeklyTotals = combineArraysByDate(weeklyItems);
  const monthlyTotals = combineArraysByDate(monthlyItems);
  const cumulativeTotals = combineArraysByDate(cumulativeItems);

  const totalPayloads = [];

  totalPayloads.push({
    slug: "Total",
    period: "daily",
    chainId: 1,
    data: dailyTotals,
  });
  totalPayloads.push({
    slug: "Total",
    period: "weekly",
    chainId: 1,
    data: weeklyTotals,
  });
  totalPayloads.push({
    slug: "Total",
    period: "monthly",
    chainId: 1,
    data: monthlyTotals,
  });
  totalPayloads.push({
    slug: "Total",
    period: "cumulative",
    chainId: 1,
    data: cumulativeTotals,
  });

  return totalPayloads;
}
export async function prepareSingleLiquidationChart() {
  const protocols = await IndexingProgress.find({});

  const LiquidationModels = protocols.map((el) =>
    getLiquidationModel(el.protocol?.toLowerCase())
  );

  const chartPromises = LiquidationModels.map((el) => getChartData(el));

  const charts = await Promise.all(chartPromises);

  const dailyCharts = protocols.map((el, i) => {
    return {
      slug: el.protocol,
      period: "daily",
      chainId: el.chainId,
      data: charts[i].daily,
    };
  });

  const weeklyCharts = protocols.map((el, i) => {
    return {
      slug: el.protocol,
      period: "weekly",
      chainId: el.chainId,
      data: charts[i].weekly,
    };
  });
  const monthlyCharts = protocols.map((el, i) => {
    return {
      slug: el.protocol,
      period: "monthly",
      chainId: el.chainId,
      data: charts[i].monthly,
    };
  });

  const cumulativePromises = LiquidationModels.map((el) =>
    getCumulativeChartData(el)
  );

  const cumulativeResults = await Promise.all(cumulativePromises);

  const cumulativeCharts = protocols.map((el, i) => {
    return {
      slug: el.protocol,
      period: "cumulative",
      chainId: el.chainId,
      data: cumulativeResults[i],
    };
  });

  const combinedCharts = await prepareCombinedLiquidationChart(
    dailyCharts,
    weeklyCharts,
    monthlyCharts,
    cumulativeCharts
  );

  return {
    dailyCharts,
    weeklyCharts,
    monthlyCharts,
    cumulativeCharts,
    combinedCharts,
  };
}

export async function batchUpdateCharts(charts: any[]) {
  try {
    for (let i = 0; i < charts.length; i++) {
      const chart = charts[i];
      const filter = {
        slug: chart.slug,
        period: chart.period,
        chainId: chart.chainId,
      };
      const existingDoc = await LiquidationChartModel.findOne(filter);

      if (existingDoc) {
        await LiquidationChartModel.findByIdAndUpdate(existingDoc.id, {
          $set: { data: chart.data },
        });
      } else {
        await new LiquidationChartModel(chart).save();
      }
    }

    console.log("Batch write successful:");
  } catch (error) {
    console.log("db error batchUpdateCharts");
  }
}

export async function prepareLiquidationTotals(): Promise<LiquidationTotal[]> {
  try {
    const indexingProtocols: any[] = await IndexingProgress.find({});

    if (indexingProtocols.length === 0) {
      console.log("no protocols found to parse");
      return [];
    }

    const allProtocols: LiquidationTotal[] = [];
    for (let i = 0; i < indexingProtocols.length; i++) {
      const LiquidationTable = getLiquidationModel(
        indexingProtocols[i].protocol?.toLowerCase()
      );

      const protocolConfig: any = config.protocols.find(
        (el) => el.protocolVersion === indexingProtocols[i].protocol
      );

      if (!protocolConfig) {
        throw Error(
          "Invalid protocol version in config ",
          indexingProtocols[i]
        );
      }

      const newProtocol: any = {
        slug: protocolConfig.protocolVersion + "-" + protocolConfig.chainId,
        hide: true,
        name: protocolConfig.name,
        icon: protocolConfig.icon,
        chainId: protocolConfig.chainId,
      };

      // Calculate additional properties for each protocol
      const totals: any = await getTotalLiquidated(LiquidationTable);
      newProtocol.totalLiquidated = totals.totalLiquidated;
      newProtocol.totalSentToBuilderUSD = totals.totalSentToBuilderUSD;
      newProtocol.totalProfitUSD = totals.totalProfitUSD;
      newProtocol.totalIncentiveUSD = totals.totalIncentiveUSD;
      newProtocol.oevRate = getOEVRate(
        totals.totalSentToBuilderUSD,
        totals.totalLiquidated
      );
      newProtocol.withOEV = getOEV(
        totals.totalLiquidated,
        totals.totalSentToBuilderUSD
      );

      allProtocols.push(newProtocol);
    }

    // calculate total
    const totalLiquidated: string = allProtocols
      .reduce((sum, item) => sum + Number(item.totalLiquidated), 0)
      .toString();

    const totalSentToBuilderUSD = allProtocols
      .reduce((sum, item) => sum + Number(item.totalSentToBuilderUSD), 0)
      .toString();

    const totalProfitUSD = allProtocols
      .reduce((sum, item) => sum + Number(item.totalProfitUSD), 0)
      .toString();

    const totalIncentiveUSD = allProtocols
      .reduce((sum, item) => sum + Number(item.totalIncentiveUSD), 0)
      .toString();

    const totalItem = {
      slug: "total",
      hide: true,
      trueHide: true,
      name: "Total",
      icon: "none",
      chainId: 1,
      totalLiquidated,
      totalSentToBuilderUSD,
      totalProfitUSD,
      totalIncentiveUSD,
      oevRate: getOEVRate(totalSentToBuilderUSD, totalLiquidated),
      withOEV: getOEV(totalLiquidated, totalSentToBuilderUSD),
    };

    allProtocols.push(totalItem);

    return allProtocols;
  } catch (error) {
    console.log("db write error updateBlock", error);
    return [];
  }
}

export async function updateTotalsInDb(totals: LiquidationTotal[]) {
  try {
    const totalDocs = await LiquidationTotalModel.find({}).countDocuments();
    if (totalDocs > 0) {
      for (let i = 0; i < totals.length; i++) {
        const total = totals[i];
        const filter = { slug: total.slug };
        const existingDoc = await LiquidationTotalModel.findOne(filter);

        if (existingDoc) {
          await LiquidationTotalModel.findByIdAndUpdate(existingDoc.id, {
            $set: total,
          });
        } else {
          await new LiquidationTotalModel(total).save();
        }
      }
    } else {
      await LiquidationTotalModel.insertMany(totals);
    }

    console.log("Batch write totals successful:");
  } catch (error) {
    console.log("db write error updateTotalsInDb", error);
  }
}
