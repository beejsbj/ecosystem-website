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
    <!-- <Transition name="fade"> -->
    <FormKitIcon :icon="slug(props.icon)" />
    <!-- </Transition> -->
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
  display: contents;
  margin: 0;
  padding: 0;

  svg {
    margin: 0;
    padding: 0;
    max-height: unset;
    max-width: unset;
  }
}
</style>
