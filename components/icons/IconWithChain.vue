<script setup>
/**
 * IconWithChain Component
 *
 * This component displays an icon image with an associated chain icon overlay.
 * It's designed to show a primary image (e.g., a dApp or token logo) along with
 * a smaller chain icon to indicate the associated blockchain.
 *
 * @vue-component
 *
 * @prop {string} image - The URL of the main image to be displayed
 * @prop {string} id - The identifier for the chain, used by the ChainIcon component
 *
 * @example
 * <IconWithChain image="/path/to/dapp-logo.png" id="eth" />
 *
 * @note
 * The chain icon overlay (picture.chain-icon) is styled but set to display: none.
 * Adjust the CSS if you want to make the chain icon visible.
 */

const props = defineProps(["image", "id"]);
</script>

<template>
  <div class="icon-with-chain">
    <picture>
      <NuxtImg loading="lazy" :src="image" />
    </picture>
    <ChainIcon :id="id" />
  </div>
</template>

<style scoped lang="scss">
div {
  position: relative;
  min-width: 24px;
  max-width: 32px;
}

picture {
  aspect-ratio: 1/1;
  width: 100%;
  border-radius: 50%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

picture.chain-icon {
  position: absolute;
  bottom: -10%;
  right: -10%;
  max-width: 60%;
  border-radius: 50%;
  background: var(--ink);
  display: none;
}
</style>
