import mongoose from "mongoose";
const Schema = mongoose.Schema;

/**
 * Articles views schema
 */
const ViewSchema = new Schema({
  article: {
    type: mongoose.Types.ObjectId,
    ref: "articles",
  },
  ipAddress: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now(),
  },
});

export const View = mongoose.model("views", ViewSchema);
