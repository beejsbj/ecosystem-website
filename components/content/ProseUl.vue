<template>
  <ul>
    <slot />
  </ul>
</template>

<style scoped>
ul {
  margin-top: var(--space-s);
  display: grid;
  gap: var(--space-xs);

  :deep(li) {
    position: relative;
    /* letter-spacing: 0.02em; */

    &::before {
      content: "";
      display: inline-block;
      width: 8px;
      height: 8px;

      position: relative;
      bottom: 3px;
      margin-right: var(--space-xs);

      background-size: cover;
      background-position: center;
      background: var(--gradient-color);
      border-radius: 50%;
    }
  }
}
</style>
