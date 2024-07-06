<script setup lang="ts">
interface Props {
  id: string;
}

const { $chainLogo } = useNuxtApp();

const props = defineProps<Props>();

const ecosystem = useEcosystemStore();
const isTestnet = ref(false);
const isFound = ref(true);

const chain = computed((): string => {
  const chainName = ecosystem.chainNames(props.id);

  // Uncomment if you want to use the testnet logic
  // if (chainName.includes("testnet")) {
  //   isTestnet.value = true;
  // }

  return chainName;
});

const imgSrc = computed((): string => {
  return $chainLogo(props.id);
});

const onError = (): void => {
  isFound.value = false;
};
</script>

<template>
  <picture
    class="chain-icon"
    :class="{ testnet: isTestnet }"
    v-tooltip="chain"
    :data-first-letter="chain?.[0]?.toUpperCase()"
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
  min-width: 18px;
  max-width: 24px;
  flex: 1;

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
