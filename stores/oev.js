import { defineStore } from "pinia";

export const useOEVStore = defineStore("oev", function () {
  const userTvl = ref(0);
  const userIncentive = ref(0.5);

  // Fetch data from the content/oev-data which contains the json files
  const oevRaw = ref([]);
  const protocols = ref([]);
  const oevTotals = ref({});

  // this variable defines the number of protocols to show in the chart
  const protocolCount = ref(4);

  // Set the protocols data
  function setProtocols(raw) {
    if (!raw) return;

    const parsed = raw?.map((protocol, i) => {
      return {
        ...protocol,
        hide: i >= protocolCount.value,
      };
    });

    protocols.value = parsed;

    oevTotals.value = parsed.find((protocol) => protocol.slug === "total");

    //  add user protocol
    const userProtocol = {
      slug: `userAdded`,
      name: `Your dApp`,
      chainId: 1,
      totalLiquidated: 0,
      totalSentToBuilderUSD: 0,
      totalProfitUSD: 0,
      totalIncentiveUSD: 0,
      trueHide: true,
      hide: true,
    };
    addProtocol(userProtocol);
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

  function getProtocolById(id) {
    if (protocols.value.length === 0) {
      return {};
    }
    return protocols.value.find((protocol) => protocol.slug === id);
  }

  function getTotals() {
    return getProtocolById("total");
  }

  function toggleHide(protocol) {
    protocol.hide = !protocol.hide;
    checkHideCount(protocol);
  }

  function hideAll() {
    protocols.value.forEach((protocol) => {
      protocol.hide = true;
    });
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
    oevTotals,

    // computed
    isAllHidden,

    // helpers
    setProtocols,
    getProtocolById,
    getTotals,
    toggleHide,
    hideAll,
    addProtocol,
  };
});
