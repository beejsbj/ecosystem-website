<script setup>
import slug from "slug";

const ecosystem = useEcosystemStore();

const props = defineProps(["icon", "fill", "stroke"]);
</script>

<template>
  <picture v-tooltip="icon">
    <NuxtImg
      loading="lazy"
      :src="`/images/icons/${slug(props.icon)}.svg`"
      :alt="props.icon"
    />
  </picture>
</template>

<style scoped>
picture {
  filter: hue-rotate(var(--hue-rotate));
  aspect-ratio: 1/1;
  width: 24px;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
