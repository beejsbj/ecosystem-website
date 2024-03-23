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

const isFound = ref(true);

const imgSrc = computed(() => {
  return `/images/chains/${chain.value}.svg`;
});

const onError = () => {
  isFound.value = false;
};
</script>

<template>
  <picture
    class="chain-icon"
    :class="{ testnet: isTestnet }"
    v-tooltip="props.chain"
    :data-first-letter="chain[0].toUpperCase()"
  >
    <NuxtImg
      loading="lazy"
      :src="imgSrc"
      :alt="chain"
      @error="onError"
      :class="{ 'not-found': !isFound }"
    />
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

picture:has(.not-found) {
  position: relative;
  overflow: hidden;

  img {
    border-radius: 50%;
  }

  &::before {
    content: attr(data-first-letter);
    display: grid;
    place-items: center;
    line-height: 0;

    position: absolute;
    inset: 0;
    background: var(--gray-darker);
    border-radius: var(--corners);
    padding: 0.5%;
    z-index: 2;
  }
}
</style>
