<script setup>
/**
 * FeedHeaderInfo Component
 *
 * This component displays key information about a feed in a header section.
 * It includes a chain selector dropdown and shows additional feed details.
 *
 * @vue-component
 *
 * @prop {Object} proxy - Contains information about the current proxy, including chainId and feedName
 *
 * @example
 * <FeedHeaderInfo :proxy="currentProxy" />
 *
 * @features
 * - Displays a dropdown for selecting the blockchain for the current feed
 * - Shows feed type and data feed ID when available
 * - Updates the URL when a new chain is selected
 * - Uses skeleton loaders for better UX during data fetching
 * - Responsive design with flexible layout
 *
 * @dependencies
 * - Uses FormKit for the chain selection dropdown
 * - Relies on useInterfaceStore for UI state management
 * - Uses ChainIcon and WalletAddress components
 * - Employs vue-skeletor for loading animations
 * - Uses ClientOnly for client-side rendering of the dropdown
 */

import { Skeletor } from "vue-skeletor";
const props = defineProps(["proxy"]);

const ui = useInterfaceStore();
const router = useRouter();

const { data: stats, pending } = await useFetch("/api/projects/stats/", {
  pick: ["feeds"],
});

const currentFeedChains = computed(() => {
  let chains = stats.value.feeds.find((feed) => {
    console.log(feed);
    return feed.feedName == props.proxy.feedName;
  })?.chainIds;

  if (!chains) {
    return [];
  }

  return chains.map((chain) => {
    return {
      label: getChainName(chain),
      value: chain,
    };
  });
});

function handleChainChange(chain) {
  if (chain == props.proxy.chainId) {
    return;
  }
  console.log("dropdown handler");
  router.push({
    query: {
      chainId: chain,
    },
  });
}
</script>

<template>
  <div class="container">
    <div class="feed-info" v-auto-animate>
      <template v-if="!ui.loadingDone || pending">
        <SkeletonListItem class="skeleton" />
        <Skeletor pill />
      </template>

      <template v-else>
        <ClientOnly>
          <FormKit
            id="chain-select"
            type="dropdown"
            v-model="props.proxy.chainId"
            :options="currentFeedChains"
            @input="handleChainChange"
            placeholder="Select Chain"
            popover
            selection-removable
          >
            <template #option="{ option }">
              <div class="icon-option">
                <ChainIcon :id="option.value" />
                <span class="">
                  {{ option.label }}
                </span>
              </div>
            </template>
          </FormKit>
        </ClientOnly>
        <p class="whisper-voice" v-if="proxy.type">
          Type:&nbsp;<span>{{ proxy.type.toUpperCase() }}</span>
        </p>
        <div class="feed-id" v-if="proxy.feedId">
          <p class="whisper-voice">Data Feed ID:&nbsp;</p>
          <WalletAddress class="whisper-voice" :walletAddress="proxy.feedId" />
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  margin-top: var(--space-s);

  display: grid;
  align-items: center;
  gap: var(--space-xs);
  row-gap: var(--space-m);

  @media (min-width: 900px) {
    grid-template-columns: 1fr 0.6fr;
  }
}
.feed-info {
  display: flex;
  flex-wrap: wrap;

  gap: var(--space-s);
  align-items: center;
  justify-content: start;
  container-type: inline-size;

  .formkit-outer,
  .skeleton {
    margin: 0 !important;
    flex-basis: 220px;
    background-color: transparent;

    @media (max-width: 500px) {
      flex-basis: 100%;
    }
  }
  :deep(.formkit-inner) {
    padding-left: 0;
    --fk-border-box-shadow: none;
    --fk-color-placeholder: var(--gray);

    .icon-option {
      padding-inline-start: 0;
    }
  }

  .feed-id,
  & > p {
    background-color: var(--gray-darkest);
    padding: var(--space-3xs);
    border-radius: calc(var(--corners) / 2);

    display: flex;
    align-items: center;

    white-space: nowrap;
  }
}

@container (max-width: 500px) {
  .formkit-outer,
  .skeleton {
    flex-basis: 100% !important;
  }

  .formkit-outer {
    order: 3;
  }
}
</style>
