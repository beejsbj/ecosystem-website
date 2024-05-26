<template>
  <h2 :id="id" class="attention-voice">
    <a v-if="id && generate" :href="`#${id}`">
      <slot />
    </a>
    <slot v-else />
  </h2>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h2);
</script>

<style scoped>
h2 {
  margin-top: var(--space-2xl);
  margin-bottom: var(--space-s);
}
</style>
