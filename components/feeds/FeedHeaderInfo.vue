<script setup>
import { CHAINS } from "@api3/chains";

const props = defineProps(["proxy"]);

const chains = CHAINS.map((chain) => {
  return {
    label: chain.name,
    value: chain.id,
  };
});
</script>

<template>
  <div class="feed-info">
    {{ proxy }}
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
          <ChainIcon :id="option.value" />
          <span class="whisper-voice">
            {{ option.label }}
          </span>
        </div>
      </template>
    </FormKit>
    <p class="whisper-voice" v-if="proxy.type">
      Type:

      <span>{{ proxy.type }}</span>
    </p>
    <div class="feed-id" v-if="proxy.datafeedId || proxy.dapiId">
      <p class="whisper-voice">Data Feed ID:</p>
      <WalletAddress :walletAddress="proxy.datafeedId ?? proxy.dapiId" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.feed-info {
  display: flex;

  gap: var(--space-s);
  align-items: center;
  justify-content: start;

  padding-left: var(--space-s);

  .formkit-outer {
    margin: 0 !important;
  }
  .formkit-inner {
    box-shadow: unset !important;
  }

  .feed-id,
  & > p {
    background-color: var(--gray-darkest);
    padding: var(--space-3xs);
    border-radius: calc(var(--corners) / 2);

    display: flex;
    align-items: center;
  }
}
</style>
