<script setup lang="ts">
/**
 * ProseImg Component
 *
 * A component for displaying images with lightbox functionality in prose content.
 *
 * @component
 *
 * @example
 * <ProseImg src="/path/to/image.jpg" alt="Description" width="500" height="300" />
 *
 * @props
 * @prop {String} src - The source URL of the image (default: "")
 * @prop {String} alt - Alternative text for the image (default: "")
 * @prop {String|Number} width - Width of the image (optional)
 * @prop {String|Number} height - Height of the image (optional)
 *
 * @features
 * - Displays images with optional width and height
 * - Implements lightbox functionality for image viewing
 * - Handles base URL adjustments for internal images
 * - Uses NuxtImg for optimized image loading
 * - Responsive design with centered layout on larger screens
 */

import { withTrailingSlash, withLeadingSlash, joinURL } from "ufo";
import { useRuntimeConfig, computed } from "#imports";
import VueEasyLightbox from "vue-easy-lightbox";

const props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  width: {
    type: [String, Number],
    default: undefined,
  },
  height: {
    type: [String, Number],
    default: undefined,
  },
});

const refinedSrc = computed(() => {
  if (props.src?.startsWith("/") && !props.src.startsWith("//")) {
    const _base = withLeadingSlash(
      withTrailingSlash(useRuntimeConfig().app.baseURL)
    );
    if (_base !== "/" && !props.src.startsWith(_base)) {
      return joinURL(_base, props.src);
    }
  }
  return props.src;
});

//
const visibleRef = ref(false);
const indexRef = ref(0); // default 0

const onHide = () => (visibleRef.value = false);
const onShow = (index: number) => {
  indexRef.value = index;

  visibleRef.value = true;
};
</script>

<template>
  <picture @click="onShow(0)">
    <NuxtImg
      loading="lazy"
      :src="refinedSrc"
      :alt="alt"
      :width="width"
      :height="height"
    />
    <VueEasyLightbox
      :visible="visibleRef"
      :imgs="refinedSrc"
      :index="indexRef"
      @hide="onHide"
      teleport="body"
    />
  </picture>
</template>

<style scoped>
picture {
  margin-top: var(--space-l);

  @media (min-width: 768px) {
    max-width: 60%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
