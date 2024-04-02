<script setup>
import { reset } from "@formkit/core";
const props = defineProps(["proxy"]);
const ecosystem = useEcosystemStore();
const ui = useInterfaceStore();
const router = useRouter();

const { data: stats, pending } = await useFetch("/api/projects/stats/", {
  pick: ["feeds"],
});

const currentFeedChains = computed(() => {
  let chains = stats.value.feeds.find(
    (feed) => feed.feedName == props.proxy.feedName
  )?.chainIds;

  if (!chains) {
    return [];
  }

  return chains.map((chain) => {
    return {
      label: ecosystem.chainNames(chain),
      value: chain,
    };
  });
});

//

function handleChainChange(chain) {
  //   this should only triiger when the user changes the chain using the dropdown

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
  <div class="feed-info" v-auto-animate>
    <SkeletonListItem v-if="!ui.loadingDone || pending" />

    <ClientOnly v-else>
      <FormKit
        id="chain-select"
        type="dropdown"
        v-model="props.proxy.chainId"
        :options="currentFeedChains"
        @input="handleChainChange"
        placeholder="Select Chain"
        select-icon="down"
        popover
        selection-removable
      >
        <template #option="{ option }">
          <div class="chain-option">
            <ChainIcon :id="option.value" />
            <span class="whisper-voice">
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
      <WalletAddress :walletAddress="proxy.feedId" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.feed-info {
  display: flex;
  flex-wrap: wrap;

  gap: var(--space-s);
  align-items: center;
  justify-content: start;
  margin-top: var(--space-m);

  .formkit-outer {
    margin: 0 !important;
    flex-basis: 220px;
    background-color: var(--paper);
  }
  :deep(.formkit-inner) {
    padding-left: var(--space-2xs);
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

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
