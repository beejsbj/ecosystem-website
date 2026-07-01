import type { EventHandler } from "h3";
import mongoose from "mongoose";
import { connectDB } from "../services/helper";

export const checkConnection = (handler: EventHandler) =>
  defineEventHandler(async (event: any) => {
    try {
      const config = useRuntimeConfig();

      if (config.public.showcaseMode) {
        return await handler(event);
      }

      if (mongoose.connection.readyState !== 1) {
        console.log("connection state ", mongoose.connection.readyState);
        console.log("reconnecting db... ");
        await connectDB();
      }

      const response = await handler(event);

      return response;
    } catch (err: any) {
      console.log("db reconnect error ", err);
      event.node.res.statusCode = 500;
      return {
        code: "ERROR",
        message: "Failed to connect database",
      };
    }
  });
