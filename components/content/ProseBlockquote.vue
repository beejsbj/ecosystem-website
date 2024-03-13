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

  :deep(p) {
    margin: 0;
    padding: 0;
    font-style: italic;
  }
}
</style>
