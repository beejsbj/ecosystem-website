<script setup>
/**
 * DappProxies Component
 *
 * A component for displaying a table of proxy information for dApps, including network, feed name, type, addresses, and links.
 *
 * @component
 *
 * @example
 * <DappProxies :dapp="dappObject" :isForm="false" />
 *
 * @props
 * @prop {Object} dapp - The dApp object containing proxy information
 * @prop {Boolean} isForm - Indicates if the component is being used in a form context
 * @prop {Object} dappForm - Form data object when used in form context
 * @prop {Array} proxies - Array of proxy objects (used when not accessing from dapp object)
 *
 * @features
 * - Displays a table of proxy information including chain, feed name, type, addresses
 * - Supports both form and display modes
 * - Provides links to individual feed pages
 * - Implements copy-to-clipboard functionality for addresses
 * - Responsive design with scrollable table
 *
 * @computed
 * - formattedProxies: Processes and formats proxy data for display
 *
 * @methods
 * - getFeedQuery: Generates query string for feed page links
 *
 * @dependencies
 * - useEcosystemStore: For accessing ecosystem data
 * - getChainName: Utility function for resolving chain names
 * - ChainIcon, FeedIcon, WalletAddress: Custom components for UI elements
 * - v-auto-animate: For smooth list transitions
 *
 * @styling
 * - Uses scoped SCSS for component-specific styling
 * - Implements responsive table layout with sticky header
 * - Custom styling for various table elements
 *
 * @notes
 * - The component adapts its behavior based on the 'isForm' prop
 * - In form mode, it allows removal of proxy entries
 * - Utilizes custom components for chain and feed icons, and wallet addresses
 */

import { useEcosystemStore } from "@/stores/ecosystem";
import { getChainName } from "@/utils/getChainName";

const ecosystem = useEcosystemStore();

const props = defineProps(["dapp", "isForm", "dappForm", "proxies"]);

const formattedProxies = computed(() => {
  if (props.isForm) {
    return props.dappForm.proxies;
  }

  if (!props.dapp?.proxies) {
    return [];
  }

  const formattedProxyItems = [];
  Object.keys(props.dapp?.proxies).forEach((chain) => {
    let chainItems = props.dapp?.proxies?.[chain]?.map((el) => {
      return { ...el, chainId: chain };
    });
    formattedProxyItems.push(...chainItems);
  });

  return formattedProxyItems;
});

function getFeedQuery(proxy) {
  //slug of detail page
  let feedSlug = proxy.feedName;
  feedSlug = feedSlug.replace("/", "-");
  let fullQuery = `${feedSlug}`;
  fullQuery += `?dappSlug=${props.dapp.slug}`;
  fullQuery += `&chainId=${proxy.chainId}`;
  fullQuery += `&proxyId=${proxy.proxyAddress}`;

  //   type
  fullQuery += `&type=${proxy.proxyType}`;
  fullQuery += `&feedId=${proxy.datafeedId ?? proxy.dapiNameHash}`;

  //  oev
  fullQuery += proxy.oev.enabled ? `&oev=${proxy.oev.enabled}` : "";
  fullQuery += proxy.oev.enabled
    ? `&oevBeneficiary=${proxy.oev.beneficiary}`
    : "";

  return fullQuery;
}
</script>

<template>
  <section class="proxy-table">
    <h2 class="attention-voice">Proxies</h2>
    <ul v-auto-animate>
      <!-- Table heading, first row -->
      <li class="table-row table-head">
        <div class="whisper-voice chain">Network</div>
        <div class="whisper-voice feedname">Feed Name</div>
        <div class="whisper-voice type" v-if="!isForm">Type</div>
        <div class="whisper-voice proxy-address">Proxy Address</div>
        <div class="whisper-voice address">dAPI ID</div>
      </li>

      <!-- Dynamically rendered table based on data -->
      <li class="table-row" v-for="(proxy, index) in formattedProxies">
        <!-- chain -->
        <div class="chain">
          <ChainIcon :id="proxy.chainId" />
          {{ getChainName(proxy.chainId) }}
        </div>

        <!-- feed name -->
        <div class="feedname">
          <FeedIcon :feed="proxy.feedName" />
        </div>

        <!-- type -->
        <div class="type" v-if="!isForm">
          {{ proxy?.proxyType?.includes("datafeedId") ? "Data Feed" : "dAPI" }}
        </div>

        <!-- proxy address -->
        <div class="proxy-address">
          <WalletAddress
            class="whisper-voice"
            :walletAddress="proxy?.proxyAddress"
          />
        </div>

        <!-- id / dapi based address -->
        <div class="address">
          <WalletAddress
            class="whisper-voice"
            :walletAddress="
              proxy?.proxyType === 'datafeedId'
                ? proxy?.datafeedId
                : proxy?.dapiNameHash
            "
          />
        </div>

        <!-- link -->
        <div class="feed-link" v-if="!isForm">
          <NuxtLink
            class="text whisper-voice"
            :to="`/feeds/${getFeedQuery(proxy)}`"
          >
            Go to Feed
          </NuxtLink>
        </div>

        <!-- button column rendered when this component is loaded in the form-->
        <div class="cross" v-if="isForm">
          <button
            class="icon"
            @click.prevent="dappForm?.proxies?.splice(index, 1)"
          >
            <picture class="cross">
              <img
                loading="lazy"
                src="@/assets/images/icons/interface/cross.svg"
                alt="cross icon"
              />
            </picture>
          </button>
        </div>
      </li>
    </ul>
  </section>
</template>

<style scoped lang="scss">
section.proxy-table {
  display: grid;
  ul {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 1fr;

    margin-top: var(--space-2xs);
    max-height: 400px;

    overflow-y: scroll;
    overscroll-behavior: contain;
    position: relative;
    scroll-behavior: smooth;

    background: var(--paper);
    border-radius: var(--corners);

    .table-head {
      position: sticky;
      top: 0;
      background: var(--gray-darkest);
      z-index: 1;
      border-bottom: none;
    }
  }
  .table-row {
    grid-column: 1/-1;
    display: grid;
    grid-template-columns: subgrid;
    gap: var(--space-s);
    padding: var(--space-s);
    border-bottom: var(--border-dark);
    align-items: center;
    min-width: fit-content;

    div {
      white-space: nowrap;
      @media (max-width: 768px) {
        min-width: 100px;
      }
    }

    .chain {
      display: flex;
      align-items: center;
      gap: var(--space-2xs);
    }

    .chain picture.chain-icon {
      flex: 1;
    }

    :deep(.feed-icon) {
      justify-content: unset;
    }

    .feed-link {
      display: flex;
      align-items: center;
    }

    picture.cross {
      width: 18px;
    }

    .address,
    .proxy-address {
      padding: 4px;
    }
  }
}
</style>
