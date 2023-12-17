import mongoose from "mongoose";
import { ArticleType } from "../types/Article";
const Schema = mongoose.Schema;

// Define the nested schema
const AuthorSchema = new mongoose.Schema({
  name: String,
});

const ArticleSchema = new Schema<ArticleType>({
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  description: {
    type: String,
  },
  author: {
    type: AuthorSchema,
    required: true,
  },
  content: {
    type: Schema.Types.Mixed,
    required: true,
  },
  cover: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Article = mongoose.model("articles", ArticleSchema);
