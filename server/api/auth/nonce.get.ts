import { generateNonce } from "siwe";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
    const nonce = config.public.showcaseMode ? "showcase-nonce" : generateNonce();

    event.context.nonce = nonce;

    event.node.res.statusCode = 200;
    return nonce;
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Failed to generate nonce",
    };
  }
});
