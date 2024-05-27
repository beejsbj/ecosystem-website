import {
  Contract,
  Interface,
  JsonRpcProvider,
  formatEther,
  formatUnits,
} from "ethers";
import config from "./config.json";
import BigNumber from "bignumber.js";

import builders from "./builders.json";
import { default as axios } from "axios";
import LendingPoolABI from "./abis/lendingPoolABI.json";
import type { Liquidation } from "../types";
const lendingPoolInterface = new Interface(LendingPoolABI);

function getProvider(currentProtocolIndex: number) {
  const rpc = config.protocols[currentProtocolIndex].rpcs[0];
  const provider = new JsonRpcProvider(rpc);
  return provider;
}

function getLendingPoolContract(currentProtocolIndex: number) {
  const provider = getProvider(currentProtocolIndex);

  const lendingPool = new Contract(
    config.protocols[currentProtocolIndex].lendingPool,
    lendingPoolInterface,
    provider
  );
  return lendingPool;
}

const getTokenDecimals = async (
  tokenAddress: string,
  currentProtocolIndex: number
) => {
  const provider = getProvider(currentProtocolIndex);
  const contract = new Contract(
    tokenAddress,
    ["function decimals() returns (uint8)"],
    provider
  );
  return await contract.decimals.staticCall();
};

