<script setup lang="ts">
/**
 * ChainIcon Component
 *
 * This component displays an icon for a specific blockchain. It handles cases where
 * the icon might not be found and provides a fallback display using the chain's first letter.
 *
 * @vue-component
 *
 * @prop {string} id - The identifier for the blockchain
 *
 * @example
 * <ChainIcon id="eth" />
 *
 * @features
 * - Displays the blockchain icon based on the provided id
 * - Uses a computed property to determine the image source
 * - Provides a fallback display using the chain's first letter if the image fails to load
 * - Includes special styling for testnet chains (currently commented out)
 * - Uses a tooltip to display the full chain name on hover
 * - Responsive design with fixed aspect ratio
 *
 * @implementation-details
 * - The image source is computed based on the provided id
 * - Fallback mechanism is implemented using the onerror event on the img element
 * - Testnet styling can be enabled by uncommenting the relevant CSS
 * - Tooltip functionality should be implemented separately (not shown in this component)
 */

import { getChainName } from "@/utils/getChainName";

interface Props {
  id: string;
}

const { $chainLogo } = useNuxtApp();

const props = defineProps<Props>();

const ecosystem = useEcosystemStore();
const isTestnet = ref(false);
const isFound = ref(true);

const chain = computed((): string => {
  const chainName = getChainName(props.id);

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
