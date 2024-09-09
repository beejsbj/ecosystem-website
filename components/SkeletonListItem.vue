<script setup>
/**
 * SkeletonListItem Component
 *
 * A placeholder component that displays a loading skeleton for a list item.
 *
 * @component
 *
 * @example
 * <SkeletonListItem />
 *
 * @features
 * - Displays a skeleton layout for a list item with a header and content
 * - Uses Skeletor component for animated loading placeholders
 *
 * @dependencies
 * - vue-skeletor: Provides the Skeletor component for skeleton UI
 */
import { Skeletor } from "vue-skeletor";
</script>

<template>
  <div class="header">
    <Skeletor circle size="25" />
    <Skeletor pill />
  </div>
</template>

<style scoped lang="scss">
.header {
  display: grid;
  align-items: center;
  grid-template-columns: 0.2fr 1fr;
  margin-top: var(--space-xs);
  min-width: 100px;
}
</style>
