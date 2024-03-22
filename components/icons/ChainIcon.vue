<script setup>
import slug from "slug";
slug.extend({ "/": "-" });

const props = defineProps([
  "chain",
  "fill",
  "stroke",
  "strokeWidth",
  "chainId",
]);

const ecosystem = useEcosystemStore();

const isTestnet = ref(false);
const chain = computed(() => {
  let chain = "";

  if (props.chain) {
    chain = slug(props.chain);
  }
  if (props.chainId) {
    chain = slug(ecosystem.chainNames(props.chainId));
  }

  if (chain.includes("testnet")) {
    isTestnet.value = true;
  }
  chain = chain.replace("-testnet", "");
  chain = chain.replace("-goerli", "");
  chain = chain.replace("-sepolia", "");
  chain = chain.replace("-chain", "");

  chain = chain === "sepolia" ? "ethereum" : chain;
  chain = chain === "goerli" ? "ethereum" : chain;
  chain = chain === "mainnet" ? "ethereum" : chain;

  return chain;
});
</script>

<template>
  <picture
    class="chain-icon"
    :class="{ testnet: isTestnet }"
    v-tooltip="props.chain"
  >
    <NuxtImg loading="lazy" :src="`/images/chains/${chain}.svg`" :alt="chain" />
  </picture>
</template>

<style scoped lang="scss">
picture {
  aspect-ratio: 1/1;
  width: 24px;
  height: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
.chain-icon.testnet {
  filter: saturate(0);

  position: relative;
  background: var(--gray-darker);
  border-radius: var(--corners);
  padding: 0.5%;
}
</style>
