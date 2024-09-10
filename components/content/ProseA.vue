<script setup lang="ts">
/**
 * ProseA Component
 *
 * A wrapper component for rendering links in prose content, utilizing NuxtLink for internal/external navigation.
 *
 * @component
 *
 * @example
 * <ProseA href="/some-page" target="_blank">Link Text</ProseA>
 *
 * @props
 * @prop {String} href - The URL for the link (required)
 * @prop {String} target - The target attribute for the link (optional)
 *
 */

defineProps({
  href: {
    type: String,
    default: "",
  },
  target: {
    type: String,
    default: undefined,
    required: false,
  },
});
</script>

<template>
  <NuxtLink :href="href" :target="target" class="text green">
    <slot />
  </NuxtLink>
</template>

<style scoped>
a {
  /* white-space: pre-wrap; */
  word-wrap: break-word;
}
</style>
