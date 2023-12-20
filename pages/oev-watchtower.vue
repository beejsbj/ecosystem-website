<script setup>
import { useStorage } from "@vueuse/core";

//

// get data from jsons for each protocols
const aaveV2Eth = (await queryContent("/aave-v2-eth").findOne()).body;
const aaveV3Eth = (await queryContent("/aave-v3-eth").findOne()).body;
const maker = (await queryContent("/maker").findOne()).body;
const compoundV3Mainnet = (await queryContent("/compound-v3-mainnet").findOne())
  .body;
const inverseFinanceEth = (await queryContent("/inverse-finance-eth").findOne())
  .body;

//   apply withOEV to each data point

const protocols = ref({
  // Aave V2 Ethereum
  aaveV2Eth: {
    id: "aaveV2Eth",
    name: "Aave V2 Etherum",
    dataMonthly: dataToMonthly(aaveV2Eth),
    data: aaveV2Eth,
  },

  //   Aave V3 Ethereum
  aaveV3Eth: {
    id: "aaveV3Eth",
    name: "Aave V3 Etherum",
    dataMonthly: dataToMonthly(aaveV3Eth),
    data: aaveV3Eth,
  },

  // Maker
  maker: {
    id: "maker",
    name: "Maker",
    dataMonthly: dataToMonthly(maker),
    data: maker,
  },

  // Compound V3 Mainnet
  compoundV3Mainnet: {
    id: "compoundV3Mainnet",
    name: "Compound V3 Mainnet",
    dataMonthly: dataToMonthly(compoundV3Mainnet),
    data: compoundV3Mainnet,
  },

  // Inverse Finance Ethereum
  inverseFinanceEth: {
    id: "inverseFinanceEth",
    name: "Inverse Finance Etherum",
    dataMonthly: dataToMonthly(inverseFinanceEth),
    data: inverseFinanceEth,
  },

  //   totals
  total: {
    id: "total",
    name: "Total",
    dataMonthly: dataToMonthly([
      ...aaveV2Eth,
      ...aaveV3Eth,
      ...maker,
      ...compoundV3Mainnet,
      ...inverseFinanceEth,
    ]),
    data: [
      ...aaveV2Eth,
      ...aaveV3Eth,
      ...maker,
      ...compoundV3Mainnet,
      ...inverseFinanceEth,
    ],
  },
});

// set totals and oev rates for each protocol
Object.values(protocols.value).forEach((protocol) => {
  protocol.totalLiquidated = getTotalLiquidated(protocol);
  protocol.totalSentToBuilder = getTotalSentToBuilder(protocol);
  protocol.oevRate = getOEVRate(protocol);
  protocol.withOEV = getOEV(protocol);

  if (protocol.id !== "total") {
    protocol.data.forEach((dataPoint) => {
      dataPoint.withOEV = getOEV(dataPoint);
    });
    protocol.dataMonthly.forEach((dataPoint) => {
      dataPoint.withOEV = getOEV(dataPoint);
    });
  }
});

// variables

// helper functions
function getOEVRate(protocol) {
  return Number(protocol.totalSentToBuilder) / Number(protocol.totalLiquidated);
}

function getOEV(protocol) {
  return Number(protocol.totalLiquidated) - Number(protocol.totalSentToBuilder);
}

function getTotalLiquidated(protocol) {
  return protocol.data.reduce(
    (total, dataPoint) => Number(total) + Number(dataPoint.totalLiquidated),
    0
  );
}

function getTotalSentToBuilder(protocol) {
  return protocol.data.reduce(
    (total, dataPoint) => Number(total) + Number(dataPoint.totalSentToBuilder),
    0
  );
}

function dataToMonthly(array) {
  const monthly = {};

  array.forEach((dataPoint, i) => {
    const date = new Date(dataPoint.date);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const key = `${month}-${year}`;

    if (monthly[key]) {
      monthly[key].totalLiquidated += Number(dataPoint.totalLiquidated);
      monthly[key].totalSentToBuilder += Number(dataPoint.totalSentToBuilder);
    } else {
      monthly[key] = {
        totalLiquidated: Number(dataPoint.totalLiquidated),
        totalSentToBuilder: Number(dataPoint.totalSentToBuilder),
        month: month,
        year: year,
        id: key,
        date: dataPoint.date,
      };
    }
  });

  const sorted = Object.values(monthly).sort((a, b) => {
    return new Date(a.year, a.month) - new Date(b.year, b.month);
  });

  return sorted;
}
</script>

<template>
  <PageTitle heading="WatchTower" />

  <OEVInterfaceChart :protocols="protocols" />

  <OEVProtocolChart :protocols="protocols" />
</template>
