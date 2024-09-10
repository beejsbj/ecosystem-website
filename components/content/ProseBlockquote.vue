<script setup>
/**
 * ProseBlockquote Component
 *
 * A styled blockquote component for use in prose or rich text content.
 *
 * @component
 *
 * @example
 * <ProseBlockquote>
 *   <p>This is a quoted text.</p>
 * </ProseBlockquote>
 *
 * @slots
 * default - Content to be displayed within the blockquote
 *
 */
</script>

<template>
  <blockquote>
    <slot />
  </blockquote>
</template>

<style scoped lang="scss">
blockquote {
  margin: var(--space-l) 0;
  padding: var(--space-s);
  background: var(--gradient-dark);
  display: block;
  color: var(--ink);
  position: relative;
  border-radius: var(--corners);
  z-index: 1;
  border-right: var(--border-color);

  :deep(p) {
    margin: 0;
    padding: 0;
    font-style: italic;
    word-break: break-all;
  }
}
</style>
