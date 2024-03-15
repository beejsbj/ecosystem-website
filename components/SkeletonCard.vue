<script setup>
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
  //   justify-content: start;
  //   gap: var(--space-l);
}
</style>
