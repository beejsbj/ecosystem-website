import fs from "fs";
import path from "path";
import {
  ROOT_FOLDER,
  combineLists,
  dataToCumulative,
  dataToMonthly,
  dataToWeekly,
  getAllChains,
  getOEV,
  getOEVRate,
  getTotalLiquidated,
  getTotalSentToBuilder,
} from "./helpers";
import { OevTotal } from "../../models/OevTotal";

async function readSingleProtocolRawData(file: string, chainId: string) {
  const folder = chainId;
  const folderPath = path.join(ROOT_FOLDER, folder);
  const jsonFile = path.join(folderPath, file);
  try {
    const jsonData = fs.readFileSync(jsonFile, "utf8");
    const parsedData = JSON.parse(jsonData);
    // Store the parsed data with file name as title and file content as body
    return parsedData;
  } catch (error) {
    console.error(`Error parsing JSON file ${jsonFile}:`, error);
    return null;
  }
}

async function readOevRawData(chains: string[]) {
  const result: any[] = [];

  try {
    // Read the list of folders in the root folder
    const folders = fs.readdirSync(ROOT_FOLDER);

    //   Iterate through each folder
    folders.forEach((folder) => {
      const folderPath = path.join(ROOT_FOLDER, folder);

      // Check if the item is a directory
      if (fs.statSync(folderPath).isDirectory() && chains.includes(folder)) {
        const files = fs.readdirSync(folderPath);
        files.forEach((file) => {
          // Read the JSON file in the directory
          const jsonFile = path.join(folderPath, file);
          if (file.endsWith(".json")) {
            const jsonData = fs.readFileSync(jsonFile, "utf8");
            try {
              const parsedData = JSON.parse(jsonData);
              // Store the parsed data with file name as title and file content as body
              result.push({ id: file, body: parsedData, chain: folder });
            } catch (error) {
              console.error(`Error parsing JSON file ${jsonFile}:`, error);
            }
          }
        });
      }
    });

    return result;
  } catch (error) {
    return null;
  }
}

export async function parseOevSnapshot() {
  const allChains = getAllChains();
  const raw = await readOevRawData(allChains);

  if (!raw) {
    return null;
  }

  const parsed = raw?.map((protocol, i) => {
    const newProtocol: any = {
      // Generate an id for each protocol by converting the first letter of the title to lowercase and concatenating the rest of the title
      id: protocol.id?.split(".json")?.[0] + "-" + protocol.body[0].chainId,
      name: protocol.body[0].name,
      icon: protocol.body[0].icon,
      chainId: protocol.body[0].chainId,
    };

    // Calculate additional properties for each protocol
    newProtocol.totalLiquidated = getTotalLiquidated(protocol.body);
    newProtocol.totalSentToBuilderUSD = getTotalSentToBuilder(protocol.body);
    newProtocol.oevRate = getOEVRate(newProtocol);
    newProtocol.withOEV = getOEV(newProtocol);

    return newProtocol;
  });

  const totalLiquidated = getTotalLiquidated(parsed);
  const totalSentToBuilderUSD = getTotalSentToBuilder(parsed);
  parsed.push({
    id: "total",
    name: "Total",
    chainId: 1,
    hide: true,
    trueHide: true,
    totalLiquidated: totalLiquidated,
    totalSentToBuilderUSD: totalSentToBuilderUSD,
    oevRate: getOEVRate({ totalLiquidated, totalSentToBuilderUSD }),
    withOEV: getOEV({ totalLiquidated, totalSentToBuilderUSD }),
  });

  // clear the database if parse data already exists

  await OevTotal.deleteMany({});
  // update each element of parsed to the database
  for (let i = 0; i < parsed.length; i++) {
    const protocol = parsed[i];
    // update the database
    await new OevTotal(protocol).save();
    console.log("Updated protocol: ", protocol);
  }
}

export const PERIOD = {
  daily: "daily",
  weekly: "weekly",
  monthly: "monthly",
  cumulative: "cumulative",
  // logarithmic: "logarithmic",
};

