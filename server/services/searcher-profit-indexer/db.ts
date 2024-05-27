import {
  IndexingProgress,
  LambdaStatusModel,
  LiquidationSchema,
} from "~/server/models/common";
import type { Liquidation } from "../types";
import config from "./config.json";
import { sleep } from "./contractCalls";
import mongoose from "mongoose";

export function getLiquidationModel(currentProtocolIndex: number) {
  const protocol = config.protocols[currentProtocolIndex].protocolVersion;
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

    const Model = getLiquidationModel(currentProtocolIndex);

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
