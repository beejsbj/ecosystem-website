import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ReferralSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  level: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  sent_at: {
    type: Date,
    default: Date.now(),
  },
});

export const Referral = mongoose.model("referrals", ReferralSchema);
