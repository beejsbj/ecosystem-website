import mongoose from "mongoose";
const Schema = mongoose.Schema;
/**
 * Oev charts for each protocol
 */
const OevChartSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  period: {
    type: String,
    required: true,
  },
  data: {
    type: Array, // nx4 array of [timestamp, totalLiquidated, totalSentToBuilderUSD, totalProfitUSD]
    required: true,
  },
});

export const OevChart = mongoose.model("oev_charts", OevChartSchema);
