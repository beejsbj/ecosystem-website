<script setup>
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
