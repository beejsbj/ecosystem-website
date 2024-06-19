import { defineStore } from "pinia";

export const useOEVStore = defineStore("oev", function () {
  const userTvl = ref(0);
  const userIncentive = ref(0);

  const userSelectedProtocols = ref({
    "dApp-1": "morphoAaveV2-1",
    "dApp-2": "venusBsc-56",
    "dApp-3": "morphoComp-1",
    "dApp-4": "compoundV3Base-8453",
  });

  // Fetch data from the content/oev-data which contains the json files
  const oevRaw = ref([]);
  const protocols = ref([]);

  // this variable defines the number of protocols to show in the chart
  const protocolCount = ref(4);

  //computed

  const oevTotals = computed(() => {
    return getProtocolBySlug("total");
  });

  const isAllHidden = computed(() => {
    return protocols.value.every((protocol) => protocol.hide);
  });

  const isUserVisible = computed(() => {
    const isVisible = Object.values(userSelectedProtocols.value).includes(
      "userAdded"
    );
    if (isVisible) {
      return true;
    }
    return false;
  });

  //functions
  // Set the protocols data
  function setProtocols(raw) {
    if (!raw) return;

    const sorted = raw.sort((a, b) => {
      return a.totalLiquidated - b.totalLiquidated;
    });

    const parsed = raw?.map((protocol, i) => {
      return {
        ...protocol,
      };
    });

    protocols.value = parsed;

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

  // Helper functions

  function getProtocolBySlug(slug) {
    if (protocols.value.length === 0) {
      return {};
    }
    return protocols.value.find((protocol) => protocol.slug === slug);
  }

  function getTotals() {
    return getProtocolBySlug("total");
  }

  function toggleHide(protocol) {
    //if this is the last visible protocol, don't hide it

    if (!protocol.hide && protocols.value.filter((p) => !p.hide).length === 1) {
      return;
    }

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
      hideExcessProtocols(excessCount, protocol.slug);
    }
  }

  function hideExcessProtocols(excessCount, exemptedProtocolId) {
    // Hide the excess protocols, starting from the first visible one, but skip the exempted protocol
    let hiddenCount = 0;
    for (const protocol of protocols.value) {
      if (
        protocol.slug !== exemptedProtocolId &&
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

  function isProtocolVisible(protocol) {
    const isVisible = Object.values(userSelectedProtocols.value).includes(
      protocol.slug
    );
    if (isVisible) {
      return true;
    }
    return false;
  }

  return {
    // variables
    userTvl,
    userIncentive,
    userSelectedProtocols,
    isUserVisible,
    oevRaw,
    protocols,
    oevTotals,

    // computed
    isAllHidden,

    // helpers
    setProtocols,
    getProtocolBySlug,
    getTotals,
    toggleHide,
    hideAll,
    addProtocol,
    isProtocolVisible,
  };
});
