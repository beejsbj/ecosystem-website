<script setup>
/**
 * DetailBanner Component
 * 
 * A component for displaying a large banner image for a dApp's detail page.
 *
 * @component
 *
 * @example
 * <DetailBanner :dapp="dappObject" />
 *
 * @props
 * @prop {Object} dapp - The dApp object containing image information
 *
 * @features
 * - Displays a large cover image for the dApp
 * - Uses NuxtImg for optimized image loading
 * - Implements responsive design with aspect ratio maintenance
 * - Applies border radius on larger screens for aesthetic appeal

 */

const props = defineProps(["dapp"]);
</script>

<template>
  <SectionColumn v-if="dapp" class="banner">
    <picture>
      <NuxtImg
        loading="lazy"
        :src="dapp.images.cover"
        src="/images/landscape.jpg"
        :alt="`Cover Image of ${dapp.name}`"
      />
    </picture>
  </SectionColumn>
</template>

<style lang="scss" scoped>
.banner {
  margin-top: var(--space-2xl);
  picture {
    overflow: hidden;
    aspect-ratio: 16 / 6;
    @media (min-width: 1400px) {
      border-radius: var(--corners);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }
}

:deep(inner-column) {
  max-width: 1700px;
  padding: 0;
}
</style>
