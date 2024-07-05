import { isAddress } from "viem";
import { fetchProxyInformation } from "~/server/services/fetchProxyInfo";
import { isNumber } from "~/server/services/helper";

export default defineEventHandler(async (event) => {
  try {
    const { proxyAddress, feedName, chainId }: any = getQuery(event);

    const errors = [];

    if (!isAddress(proxyAddress)) {
      event.node.res.statusCode = 400;

      errors.push("Invalid proxy address");
    }

    if (!isNumber(chainId)) {
      event.node.res.statusCode = 400;

      errors.push("Invalid chainId");
    }

    if (!feedName) {
      event.node.res.statusCode = 400;

      errors.push("Invalid feedName");
    }

    if (errors.length > 0) {
      return {
        code: "REQ_FAILED",
        message: errors,
      };
    }

    const proxyInfo = await fetchProxyInformation(
      proxyAddress,
      chainId,
      feedName
    );

    event.node.res.statusCode = 200;
    return proxyInfo;
  } catch (err) {
    console.log("get proxy info error ", { err });

    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
