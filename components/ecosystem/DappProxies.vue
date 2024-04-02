<script setup>
import { useStorage } from "@vueuse/core";
import { useEcosystemStore } from "@/stores/ecosystem";

const ecosystem = useEcosystemStore();

const props = defineProps(["dapp", "isForm", "dappForm"]);

const formattedProxies = computed(() => {
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
        <div class="whisper-voice type">Type</div>
        <div class="whisper-voice proxy-address">Proxy Address</div>
        <div class="whisper-voice address">dAPI ID</div>
        <div class="whisper-voice feed-link"></div>
        <div class="" v-if="isForm"></div>
      </li>

      <!-- Dynamically rendered table based on data -->
      <li class="table-row" v-for="(proxy, index) in formattedProxies">
        <!-- chain -->
        <div class="chain">
          <!-- #todo clean up -->

          <ChainIcon :id="proxy.chainId" />
          {{ ecosystem.chainNames(proxy.chainId) }}
        </div>

        <!-- feed name -->
        <div class="feedname">
          <FeedIcon :feed="proxy.feedName" />
        </div>

        <!-- type -->
        <div class="type">
          {{ proxy?.proxyType?.includes("datafeedId") ? "Data Feed" : "dAPI" }}
        </div>

        <!-- proxy address -->
        <div class="proxy-address">
          <WalletAddress :walletAddress="proxy?.proxyAddress" />
        </div>

        <!-- id / dapi based address -->
        <div class="address">
          <WalletAddress
            :walletAddress="
              proxy?.proxyType === 'datafeedId'
                ? proxy?.datafeedId
                : proxy?.dapiNameHash
            "
          />
        </div>

        <!-- link -->
        <div class="feed-link">
          <NuxtLink
            class="text external-link whisper-voice"
            :to="`/feeds/${getFeedQuery(proxy)}`"
            v-if="!isForm"
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
                src="@/assets/images/interface/cross.svg"
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
    margin-top: var(--space-2xs);
    max-height: 400px;

    overflow-y: scroll;
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
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr 1fr 1fr 0.5fr;
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
      flex-grow: 1;
    }

    .feed-link {
      display: flex;
      align-items: center;
    }

    picture.cross {
      width: 10px;
    }
  }
}
</style>
