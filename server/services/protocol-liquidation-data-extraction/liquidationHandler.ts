import { prepareFinalLiquidationData } from "./contractCalls";
import {
  updateLiquidationData,
  getLastUpdateStatus,
  getLastProtocolIndex,
  updateIndexingProgress,
  updateLambdaProgress,
} from "./db";
import { fetchLiquidationDataFromGraph } from "./graph";
import config from "./config.json";
import type { Liquidation } from "../types";
import { queryCache } from "../cache";
import { connectDB } from "../helper";

async function doUpdate(
  liquidations: Liquidation[],
  lastDocId: string,
  currentProtocolIndex: number
) {
  for (let i = 0; i < liquidations.length; i++) {
    const liquidationItem = liquidations[i];

    await updateLiquidationData(liquidationItem, currentProtocolIndex);
  }

  // update block sync status in db
  await updateIndexingProgress(
    lastDocId,
    liquidations[liquidations.length - 1].blockNumber,
    currentProtocolIndex
  );
  await updateLambdaProgress(currentProtocolIndex);
}

export const indexLiquidations = async (cacheKey: string) => {
  console.log("####### Starting Liquidation Extraction ##########");

  await connectDB();

  const lastCheckedProtocolIndex = await getLastProtocolIndex();

  if (lastCheckedProtocolIndex === undefined) {
    throw Error("Failed to read last checked protocol index from db");
  }

  let currentProtocolIndex =
    lastCheckedProtocolIndex >= 0 ? (lastCheckedProtocolIndex + 1) % 14 : 0;

  console.log(
    `######### Indexing Protocol ${config.protocols[currentProtocolIndex].name}  Chain: ${config.protocols[currentProtocolIndex].chainId} ###############`
  );

  while (true) {
    if (!config.protocols[currentProtocolIndex].active) {
      console.log(
        `Inactive Protocol ${config.protocols[currentProtocolIndex].name} skipping `
      );
      await updateLambdaProgress(currentProtocolIndex);

      currentProtocolIndex = (currentProtocolIndex + 1) % 14;

      console.log(
        `######### Starting Protocol ${config.protocols[currentProtocolIndex].name}  Chain: ${config.protocols[currentProtocolIndex].chainId} ###############`
      );
    } else {
      break;
    }
  }

  const startTime =
    new Date(config.protocols[currentProtocolIndex].startDate).getTime() / 1000;

  const lastGraphDocId = await getLastUpdateStatus(currentProtocolIndex);

  console.log("Last synced status form db ", {
    lastGraphDocId,
    lastCheckedProtocolIndex,
  });

  const { liquidations, nextLastDocId } = await fetchLiquidationDataFromGraph(
    startTime,
    lastGraphDocId,
    currentProtocolIndex
  );
  console.log({ liquidationCount: liquidations.length, nextLastDocId });
  await connectDB();
  if (liquidations.length === 0) {
    await updateLambdaProgress(currentProtocolIndex);
    queryCache.del(cacheKey);
    return {
      statusCode: 200,
      body: { message: "Liquidations already upto date" },
    };
  }
  const finalLiquidationData = await prepareFinalLiquidationData(
    liquidations,
    currentProtocolIndex
  );

  console.log(
    `######### Updating ${finalLiquidationData.length} liquidations to db`
  );
  await connectDB();
  await doUpdate(finalLiquidationData, nextLastDocId, currentProtocolIndex);
  console.log("########### All liquidations updated ##############");

  queryCache.del(cacheKey);
  return {
    statusCode: 200,
    body: { message: "Liquidation data updated" },
  };
};
