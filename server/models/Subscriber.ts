import mongoose from "mongoose";
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  joined_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Subscriber = mongoose.model("subscribers", SubscriberSchema);
