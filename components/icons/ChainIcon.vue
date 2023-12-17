<script setup>
import slug from "slug";
slug.extend({ "/": "-" });

const props = defineProps(["chain", "fill", "stroke", "strokeWidth"]);

const isTestnet = ref(false);
const chain = computed(() => {
  let chain = slug(props.chain);
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
  max-width: 20px;

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
  padding: 2.5%;
}
</style>
