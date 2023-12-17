import mongoose from "mongoose";
const Schema = mongoose.Schema;
/**
 * Articles upvote schema
 */
const ArticleUpvoteSchema = new Schema({
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

export const ArticleUpvote = mongoose.model(
  "article_upvotes",
  ArticleUpvoteSchema
);
