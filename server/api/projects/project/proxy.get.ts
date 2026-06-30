import { isAddress } from "viem";
import { fetchProxyInformation } from "~/server/services/fetchProxyInfo";
import { isNumber } from "~/server/services/helper";

export default defineEventHandler(async (event) => {
  try {
    const config = useRuntimeConfig();
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

    if (config.public.showcaseMode) {
      event.node.res.statusCode = 200;
      return {
        proxyAddress,
        isOEV: true,
        chainId: Number(chainId),
        proxyType: "dapi",
        feedName,
        dapiNameHash:
          "0x9e6138f8f57d7b493a8364edb0a0ac92399dfd890eecb9121050836a1749ba42",
        api3ServerV1: "0x0000000000000000000000000000000000000001",
        oevBeneficiary: "0x0000000000000000000000000000000000000002",
        oev: {
          enabled: true,
          beneficiary: "0x0000000000000000000000000000000000000002",
        },
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
