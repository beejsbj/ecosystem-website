<script setup lang="ts">
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
