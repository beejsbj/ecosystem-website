import mongoose from "mongoose";
const Schema = mongoose.Schema;
/**
 * Projects upvote schema
 */
const UpvoteSchema = new Schema({
  project: {
    type: mongoose.Types.ObjectId,
    ref: "projects",
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Upvote = mongoose.model("upvotes", UpvoteSchema);
