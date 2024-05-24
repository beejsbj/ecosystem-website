import type { Nitro } from "nitropack";
import { connectDB } from "./services/helper";

export default async (_nitroApp: Nitro) => {
  await connectDB();
};
