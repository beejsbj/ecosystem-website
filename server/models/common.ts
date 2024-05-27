import mongoose from "mongoose";

const IndexingProgressSchema = new mongoose.Schema({
  protocol: { type: String, required: true },
  chainId: { type: Number, required: true },
  lastDocId: String,
  lastBlockNumber: String,
});

export const IndexingProgress = mongoose.model(
  "indexing_progress",
  IndexingProgressSchema
);

const LambdaStatusSchema = new mongoose.Schema({
  type: String,
  protocolIndex: Number,
  totalProtocols: Number,
});

export const LambdaStatusModel = mongoose.model(
  "lambdaStatus",
  LambdaStatusSchema
);

export const LiquidationSchema = new mongoose.Schema({
  date: String,
  timestamp: String,
  user: String,
  hash: String,
  liquidatedCollateralUSD: String,
  liquidatedCollateral: String,
  sentToBuilder: String,
  sentToBuilderUSD: String,
  collateralAsset: String,
  blockNumber: String,
  madeBySearcherUSD: String,
  incentiveUSD: String,
  txCostUSD: String,
  builder: String,
});

const LiquidationTotalSchema = new mongoose.Schema({
  slug: String,
  hide: Boolean,
  trueHide: Boolean,
  name: String,
  totalLiquidated: String,
  totalSentToBuilderUSD: String,
  totalProfitUSD: String,
  totalIncentiveUSD: String,
  oevRate: Number,
  withOEV: Number,
});

export const LiquidationTotalModel = mongoose.model(
  "liquidation_total",
  LiquidationTotalSchema
);

const LiquidationChartSchema = new mongoose.Schema({
  slug: { type: String, required: true },
  period: { type: String, required: true },
  chainId: { type: Number, required: true },
  data: [[String, Number, Number, Number, Number]],
});

export const LiquidationChartModel = mongoose.model(
  "liquidation_chart",
  LiquidationChartSchema
);
