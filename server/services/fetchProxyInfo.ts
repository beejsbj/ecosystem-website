import { CHAINS } from "@api3/chains";
import { keccak256, toHex, toBytes, type PublicClient } from "viem";

import { createPublicClient, custom, http } from "viem";

export const getPublicClient = (chainId: number, rpc: string) => {
  let chainInfo: any = CHAINS.find(
    (chain) => chain.id.toString() === chainId.toString()
  );

  if (!chainInfo) {
    throw new Error(`Error getting client for chainID: ${chainId}`);
  }

  // Create a client
  const client = createPublicClient({
    chain: {
      id: parseInt(chainInfo.id),
      name: chainInfo.name,
      nativeCurrency: {
        name: chainInfo.name,
        symbol: chainInfo.symbol,
        decimals: chainInfo.decimals,
      },

      rpcUrls: {
        default: { http: [rpc || ""], webSocket: [] },
        public: { http: [rpc || ""], webSocket: [] },
      },
    },
    transport: http(rpc),
  });

  return client;
};

const abiInterface = [
  {
    constant: true,
    inputs: [],
    name: "api3ServerV1",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "dapiNameHash",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "dataFeedId",
    outputs: [
      {
        name: "",
        type: "bytes32",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "oevBeneficiary",
    outputs: [
      {
        name: "",
        type: "address",
      },
    ],
    payable: false,
    stateMutability: "view",
    type: "function",
  },
];

const resolvePromise = async (promiseCall: any) => {
  try {
    const [result] = await Promise.all([promiseCall]);
    return result;
  } catch (error) {
    return null;
  }
};

const stringToHex = (feedName: string, size: number) => {
  const utf8Bytes = toBytes(feedName);

  // Ensure the byte array is exactly 32 bytes, padding with zeros if necessary
  const paddedUtf8Bytes = new Uint8Array(size);
  paddedUtf8Bytes.set(utf8Bytes);

  const hexString = toHex(paddedUtf8Bytes);

  return hexString;
};

const callContract = async (
  client: PublicClient,
  contractAddress: `0x${string}`,
  functionName: string
): Promise<any> => {
  const data = await client.readContract({
    address: contractAddress,
    abi: abiInterface,
    functionName: functionName,
  });

  return data;
};

export const fetchProxyInformation = async (
  address: `0x${string}`,
  chainId: number,
  feedName: string
) => {
  let chainInfo: any = CHAINS.find(
    (chain) => chain.id.toString() === chainId.toString()
  );

  if (!chainInfo?.name) {
    throw new Error(`Error getting chainName for chainID: ${chainId}`);
  }
  const chainName = chainInfo?.name?.toLowerCase().split(" ").join("-");

  // Create a client
  const rpcUrl = chainInfo?.providers?.[0].rpcUrl;

  const client = getPublicClient(chainId, rpcUrl);

  const [
    api3ServerV1ResultPromise,
    dapiNameHashResultPromise,
    dataFeedIdResultPromise,
    oevBeneficiaryResultPromise,
  ] = [
    callContract(client, address, "api3ServerV1"),
    callContract(client, address, "dapiNameHash"),
    callContract(client, address, "dataFeedId"),
    callContract(client, address, "oevBeneficiary"),
  ];

  const [
    api3ServerV1Result,
    dapiNameHashResult,
    dataFeedIdResult,
    oevBeneficiaryResult,
  ] = await Promise.all([
    resolvePromise(api3ServerV1ResultPromise),
    resolvePromise(dapiNameHashResultPromise),
    resolvePromise(dataFeedIdResultPromise),
    resolvePromise(oevBeneficiaryResultPromise),
  ]);

  let proxyInformation: any = {};

  if (!api3ServerV1Result) {
    throw new Error(`Error getting api3ServerV1: ${api3ServerV1Result}`);
  } else {
    proxyInformation.api3ServerV1 = api3ServerV1Result;
  }

  if (oevBeneficiaryResult) {
    proxyInformation.isOev = Boolean(oevBeneficiaryResult);
    proxyInformation.oevBeneficiary = oevBeneficiaryResult;
  } else {
    proxyInformation.isOev = false;
  }

  if (!dapiNameHashResult && !dataFeedIdResult) {
    let errorMsg = "Error getting ";
    if (!dapiNameHashResult)
      errorMsg += `dapiNameHash: ${dapiNameHashResult}. `;
    if (!dataFeedIdResult) errorMsg += `dataFeedId: ${dataFeedIdResult}.`;
    throw new Error(errorMsg);
  } else {
    if (dapiNameHashResult) {
      const dapiNameHash = keccak256(stringToHex(feedName, 32));
      if (dapiNameHashResult !== dapiNameHash)
        throw new Error(
          `dapiNameHash mismatch: ${dapiNameHashResult} !== ${dapiNameHash}`
        );
      proxyInformation.type = "dapi";
      proxyInformation.dapiNameHash = dapiNameHashResult;
    }

    if (dataFeedIdResult) {
      let dapiInfo: any = await fetch(
        `https://db-api-prod.api3.org/api/dapi-info?chain=${chainName}&name=${encodeURIComponent(
          feedName
        )}`
      );
      dapiInfo = await dapiInfo.json();

      console.log("dapiInfo", dapiInfo);

      if (!dapiInfo?.dapi?.beaconId) {
        throw new Error(`dapi Info not found`);
      }
      let possibleDatafeedIds = [];
      if (dapiInfo.dapi.beaconId)
        possibleDatafeedIds.push(dapiInfo.dapi.beaconId);
      if (dapiInfo.dapi.beaconSetId) {
        possibleDatafeedIds.push(dapiInfo.dapi.beaconSetId);
        const beaconIds = dapiInfo.dapi.beaconSet.beacons.map(
          (beacon: any) => beacon.id
        );
        possibleDatafeedIds = possibleDatafeedIds.concat(beaconIds);
      }
      if (!possibleDatafeedIds.includes(dataFeedIdResult))
        throw new Error(
          `dataFeedId mismatch: ${dataFeedIdResult} not in ${possibleDatafeedIds}`
        );
      proxyInformation.type = "datafeedId";
      proxyInformation.dataFeedId = dataFeedIdResult;
    }
  }

  return proxyInformation;
};
