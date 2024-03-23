<script setup>
import { CHAINS } from "@api3/chains";

// const props = defineProps(["proxy"]);
// const chainId = proxy.chainId;

const route = useRoute();
const ecosystem = useEcosystemStore();

const feedSlug = route.params.detail;
const feedName = feedSlug.replace("-", "/");
const proxy = route.query;

const selectedChain = ref(proxy.chainId);

const chain = computed(() => {
  return ecosystem.chainNames(selectedChain);
});

const chains = CHAINS.map((chain) => {
  return {
    label: chain.name,
    value: chain.id,
  };
});

function handleChainChange() {
  console.log(selectedChain);
}
</script>

<template>
  <SectionColumn class="header">
    <div class="title-mast">
      <div class="feed-icon-heading">
        <FeedIcon feed="metis/bsc" />

        <h1 class="loud-voice">{{ feedName }}</h1>
      </div>

      <NuxtLink
        :to="`https://market.api3.org/dapis/${chain}/${feedSlug}`"
        class="button outline whisper-voice"
      >
        <span class="external-link"> View on Market </span>
      </NuxtLink>
    </div>

    <div class="feed-info">
      <FormKit
        type="dropdown"
        v-model="selectedChain"
        @change="handleChainChange"
        :options="chains"
        v-auto-animate
        select-icon="down"
        popover
      >
        <template #option="{ option }">
          <div class="chain-option">
            <ChainIcon :chain="option.label" />
            <span class="whisper-voice">
              {{ option.label }}
            </span>
          </div>
        </template>
      </FormKit>
      <p class="whisper-voice">
        Type: <span>{{ proxy.type }}</span>
      </p>
      <div class="feed-id">
        <p class="whisper-voice">Data Feed ID:</p>
        <WalletAddress :walletAddress="proxy.datafeedId ?? proxy.dapiId" />
      </div>
    </div>
  </SectionColumn>
</template>

<style scoped lang="scss">
.header :deep(inner-column) {
  .title-mast {
    display: grid;

    .feed-icon-heading {
      display: grid;
      align-items: center;
      grid-template-columns: 100px 1fr;
    }

    .feed-icon picture {
      --width: 100px;
    }

    .button {
      display: grid;
      text-transform: uppercase;
      place-items: center;
      margin: var(--space-s) 0;
      justify-self: start;
      margin-left: var(--space-s);
    }

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;

      .button {
        justify-self: end;
      }
    }
  }

  .feed-info {
    display: grid;

    gap: var(--space-s);
    align-items: center;
    justify-content: start;

    padding-left: var(--space-s);
    grid-template-columns: 200px 100px;

    .formkit-outer {
      margin: 0 !important;
      grid-column: 1 / -1;

      @media (min-width: 500px) {
        grid-column: unset;
      }
    }
    .formkit-inner {
      box-shadow: unset !important;
    }

    @media (min-width: 500px) {
      grid-template-columns: 200px 100px 200px;
    }

    .feed-id {
      background-color: var(--paper);
      display: flex;
    }
  }
}

.chain-option {
  padding-left: var(--space-s);
  display: grid;
  align-items: center;

  grid-template-columns: 24px 1fr;
  gap: var(--space-3xs);
  padding: var(--space-2xs) 0;
}
</style>
