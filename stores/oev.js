import { defineStore } from "pinia";

export const useOEVStore = defineStore("oev", function () {
  const userTvl = ref(0);
  const userIncentive = ref(0.5);

  // Fetch data from the content/oev-data which contains the json files
  const oevRaw = ref([]);
  const protocols = ref([]);

  // this variable defines the number of protocols to show in the chart
  const protocolCount = ref(6);

  function setProtocols(raw) {
    // Map over the oevRaw data and transform it into a new array of objects

    const parsed = raw.map((protocol, i) => {
      const newProtocol = {
        // Generate an id for each protocol by converting the first letter of the title to lowercase and concatenating the rest of the title
        id: protocol.title[0].toLowerCase() + protocol.title.slice(1),
        name: protocol.body[0].name,
        icon: protocol.body[0].icon,
        chainId: protocol.body[0].chainId,
        data: protocol.body,
        dataWeekly: dataToWeekly(protocol.body),
        dataMonthly: dataToMonthly(protocol.body),
        dataCumulative: dataToCumulative(protocol.body),

        // Set the default hide value to false for protocolCount amount of protocols and not first one
        hide: i >= protocolCount.value || i < 3,
      };

      // Calculate additional properties for each protocol
      newProtocol.totalLiquidated = getTotalLiquidated(newProtocol);
      newProtocol.totalSentToBuilderUSD = getTotalSentToBuilder(newProtocol);
      newProtocol.oevRate = getOEVRate(newProtocol);
      // newProtocol.withOEV = getOEV(newProtocol);

      newProtocol.data.forEach((dataPoint) => {
        dataPoint.withOEV = getOEV(dataPoint);
      });

      newProtocol.dataWeekly.forEach((dataPoint) => {
        dataPoint.withOEV = getOEV(dataPoint);
      });

      newProtocol.dataMonthly.forEach((dataPoint) => {
        dataPoint.withOEV = getOEV(dataPoint);
      });

      return newProtocol;
    });

    // Add a "total" protocol object to the parsed array
    // Create the "total" protocol object
    const totalData = parsed.reduce(
      (acc, protocol) => ({
        data: acc.data.concat(protocol.data),
        dataMonthly: acc.dataMonthly.concat(protocol.dataMonthly),
        dataWeekly: acc.dataWeekly.concat(protocol.dataWeekly),
        dataCumulative: acc.dataCumulative.concat(protocol.dataCumulative),
      }),
      {
        data: [],
        dataMonthly: [],
        dataWeekly: [],
        dataCumulative: [],
      }
    );

    parsed.push({
      id: "total",
      name: "Total",
      chainId: 1,
      hide: true,
      // trueHide: true,
      ...totalData,
      totalLiquidated: getTotalLiquidated(totalData),
      totalSentToBuilderUSD: getTotalSentToBuilder(totalData),
      oevRate: getOEVRate(totalData),
      // withOEV: getOEV(totalData),
    });

    protocols.value = parsed;
    //  return parsed;
  }

  //computed

  const isAllHidden = computed(() => {
    return protocols.value.every((protocol) => protocol.hide);
  });

  // Helper functions

  // Calculate the OEV rate for a protocol
  function getOEVRate(protocol) {
    return (
      Number(protocol.totalSentToBuilderUSD) / Number(protocol.totalLiquidated)
    );
  }

  // Calculate the OEV for a protocol
  function getOEV(protocol) {
    return (
      Number(protocol.totalLiquidated) - Number(protocol.totalSentToBuilderUSD)
    );
  }

  // Calculate the total liquidated value for a protocol
  function getTotalLiquidated(protocol) {
    return protocol.data.reduce(
      (total, dataPoint) => Number(total) + Number(dataPoint.totalLiquidated),
      0
    );
  }

  // Calculate the total sent to builder value for a protocol
  function getTotalSentToBuilder(protocol) {
    return protocol.data.reduce(
      (total, dataPoint) =>
        Number(total) + Number(dataPoint.totalSentToBuilderUSD),
      0
    );
  }

  // Convert the data array to a monthly data array
  function dataToMonthly(array) {
    const monthly = {};

    array.forEach((dataPoint, i) => {
      const date = new Date(dataPoint.date);
      const month = date.getMonth() + 1;
      const year = date.getFullYear();

      const key = `${month}-${year}`;

      if (monthly[key]) {
        monthly[key].totalLiquidated += Number(dataPoint.totalLiquidated);
        monthly[key].totalSentToBuilderUSD += Number(
          dataPoint.totalSentToBuilderUSD
        );
      } else {
        monthly[key] = {
          totalLiquidated: Number(dataPoint.totalLiquidated),
          totalSentToBuilderUSD: Number(dataPoint.totalSentToBuilderUSD),
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

  // Convert the data array to a weekly data array
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
        weekly[key].totalSentToBuilderUSD += Number(
          dataPoint.totalSentToBuilderUSD
        );
      } else {
        weekly[key] = {
          totalLiquidated: Number(dataPoint.totalLiquidated),
          totalSentToBuilderUSD: Number(dataPoint.totalSentToBuilderUSD),
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

  function dataToCumulative(array) {
    const cumulative = [];
    let totalLiquidated = 0;
    let totalSentToBuilderUSD = 0;

    array.forEach((dataPoint, i) => {
      totalLiquidated += Number(dataPoint.totalLiquidated);
      totalSentToBuilderUSD += Number(dataPoint.totalSentToBuilderUSD);

      cumulative.push({
        totalLiquidated: totalLiquidated,
        totalSentToBuilderUSD: totalSentToBuilderUSD,
        date: dataPoint.date,
      });
    });

    return cumulative;
  }

  function getProtocolById(id) {
    return protocols.value.find((protocol) => protocol.id === id);
  }

  function getTotals() {
    return getProtocolById("total");
  }

  function toggleHide(protocol) {
    protocol.hide = !protocol.hide;
    checkHideCount(protocol);
  }

  function checkHideCount(protocol) {
    const count = protocols.value.filter((protocol) => !protocol.hide).length;

    if (count > protocolCount.value) {
      const excessCount = count - protocolCount.value;
      hideExcessProtocols(excessCount, protocol.id);
    }
  }

  function hideExcessProtocols(excessCount, exemptedProtocolId) {
    // Hide the excess protocols, starting from the first visible one, but skip the exempted protocol
    let hiddenCount = 0;
    for (const protocol of protocols.value) {
      if (
        protocol.id !== exemptedProtocolId &&
        !protocol.hide &&
        hiddenCount < excessCount
      ) {
        protocol.hide = true;
        hiddenCount++;
      }
    }
  }

  function addProtocol(protocol) {
    protocols.value.push(protocol);
    checkHideCount(protocol);
  }

  return {
    // variables
    userTvl,
    userIncentive,
    oevRaw,
    protocols,

    // computed
    isAllHidden,

    // helpers
    setProtocols,
    getProtocolById,
    getTotals,
    toggleHide,
    addProtocol,
  };
});
