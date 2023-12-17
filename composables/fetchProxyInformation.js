import { keccak256, stringToHex } from "viem";
import { readContracts } from "@wagmi/core";
import { CHAINS } from "@api3/chains";

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

export async function fetchProxyInformation(address, chainId, feedName) {
  let chainName = CHAINS.find(
    (chain) => chain.id.toString() === chainId.toString()
  )?.name;

  chainName = chainName.toLowerCase().split(" ").join("-");

  const proxyContract = {
    address: address,
    abi: abiInterface,
  };

  const [
    api3ServerV1Result,
    dapiNameHashResult,
    dataFeedIdResult,
    oevBeneficiaryResult,
  ] = await readContracts({
    contracts: [
      {
        ...proxyContract,
        functionName: "api3ServerV1",
        chainId: chainId,
      },
      {
        ...proxyContract,
        functionName: "dapiNameHash",
        chainId: chainId,
      },
      {
        ...proxyContract,
        functionName: "dataFeedId",
        chainId: chainId,
      },
      {
        ...proxyContract,
        functionName: "oevBeneficiary",
        chainId: chainId,
      },
    ],
  });

  let proxyInformation = {};

  if (api3ServerV1Result.status === "failure") {
    throw new Error(`Error getting api3ServerV1: ${api3ServerV1Result.reason}`);
  } else {
    proxyInformation.api3ServerV1 = api3ServerV1Result.result;
  }

  if (oevBeneficiaryResult.status !== "failure") {
    proxyInformation.isOev = Boolean(oevBeneficiaryResult.result);
    proxyInformation.oevBeneficiary = oevBeneficiaryResult.result;
  } else {
    proxyInformation.isOev = false;
  }

  if (
    dapiNameHashResult.status === "failure" &&
    dataFeedIdResult.status === "failure"
  ) {
    let errorMsg = "Error getting ";
    if (dapiNameHashResult.status === "failure")
      errorMsg += `dapiNameHash: ${dapiNameHashResult.reason}. `;
    if (dataFeedIdResult.status === "failure")
      errorMsg += `dataFeedId: ${dataFeedIdResult.reason}.`;
    throw new Error(errorMsg);
  } else {
    if (dapiNameHashResult.result) {
      const dapiNameHash = keccak256(stringToHex(feedName, { size: 32 }));
      if (dapiNameHashResult.result !== dapiNameHash)
        throw new Error(
          `dapiNameHash mismatch: ${dapiNameHashResult.result} !== ${dapiNameHash}`
        );
      proxyInformation.type = "dapi";
      proxyInformation.dapiNameHash = dapiNameHashResult.result;
    }

    if (dataFeedIdResult.result) {
      let dapiInfo = await fetch(
        `https://db-api-prod.api3.org/api/dapi-info?chain=${chainName}&name=${encodeURIComponent(
          feedName
        )}`
      );
      dapiInfo = await dapiInfo.json();

      let possibleDatafeedIds = [];
      if (dapiInfo.dapi.beaconId)
        possibleDatafeedIds.push(dapiInfo.dapi.beaconId);
      if (dapiInfo.dapi.beaconSetId) {
        possibleDatafeedIds.push(dapiInfo.dapi.beaconSetId);
        const beaconIds = dapiInfo.dapi.beaconSet.beacons.map(
          (beacon) => beacon.id
        );
        possibleDatafeedIds = possibleDatafeedIds.concat(beaconIds);
      }
      if (!possibleDatafeedIds.includes(dataFeedIdResult.result))
        throw new Error(
          `dataFeedId mismatch: ${dataFeedIdResult.result} not in ${possibleDatafeedIds}`
        );
      proxyInformation.type = "datafeedId";
      proxyInformation.dataFeedId = dataFeedIdResult.result;
    }
  }

  return proxyInformation;
}
