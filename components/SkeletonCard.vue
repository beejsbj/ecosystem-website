<script setup>
/**
 * SkeletonCard Component
 *
 * A placeholder component that displays a loading skeleton for a card layout.
 *
 * @component
 *
 * @example
 * <SkeletonCard />
 *
 * @features
 * - Displays a skeleton layout for a card with a header and content
 * - Uses Skeletor component for animated loading placeholders
 * - Responsive design that matches the actual card layout
 *
 * @dependencies
 * - vue-skeletor: Provides the Skeletor component for skeleton UI
 */

import { Skeletor } from "vue-skeletor";
</script>

<template>
  <div class="card">
    <div class="header">
      <Skeletor circle size="50" />
      <Skeletor pill />
    </div>

    <Skeletor pill />

    <Skeletor pill />
  </div>
</template>

<style scoped lang="scss">
div.card {
  padding: var(--space-l);
  border-radius: var(--corners);
  background: var(--paper);
  border: var(--border-dark);
  min-height: 250px;
  display: grid;
  gap: var(--space-s);
}

.header {
  display: grid;
  align-items: center;
  grid-template-columns: 0.1fr 1fr;
}
</style>
