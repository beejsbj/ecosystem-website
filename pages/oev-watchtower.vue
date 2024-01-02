<script setup>
import { useStorage } from "@vueuse/core";

const protocolCount = ref(3);

const oevRaw = await queryContent("oev-data").find();

const protocols = computed(() => {
  const parsed = oevRaw.map((protocol, i) => {
    return {
      id: protocol.title[0].toLowerCase() + protocol.title.slice(1),
      name: protocol.body[0].name,
      data: protocol.body,
      dataMonthly: dataToMonthly(protocol.body),
      dataWeekly: dataToWeekly(protocol.body),
      hide: i > protocolCount.value,
    };
  });

  parsed.push({
    id: "total",
    name: "Total",
    hide: true,

    data: parsed.reduce((total, protocol) => {
      return total.concat(protocol.data);
    }, []),

    dataMonthly: parsed.reduce((total, protocol) => {
      return total.concat(protocol.dataMonthly);
    }, []),

    dataWeekly: parsed.reduce((total, protocol) => {
      return total.concat(protocol.dataWeekly);
    }, []),
  });

  parsed.forEach((protocol) => {
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

  return parsed;
});

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

function dataToWeekly(array) {
  const weekly = {};

  array.forEach((dataPoint, i) => {
    const date = new Date(dataPoint.date);
    const week = Math.ceil(
      (date - new Date(date.getFullYear(), 0, 1)) / 604800000
    );

    const year = date.getFullYear();

    const key = `${week}-${year}`;

    if (weekly[key]) {
      weekly[key].totalLiquidated += Number(dataPoint.totalLiquidated);
      weekly[key].totalSentToBuilder += Number(dataPoint.totalSentToBuilder);
    } else {
      weekly[key] = {
        totalLiquidated: Number(dataPoint.totalLiquidated),
        totalSentToBuilder: Number(dataPoint.totalSentToBuilder),
        week: week,
        year: year,
        id: key,
        date: dataPoint.date,
      };
    }
  });

  const sorted = Object.values(weekly).sort((a, b) => {
    return new Date(a.year, a.week) - new Date(b.year, b.week);
  });

  return sorted;
}
</script>

<template>
  <PageTitle heading="WatchTower" />

  <OEVInterfaceChart :protocols="protocols" />

  <OEVProtocolChart :protocols="protocols" />
</template>
