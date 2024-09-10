<script setup>
/**
 * DappScreenshots Component
 *
 * A component for displaying a grid of dApp screenshots with lightbox functionality.
 *
 * @component
 *
 * @example
 * <DappScreenshots :dapp="dappObject" />
 *
 * @props
 * @prop {Object} dapp - The dApp object containing screenshot images
 *
 * @features
 * - Displays a responsive grid of dApp screenshots
 * - Implements lightbox functionality for full-screen image viewing
 * - Allows navigation through screenshots in lightbox mode
 * - Responsive design adapting to different screen sizes
 */

import VueEasyLightbox from "vue-easy-lightbox";

const props = defineProps(["dapp"]);

const visibleRef = ref(false);
const indexRef = ref(0); // default 0

const onHide = () => (visibleRef.value = false);
const onShow = (index) => {
  indexRef.value = index;
  visibleRef.value = true;
};
</script>

<template>
  <section class="screenshots">
    <h2 class="attention-voice">Screenshots</h2>
    <ul class="image-grid">
      <li
        v-for="(image, index) in dapp?.images.screenshots"
        :key="image"
        @click="onShow(index)"
      >
        <NuxtImg loading="lazy" :src="image" alt="Screenshots" />
      </li>

      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="dapp?.images.screenshots"
        :index="indexRef"
        @hide="onHide"
        teleport="body"
      />
    </ul>
  </section>
</template>

<style scoped lang="scss">
.image-grid {
  display: grid;
  gap: var(--space-s);
  grid-template-columns: repeat(auto-fit, minmax(min(500px, 100%), 1fr));
  grid-template-rows: auto auto;

  li {
    cursor: pointer;
    border-radius: var(--corners);
    overflow: hidden;
    aspect-ratio: 16/9;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
}
</style>
