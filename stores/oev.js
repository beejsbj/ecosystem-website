/**
 * OEV Store
 *
 * Manages state and operations related to OEV protocols and user interactions
 * in the application.
 *
 * @store
 *
 * @example
 * // Usage in a component:
 * import { useOEVStore } from '@/stores/oev';
 *
 * const oevStore = useOEVStore();
 * const protocols = computed(() => oevStore.protocols);
 *
 * // Toggle protocol visibility
 * oevStore.toggleHide(someProtocol);
 *
 * @features
 * - Manages user-specific TVL and incentive data
 * - Handles protocol data including visibility states
 * - Provides functions for protocol manipulation (hide/show, add)
 * - Computes totals and visibility states
 * - Manages user-selected protocols
 *
 * @state
 * - userTvl: User's Total Value Locked
 * - userIncentive: User's incentive amount
 * - userSelectedProtocols: Object of user-selected protocols
 * - protocols: Array of protocol data
 * - protocolCount: Number of protocols to show in the chart
 *
 * @computed
 * - oevTotals: Total OEV data
 * - isAllHidden: Boolean indicating if all protocols are hidden
 * - isUserVisible: Boolean indicating if user-added protocol is visible
 *
 * @methods
 * - setProtocols: Initializes protocol data
 * - getProtocolBySlug: Retrieves a protocol by its slug
 * - toggleHide: Toggles visibility of a protocol
 * - hideAll: Hides all protocols
 * - addProtocol: Adds a new protocol to the list
 * - isProtocolVisible: Checks if a protocol is visible
 *
 * @dependencies
 * - pinia
 *
 * @note
 * This store uses the Composition API style of Pinia and manages
 * complex state related to OEV protocols and user interactions.
 */

import { defineStore } from "pinia";

export const useOEVStore = defineStore("oev", function () {
  const userTvl = ref(0);
  const userIncentive = ref(0);

  const userSelectedProtocols = ref({
    "dApp-1": "morphoAaveV2-1",
    "dApp-2": "venusBsc-56",
    "dApp-3": "aaveV2-1",
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

    const sorted = [...raw].sort((a, b) => {
      return a.totalLiquidated - b.totalLiquidated;
    });

    const parsed = sorted?.map((protocol) => {
      return {
        ...protocol,
      };
    });

    protocols.value = parsed;

    //  add user protocol
    const userProtocol = {
      slug: `userAdded`,
      name: `Your dApp`,
      icon: "/images/icons/dapp-icon.svg",
      chainId: 1,
      totalLiquidated: 0,
      totalSentToBuilderUSD: 0,
      totalProfitUSD: 0,
      totalIncentiveUSD: 0,
      totalOevLostUSD: 0,
      trueHide: true,
      hide: true,
    };
    if (!protocols.value.some((protocol) => protocol.slug === userProtocol.slug)) {
      addProtocol(userProtocol);
    }
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
