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
  console.log("####### Starting Indexer ##########");

  const lastCheckedProtocolIndex = await getLastProtocolIndex();

  if (lastCheckedProtocolIndex === undefined) {
    throw Error("Failed to read last checked protocol index from db");
  }

  const currentProtocolIndex =
    lastCheckedProtocolIndex >= 0 ? (lastCheckedProtocolIndex + 1) % 14 : 0;

  console.log(
    `######### Indexing Protocol ${config.protocols[currentProtocolIndex].name}  Chain: ${config.protocols[currentProtocolIndex].chainId} ###############`
  );

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
  console.log({ liquidations, nextLastDocId });
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
  console.log({ finalLiquidationData });

  console.log(
    `######### Updating ${finalLiquidationData.length} liquidations to db`
  );
  await doUpdate(finalLiquidationData, nextLastDocId, currentProtocolIndex);
  console.log("########### All liquidations updated ##############");

  queryCache.del(cacheKey);
  return {
    statusCode: 200,
    body: { message: "Liquidation data updated" },
  };
};
