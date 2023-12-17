<script setup>
import slug from "slug";

const ecosystem = useEcosystemStore();

const props = defineProps(["icon", "fill", "stroke"]);
</script>

<template>
  <picture v-tooltip="ecosystem?.productTypeToLabel?.[dapp?.productType]">
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
}
</style>
