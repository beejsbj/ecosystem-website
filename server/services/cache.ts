import NodeCache from "node-cache";

const config = useRuntimeConfig();

export const cacheInterval =
  config.nodeEnv === "production" ? 1 * 60 * 60 : 2 * 60;
export const queryCache = new NodeCache();
