import mongoose from "mongoose";
import { Nitro } from "nitropack";
import { syncProjectsToMongodb } from "./services/syncDb";

export default async (_nitroApp: Nitro) => {
  const config = useRuntimeConfig();

  try {
    const dbUrl =
      config.nodeEnv === "production"
        ? config.mongodbUri
        : config.mongodbUriDev;
    await mongoose.connect(dbUrl);

    // sync projects on server startup
    console.log(`db connected: on ${config.nodeEnv}`);

    if (config.nodeEnv === "production") {
      console.log("syncing projects");
      await syncProjectsToMongodb();
      console.log("projects synced");
    }
  } catch (err) {
    console.log("mongodb connection error ", err);
  }
};
