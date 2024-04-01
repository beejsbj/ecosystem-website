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
  grid-template-columns: 0.1fr 1fr;
  margin-top: var(--space-xs);
}
</style>
