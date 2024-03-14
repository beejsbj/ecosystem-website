/**
 *  id: "total",
    name: "Total",
    chainId: 1,
    hide: true,
    trueHide: true,
    totalLiquidated: totalLiquidated,
    totalSentToBuilderUSD: totalSentToBuilderUSD,
    oevRate: getOEVRate({ totalLiquidated, totalSentToBuilderUSD }),
    withOEV: getOEV({ totalLiquidated, totalSentToBuilderUSD }),
 */
import mongoose from "mongoose";
const Schema = mongoose.Schema;
/**
 * Oev totals for each protocol
 */
const OevTotalSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: false,
  },
  chainId: {
    type: String,
    required: true,
  },
  hide: {
    type: Boolean,
    default: false,
  },
  trueHide: {
    type: Boolean,
    required: false,
  },
  totalLiquidated: {
    type: Number,
    required: true,
  },
  totalSentToBuilderUSD: {
    type: Number,
    required: true,
  },
  oevRate: {
    type: Number,
    required: true,
  },
  withOEV: {
    type: Number,
    required: true,
  },
});

export const OevTotal = mongoose.model("oev_totals", OevTotalSchema);
