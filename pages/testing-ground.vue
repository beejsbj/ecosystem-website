<script setup>
import { CHAINS } from "@api3/chains";

definePageMeta({
  alias: ["/testing"],
});

const box = ref(true);
</script>

<template>
  <PageTitle heading="test ground" />
  <SectionColumn>
    <button class="button" @click="box = !box"></button>
  </SectionColumn>
</template>

<style scoped>
:deep(ul) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-m);
}

.box {
  width: 100px;
  height: 100px;
  background: green;
}
</style>

<style></style>