async function fetchPriceFromAaveV2Oracle(
  asset: string,
  blockNumber: string,
  aaveV2OracleAddress: string,
  currentProtocolIndex: number
) {
  try {
    const abi = [
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getAssetPrice",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ];

    const provider = getProvider(currentProtocolIndex);
    const aaveOracleInterface = new Interface(abi);
    const aaveOracleContract = new Contract(
      aaveV2OracleAddress,
      aaveOracleInterface,
      provider
    );

    // usdc address on ethereum mainnet
    const usdc = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const usdcPrice = await aaveOracleContract.getAssetPrice(usdc, {
      blockTag: parseInt(blockNumber),
    });

    // console.log("usdcPrice ", usdcPrice.toString());

    const ethPrice = new BigNumber(1)
      .dividedBy(formatEther(usdcPrice.toString()))
      .toFixed(8);

    return ethPrice;
  } catch (error) {
    console.log("params ", {
      asset,
      blockNumber,
      aaveV2OracleAddress,
      currentProtocolIndex,
    });
    console.log("error in fetchPriceFromAaveV2Oracle retrying... ", error);

    await sleep(5000);
    return fetchPriceFromAaveV2Oracle(
      asset,
      blockNumber,
      aaveV2OracleAddress,
      currentProtocolIndex
    );
  }
}

async function fetchPriceFromAaveV3Oracle(
  asset: any,
  blockNumber: string,
  aaveV3OracleAddress: string,
  currentProtocolIndex: number
) {
  try {
    const abi = [
      {
        inputs: [{ internalType: "address", name: "asset", type: "address" }],
        name: "getAssetPrice",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
      },
    ];

    const provider = getProvider(currentProtocolIndex);
    const aaveOracleInterface = new Interface(abi);
    const aaveOracleContract = new Contract(
      aaveV3OracleAddress,
      aaveOracleInterface,
      provider
    );

    console.log({ asset, blockNumber });
    const price = await aaveOracleContract.getAssetPrice(asset, {
      blockTag: parseInt(blockNumber),
    });

    return formatUnits(price.toString(), 8);
  } catch (error) {
    console.log("call failed fetchPriceFromAaveV3Oracle retrying...", error);
    await sleep(500);
    return fetchPriceFromAaveV3Oracle(
      asset,
      blockNumber,
      aaveV3OracleAddress,
      currentProtocolIndex
    );
  }
}

const getLiquidationIncetivePercentage = async (
  collateral: any,
  currentProtocolIndex: number
): Promise<any> => {
  try {
    const lendingPool = getLendingPoolContract(currentProtocolIndex);
    const configuration = await lendingPool.getConfiguration.staticCall(
      collateral
    );
    let number = configuration[0];
    let shiftedNumber = number >> BigInt(32);
    let extractedBits = shiftedNumber & BigInt(0xffff);
    return Number(extractedBits) / 100 - 100;
  } catch (error) {
    console.log(
      "call failed getLiquidationIncetivePercentage retrying ...",
      error
    );
    await sleep(500);
    getLiquidationIncetivePercentage(collateral, currentProtocolIndex);
  }
};

const getLiquidationCall = async (
  txHash: string,
  currentProtocolIndex: number
): Promise<any> => {
  try {
    const lendingPool = getLendingPoolContract(currentProtocolIndex);
    const filter = await lendingPool.filters
      .LiquidationCall(null, null, null)
      .getTopicFilter();

    console.log({ txHash });

    const provider = getProvider(currentProtocolIndex);

    const transaction = await provider.getTransactionReceipt(txHash);

    const logs = await provider.getLogs({
      fromBlock: transaction?.blockNumber,
      toBlock: transaction?.blockNumber,
      address: config.protocols[currentProtocolIndex].lendingPool,
      topics: filter,
    });

    const [
      collateralAsset,
      debtAsset,
      user,
      debtToCover,
      collateralAmount,
    ]: any = lendingPoolInterface?.parseLog(logs?.[0])?.args;

    const { gasUsed, gasPrice }: any = transaction;

    const txCost = gasPrice * gasUsed;

    return [
      formatEther(txCost),
      collateralAsset,
      debtAsset,
      user,
      debtToCover,
      transaction?.blockNumber,
    ];
  } catch (error) {
    await sleep(500);
    console.log("getLiquidationCall error retrying... ", error);
    return getLiquidationCall(txHash, currentProtocolIndex);
  }
};

const getGasCost = async (
  txHash: string,
  currentProtocolIndex: number
): Promise<any> => {
  try {
    const provider = getProvider(currentProtocolIndex);
    const transaction = await provider.getTransactionReceipt(txHash);

    const { gasUsed, gasPrice }: any = transaction;
    console.log(gasPrice, gasUsed);
    const txCost = formatEther(gasPrice * gasUsed);
    console.log({ txCost });
    return { txCost, blockNumber: transaction?.blockNumber };
  } catch (error) {
    console.log("rpc call failed getTransactionReceipt", error);
    await sleep(500);
    return getGasCost(txHash, currentProtocolIndex);
  }
};

const getAaveV2LiquidationInfo = async (
  txHash: any,
  liquidatedCollateralUSD: BigNumber.Value,
  currentProtocolIndex: number
) => {
  const [txCost, collateralAsset, debtAsset, user, debtToCover, blockNumber] =
    await getLiquidationCall(txHash, currentProtocolIndex);

  const incentivePercentage = await getLiquidationIncetivePercentage(
    collateralAsset,
    currentProtocolIndex
  );

  console.log("incentivePercentage", incentivePercentage);
  // const incentive =
  //   (Number(liquidatedCollateralUSD) * incentivePercentage) / 100;

  const incentiveUSD = new BigNumber(liquidatedCollateralUSD)
    .multipliedBy(incentivePercentage)
    .dividedBy(100)
    .toString();

  const aaveV2OracleAddress = config.protocols[currentProtocolIndex].aaveOracle;
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const ethPrice = await fetchPriceFromAaveV2Oracle(
    WETH_ADDRESS,
    blockNumber,
    aaveV2OracleAddress,
    currentProtocolIndex
  );
  console.log({ ethPrice, blockNumber });

  const txCostUSD = new BigNumber(txCost).multipliedBy(ethPrice).toString();

  return {
    incentiveUSD,
    txCostUSD,
    ethPrice,
  };
};

const getAaveV3LiquidationInfo = async (
  txHash: any,
  liquidatedCollateralUSD: BigNumber.Value,
  currentProtocolIndex: number
) => {
  const [txCost, collateralAsset, debtAsset, user, debtToCover, blockNumber] =
    await getLiquidationCall(txHash, currentProtocolIndex);

  const incentivePercentage: number = await getLiquidationIncetivePercentage(
    collateralAsset,
    currentProtocolIndex
  );
  // console.log({ incentivePercentage });

  const incentiveUSD = new BigNumber(liquidatedCollateralUSD)
    .multipliedBy(incentivePercentage)
    .dividedBy(100)
    .toString();

  const aaveOracle = config.protocols[currentProtocolIndex].aaveOracle;
  const WETH_ADDRESS = config.protocols[currentProtocolIndex].wethAddress;
  const ethPrice = await fetchPriceFromAaveV3Oracle(
    WETH_ADDRESS,
    blockNumber,
    aaveOracle,
    currentProtocolIndex
  );
  console.log({ ethPrice, blockNumber });

  const txCostUSD = new BigNumber(txCost).multipliedBy(ethPrice).toString();

  return {
    incentiveUSD,
    txCostUSD,
    ethPrice,
  };
};

export const getCompoundV3LiquidationInfo = async (
  txHash: any,
  liquidatedCollateralUSD: any,
  currentProtocolIndex: number
) => {
  const { txCost, blockNumber } = await getGasCost(
    txHash,
    currentProtocolIndex
  );

  const aaveOracle = config.protocols[currentProtocolIndex].aaveOracle;
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  const ethPrice = await fetchPriceFromAaveV2Oracle(
    WETH_ADDRESS,
    blockNumber,
    aaveOracle,
    currentProtocolIndex
  );
  console.log({ ethPrice, blockNumber });

  const txCostUSD = new BigNumber(txCost).multipliedBy(ethPrice).toString();

  return {
    txCostUSD,
    ethPrice,
  };
};

const getPriceFromChainLink = async (
  tokenAddress: any,
  blockNumber: any,
  currentProtocolIndex: number
) => {
  const abi = [
    {
      inputs: [{ internalType: "address", name: "asset", type: "address" }],
      name: "getPrice",
      outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
      stateMutability: "view",
      type: "function",
    },
  ];
  const provider = getProvider(currentProtocolIndex);
  const oracle = "0x1B2103441A0A108daD8848D8F5d790e4D402921F";
  const contract = new Contract(oracle, abi, provider);

  console.log({ tokenAddress, blockNumber });
  const result = await contract.getPrice.staticCall(tokenAddress, {
    blockTag: blockNumber,
  });

  console.log({ result });
  return result;
};

const getBSCLiquidationInfo = async (
  txHash: any,
  liquidatedCollateralUSD: any,
  currentProtocolIndex: any
) => {
  const { txCost, blockNumber } = await getGasCost(
    txHash,
    currentProtocolIndex
  );

  const WBNB = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
  let bnbPrice = await getPriceFromChainLink(
    WBNB,
    blockNumber,
    currentProtocolIndex
  );
  bnbPrice = formatUnits(bnbPrice, 18);
  const txCostUSD = new BigNumber(txCost).multipliedBy(bnbPrice).toString();
  console.log({ bnbPrice });

  return {
    txCostUSD,
    ethPrice: bnbPrice,
  };
};

const getNonEthereumLiquidationInfo = async (
  txHash: any,
  liquidatedCollateralUSD: any,
  currentProtocolIndex: number
) => {
  const { txCost, blockNumber } = await getGasCost(
    txHash,
    currentProtocolIndex
  );

  const provider = getProvider(currentProtocolIndex);
  const blockDetail = await provider.getBlock(blockNumber);
  const timestamp: any = blockDetail?.timestamp;
  console.log({ timestamp });
  const ethBlock = await getEthereumBlock(timestamp);

  console.log({ ethBlock });
  // v3 oracle
  const aaveOracle = config.protocols[1].aaveOracle;
  const WETH_ADDRESS = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2";
  // use ethereum config
  const _currentProtocolIndex = 1;
  const ethPrice = await fetchPriceFromAaveV3Oracle(
    WETH_ADDRESS,
    ethBlock,
    aaveOracle,
    _currentProtocolIndex
  );
  console.log({ ethPrice });
  const txCostUSD = new BigNumber(txCost).multipliedBy(ethPrice).toString();

  return {
    txCostUSD,
    ethPrice,
  };
};

export function sleep(ms: number | undefined) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchFundsMovedToBuilder(hash: any): Promise<any> {
  try {
    const apiUrl = `https://api.etherscan.io/api?module=account&action=txlistinternal&txhash=${hash}&apikey=${config?.protocols?.[0]?.etherscanApiKey}`;
    const response = await axios.get(apiUrl);
    const internalTransactions = response?.data?.result;

    let fundsMoved = 0;
    let builder;
    for (let i = 0; i < internalTransactions?.length; i++) {
      const transaction = internalTransactions?.[i];
      if (
        builders
          .map((el) => el.toLowerCase())
          .includes(transaction.to.toLowerCase())
      ) {
        console.log(
          `Funds moved to builder From: ${transaction.from}, To: ${transaction.to}, Value: ${transaction.value}`
        );

        builder = transaction?.to;
        fundsMoved = transaction.value?.toString();
      }
    }

    return { fundsMoved, builder };
  } catch (error) {
    console.log("error fetchFundsMovedToBuilder", error);
    await sleep(500);
    console.log("retrying fetchInternaltrx");
    return fetchFundsMovedToBuilder(hash);
  }
}

async function getEthereumBlock(timestamp: number): Promise<any> {
  try {
    const YourApiKeyToken = "36QV5RR1WHHYWBH81P4V3KY2DKCZ7RR4ZH";
    const api = `https://api.etherscan.io/api?module=block&action=getblocknobytime&timestamp=${timestamp}&closest=before&apikey=${YourApiKeyToken}`;
    const result = await axios.get(api);
    const block = await result.data?.result;

    console.log({ block });
    return block;
  } catch (error) {
    console.log("call failed getEthereumBlock", error);
    await sleep(500);
    return getEthereumBlock(timestamp);
  }
}

const protocolVersions = {
  aaveV2: "aaveV2",
  aaveV3: "aaveV3",
  compoundV2: "compoundV2",
  compoundV3: "compoundV3",
  creamFinance: "creamFinance",
  makerDao: "makerDao",
  morphoAaveV2: "morphoAaveV2",
  morphoComp: "morphoComp",
  aaveV3Arb: "aaveV3Arb",
  compoundV3Arb: "compoundV3Arb",
  aaveV3Avl: "aaveV3Avl",
  compoundV3Base: "compoundV3Base",
  venusBsc: "venusBsc",
  aaveV3Op: "aaveV3Op",
  compoundV3Pol: "compoundV3Pol",
  aaveV3Pol: "aaveV3Pol",
};
export async function prepareFinalLiquidationData(
  list: string | any[],
  currentProtocolIndex: number
): Promise<Liquidation[]> {
  console.log("list size ", list?.length);
  const finalList: Liquidation[] = [];

  const _config = config.protocols[currentProtocolIndex];

  let i = 0;
  while (i < list.length) {
    const date = new Date(
      Number(list[i].timestamp) * 1000
    ).toLocaleDateString();

    const { builder, fundsMoved } =
      _config.chainId === 1
        ? await fetchFundsMovedToBuilder(list[i].hash)
        : { builder: null, fundsMoved: "0" };

    const sentToBuilder = formatEther(fundsMoved);
    let sentToBuilderUSD = "0";

    // calculate made by searcher , incentive and txCost
    let madeBySearcherUSD = "0";
    let incentiveUSD = "0";
    let txCostUSD = "0";

    // find liquidation info and searcher profit for different protocols
    if (_config.protocolVersion === protocolVersions.aaveV2) {
      console.log("Aave V2");
      const liqInfo = await getAaveV2LiquidationInfo(
        list[i].hash,
        list[i].amountUSD,
        currentProtocolIndex
      );

      incentiveUSD = liqInfo.incentiveUSD;
      txCostUSD = liqInfo.txCostUSD;
      sentToBuilderUSD = new BigNumber(sentToBuilder)
        .multipliedBy(liqInfo.ethPrice)
        .toString();
      madeBySearcherUSD = new BigNumber(incentiveUSD)
        .minus(sentToBuilderUSD)
        .minus(txCostUSD)
        .toString();
    } else if (
      [
        protocolVersions.aaveV3,
        protocolVersions.aaveV3Arb,
        protocolVersions.aaveV3Avl,
        protocolVersions.aaveV3Op,
        protocolVersions.aaveV3Pol,
      ].includes(_config.protocolVersion)
    ) {
      // profit calculations for aave v3
      console.log("aave v3");
      const liqInfo = await getAaveV3LiquidationInfo(
        list[i].hash,
        list[i].amountUSD,
        currentProtocolIndex
      );

      incentiveUSD = liqInfo.incentiveUSD;
      txCostUSD = liqInfo.txCostUSD;
      sentToBuilderUSD = new BigNumber(sentToBuilder)
        .multipliedBy(liqInfo.ethPrice)
        .toString();
      madeBySearcherUSD = new BigNumber(incentiveUSD)
        .minus(sentToBuilderUSD)
        .minus(txCostUSD)
        .toString();
    } else if (
      [
        protocolVersions.compoundV3,
        protocolVersions.compoundV2,
        protocolVersions.makerDao,
        protocolVersions.morphoAaveV2,
        protocolVersions.morphoComp,
      ].includes(_config.protocolVersion)
    ) {
      console.log(`########## ${_config.protocolVersion} #############`);

      const liqInfo = await getCompoundV3LiquidationInfo(
        list[i].hash,
        list[i].amountUSD,
        currentProtocolIndex
      );

      sentToBuilderUSD = new BigNumber(sentToBuilder)
        .multipliedBy(liqInfo.ethPrice)
        .toString();

      incentiveUSD = new BigNumber(list[i].profitUSD)
        .plus(sentToBuilderUSD)
        .toString();

      txCostUSD = liqInfo.txCostUSD;

      madeBySearcherUSD = new BigNumber(incentiveUSD)
        .minus(sentToBuilderUSD)
        .minus(txCostUSD)
        .toString();
    } else if (
      [
        protocolVersions.compoundV3Arb,
        protocolVersions.compoundV3Base,
        protocolVersions.compoundV3Pol,
      ].includes(_config.protocolVersion)
    ) {
      console.log(`########## ${_config.protocolVersion} #############`);

      const liqInfo = await getNonEthereumLiquidationInfo(
        list[i].hash,
        list[i].amountUSD,
        currentProtocolIndex
      );

      incentiveUSD = list[i].profitUSD;

      txCostUSD = liqInfo.txCostUSD;

      madeBySearcherUSD = new BigNumber(incentiveUSD)
        .minus(txCostUSD)
        .toString();
    } else if ([protocolVersions.venusBsc].includes(_config.protocolVersion)) {
      console.log(`########## ${_config.protocolVersion} #############`);

      const liqInfo = await getBSCLiquidationInfo(
        list[i].hash,
        list[i].amountUSD,
        currentProtocolIndex
      );

      incentiveUSD = list[i].profitUSD;

      txCostUSD = liqInfo.txCostUSD;

      madeBySearcherUSD = new BigNumber(incentiveUSD)
        .minus(txCostUSD)
        .toString();
    } else {
    }

    finalList.push({
      date: date,
      timestamp: list[i].timestamp,
      user: list[i].liquidatee.id,
      hash: list[i].hash,
      liquidatedCollateralUSD: list[i].amountUSD,
      liquidatedCollateral: list[i].amount,
      sentToBuilder: sentToBuilder,
      sentToBuilderUSD: sentToBuilderUSD,
      collateralAsset: list[i].asset.id,
      blockNumber: list[i].blockNumber,
      madeBySearcherUSD: madeBySearcherUSD,
      incentiveUSD,
      txCostUSD,
      builder: !builder
        ? "0x0000000000000000000000000000000000000000"
        : builder,
    });

    console.log(finalList);

    i += 1;
  }

  return finalList;
}