// [("daily", "weekly", "cumulative", "logarithmic")];
// return an array of nx3   [n][0] timestamp [n][1] liquidated [n][2] sent to builder
export async function prepareSingleLiquidationChart(
  file: string,
  chainId: string,
  period: string
) {
  const raw = await readSingleProtocolRawData(file, chainId);

  if (!raw) {
    return [];
  }

  if (period === PERIOD.daily) {
    const chartData = raw?.map((liquidation: any) => {
      return [
        liquidation?.date,
        Number(liquidation?.totalLiquidated),
        Number(liquidation?.totalSentToBuilderUSD),
      ];
    });

    return chartData;
  } else if (period === PERIOD.weekly) {
    const chartData = dataToWeekly(raw)?.map((liquidation: any) => {
      return [
        liquidation?.date,
        liquidation?.totalLiquidated,
        liquidation?.totalSentToBuilderUSD,
      ];
    });

    return chartData;
  } else if (period === PERIOD.monthly) {
    const chartData = dataToMonthly(raw)?.map((liquidation: any) => {
      return [
        liquidation?.date,
        liquidation?.totalLiquidated,
        liquidation?.totalSentToBuilderUSD,
      ];
    });

    return chartData;
  } else if (period === PERIOD.cumulative) {
    const chartData = dataToCumulative(raw)?.map((liquidation: any) => {
      return [
        liquidation?.date,
        liquidation?.totalLiquidated,
        liquidation?.totalSentToBuilderUSD,
      ];
    });

    return chartData;
  } else {
    // logarthmic
    return [];
  }
}

// return an array of nx3   [n][0] timestamp [n][1] liquidated [n][2] sent to builder
export async function prepareAllLiquidationChart(period: string) {
  const chains = getAllChains();
  const raw = await readOevRawData(chains);

  if (!raw) {
    return null;
  }

  const protocolList: any = raw?.map((protocol: any) => {
    return protocol?.body?.map((liquidation: any) => {
      return [
        liquidation?.date,
        Number(liquidation?.totalLiquidated),
        Number(liquidation?.totalSentToBuilderUSD),
      ];
    });
  });

  const combinedProtocolsDailyChartData = combineLists(protocolList);
  const combinedProtocolsRaw = combinedProtocolsDailyChartData?.map((liq) => {
    return {
      date: liq?.[0],
      totalLiquidated: liq?.[1],
      totalSentToBuilderUSD: liq?.[2],
    };
  });

  if (period === PERIOD.daily) {
    return combinedProtocolsDailyChartData;
  } else if (period === PERIOD.weekly) {
    const weeklyData = dataToWeekly(combinedProtocolsRaw)?.map(
      (liquidation: any) => {
        return [
          liquidation?.date,
          liquidation?.totalLiquidated,
          liquidation?.totalSentToBuilderUSD,
        ];
      }
    );

    return weeklyData;
  } else if (period === PERIOD.monthly) {
    const monthlyData = dataToMonthly(combinedProtocolsRaw)?.map(
      (liquidation: any) => {
        return [
          liquidation?.date,
          liquidation?.totalLiquidated,
          liquidation?.totalSentToBuilderUSD,
        ];
      }
    );

    return monthlyData;
  } else if (period === PERIOD.cumulative) {
    const combinedProtocolsRaw = combinedProtocolsDailyChartData?.map((liq) => {
      return {
        date: liq?.[0],
        totalLiquidated: liq?.[1],
        totalSentToBuilderUSD: liq?.[2],
      };
    });
    const cumulativeData = dataToCumulative(combinedProtocolsRaw)?.map(
      (liquidation: any) => {
        return [
          liquidation?.date,
          liquidation?.totalLiquidated,
          liquidation?.totalSentToBuilderUSD,
        ];
      }
    );

    return cumulativeData;
  } else {
    // logarithmic
    return [];
  }
}
