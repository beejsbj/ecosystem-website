import { defineStore } from "pinia";

export const useOEVStore = defineStore("oev", function () {
  const userTvl = ref(0);

  // Fetch data from the content/oev-data which contains the json files
  const oevRaw = ref([]);
  const protocols = ref([]);

  // this variable defines the number of protocols to show in the chart
  const protocolCount = ref(0);

  function setProtocols(raw) {
    // Map over the oevRaw data and transform it into a new array of objects
    const parsed = raw.map((protocol, i) => {
      return {
        // Generate an id for each protocol by converting the first letter of the title to lowercase and concatenating the rest of the title
        id: protocol.title[0].toLowerCase() + protocol.title.slice(1),
        name: protocol.body[0].name,
        data: protocol.body,
        dataMonthly: dataToMonthly(protocol.body),
        dataWeekly: dataToWeekly(protocol.body),

        // Set the hide property to true for protocols with an index greater than protocolCount value
        hide: true,
      };
    });
    console.log(parsed);

    // Add a "total" protocol object to the parsed array
    parsed.push({
      id: "total",
      name: "Total",
      hide: true,
      trueHide: true,
      // Concatenate the data arrays of all protocols into a single data array
      data: parsed.reduce((total, protocol) => {
        return total.concat(protocol.data);
      }, []),
      // Concatenate the dataMonthly arrays
      dataMonthly: parsed.reduce((total, protocol) => {
        return total.concat(protocol.dataMonthly);
      }, []),
      // Concatenate the dataWeekly arrays
      dataWeekly: parsed.reduce((total, protocol) => {
        return total.concat(protocol.dataWeekly);
      }, []),
    });

    // Calculate additional properties for each protocol and the "total" protocol
    parsed.forEach((protocol) => {
      protocol.totalLiquidated = getTotalLiquidated(protocol);
      protocol.totalSentToBuilderUSD = getTotalSentToBuilder(protocol);
      protocol.oevRate = getOEVRate(protocol);
      protocol.withOEV = getOEV(protocol);

      if (protocol.id !== "total") {
        protocol.data.forEach((dataPoint) => {
          dataPoint.withOEV = getOEV(dataPoint);
        });

        protocol.dataWeekly.forEach((dataPoint) => {
          dataPoint.withOEV = getOEV(dataPoint);
        });

        protocol.dataMonthly.forEach((dataPoint) => {
          dataPoint.withOEV = getOEV(dataPoint);
        });
      }
    });

    protocols.value = parsed;
    //  return parsed;
  }

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

  function getProtocolById(id) {
    return protocols.value.find((protocol) => protocol.id === id);
  }

  function getTotals() {
    return getProtocolById("total");
  }

  function toggleHide(protocol) {
    console.log("hide");
    protocol.hide = !protocol.hide;
  }

  return {
    // variables
    userTvl,
    oevRaw,
    protocols,

    // helpers
    setProtocols,
    getProtocolById,
    getTotals,
    toggleHide,
  };
});
