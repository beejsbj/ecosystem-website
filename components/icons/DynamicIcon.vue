<script setup>
import slug from "slug";
import { FormKitIcon } from "@formkit/vue";

const props = defineProps(["icon", "width"]);
</script>

<template>
  <picture class="dynamic-icon" :class="icon">
    <!-- <NuxtImg
      loading="lazy"
      :src="`/images/icons/${slug(props.icon)}.svg`"
      :alt="props.icon"
    /> -->
    <FormKitIcon :icon="slug(props.icon)" />
  </picture>
</template>

<style scoped>
picture {
  filter: hue-rotate(var(--hue-rotate));
  /* aspect-ratio: 1/1; */

  --width: v-bind("props.width ? props.width : '24px'");

  max-width: var(--width);

  /* Calculate line width based on the width variable */
  --line-width: calc(var(--width) / 16);
}

:deep(span.formkit-icon) {
  display: block;
}
</style>
