<script setup>
import { CHAINS } from "@api3/chains";

const props = defineProps(["proxy"]);
const router = useRouter();

const selectedChain = ref(props.proxy.chainId ?? null);

const chains = CHAINS.map((chain) => {
  return {
    label: chain.name,
    value: chain.id,
  };
});

//
function handleChainChange(event) {
  router.push({
    query: {
      dappSlug: props.proxy.dappSlug,
      chainId: event,
    },
  });
}
</script>

<template>
  <div class="feed-info">
    <FormKit
      type="dropdown"
      v-model="selectedChain"
      @input="handleChainChange"
      :options="chains"
      placeholder="Select Chain"
      select-icon="down"
      popover
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
  }

  @media (min-width: 768px) {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>
