<script setup>
import * as Logos from "@phase21/logos";

// const { $chainLogo } = useNuxtApp();

const props = defineProps(["id"]);

const ecosystem = useEcosystemStore();

const isTestnet = ref(false);
const isFound = ref(true);

const chain = computed(() => {
  const chain = ecosystem.chainNames(props.id);

  if (chain.includes("testnet")) {
    isTestnet.value = true;
  }

  return chain;
});

const imgSrc = computed(() => {
  const src = Logos.ChainLogo(props.id);
  return src;
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
    <img
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
