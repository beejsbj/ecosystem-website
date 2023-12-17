import { generateNonce } from "siwe";

export default defineEventHandler(async (event) => {
  try {
    const nonce = generateNonce();

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
