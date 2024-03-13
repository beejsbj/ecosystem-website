<script setup lang="ts">
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
