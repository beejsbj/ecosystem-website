<template>
  <h3 :id="id" class="firm-voice">
    <a v-if="id && generate" :href="`#${id}`">
      <slot />
    </a>
    <slot v-else />
  </h3>
</template>

<script setup lang="ts">
import { computed, useRuntimeConfig } from "#imports";

const props = defineProps<{ id?: string }>();

const { headings } = useRuntimeConfig().public.mdc;
const generate = computed(() => props.id && headings?.anchorLinks?.h3);
</script>

<style scoped>
h3 {
  margin-top: var(--space-xl);
  margin-bottom: var(--space-xs);
}
</style>
