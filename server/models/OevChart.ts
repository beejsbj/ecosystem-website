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
  // array of [
  // "6/7/2021",
  // 1492.9429421981115,
  // 36.24253864949333
  // ],
  // array of objects
  data: {
    type: Array,
    required: true,
  },
});

export const OevChart = mongoose.model("oev_charts", OevChartSchema);
