<script setup>
// import { ChainLogo, SymbolLogo, ApiProviderLogo } from "api3-logos";

import slug from "slug";

const props = defineProps(["chain", "id", "fill", "stroke", "strokeWidth"]);

slug.extend({ "/": "-" });

const ecosystem = useEcosystemStore();

const isTestnet = ref(false);

const chain = computed(() => {
  //   ecosystem.chainNames(props.id);
  let chain = props.chain
    ? slug(props.chain)
    : props.id
    ? slug(ecosystem.chainNames(props.id))
    : "";

  // if testnet, rename the chain
  if (chain.includes("testnet")) {
    isTestnet.value = true;
  }
  chain = renameChain(chain);
  return chain;
});

function renameChain(chain) {
  chain = chain.replace("-testnet", "");
  chain = chain.replace("-goerli", "");
  chain = chain.replace("-sepolia", "");
  chain = chain.replace("-chain", "");

  chain = chain === "sepolia" ? "ethereum" : chain;
  chain = chain === "goerli" ? "ethereum" : chain;
  chain = chain === "mainnet" ? "ethereum" : chain;
  return chain;
}

// console.log(ChainLogo(chain.value));
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
  max-width: 24px;

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
