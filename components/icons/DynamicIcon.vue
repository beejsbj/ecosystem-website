<script setup>
/**
 * DynamicIcon Component
 *
 * This component displays an icon using FormKitIcon, with options for customization.
 * It converts the icon name to a slug for consistency and allows for width adjustment.
 *
 * @vue-component
 *
 * @prop {string} icon - The name of the icon to display
 * @prop {string} [width='24px'] - The width of the icon (default is 24px)
 *
 * @example
 * <DynamicIcon icon="user" width="32px" />
 *
 * @features
 * - Uses FormKitIcon to render the icon
 * - Converts the icon name to a slug for consistent naming
 * - Allows customization of icon width
 * - Applies a hue rotation filter for color adjustments
 * - Calculates line width based on the icon's width
 *
 */

import slug from "slug";
import { FormKitIcon } from "@formkit/vue";

const props = defineProps(["icon", "width"]);
</script>

<template>
  <picture class="dynamic-icon" :class="icon">
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
}

:deep(span.formkit-icon) {
  display: contents;
  margin: 0;
  padding: 0;
}

:deep(svg) {
  --line-width: calc(70% / 16);
}
</style>
