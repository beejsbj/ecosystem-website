<script setup>
import { CHAINS } from "@api3/chains";

const ecosystem = useEcosystemStore();
</script>

<template>
  <PageTitle heading="test ground" />
  <SectionColumn>
    <ul>
      <li v-for="chain in CHAINS" :key="chain">
        <ChainIcon :id="chain.id" />
        <!-- {{ chain }} -->
      </li>
    </ul>
  </SectionColumn>
</template>

<style scoped>
:deep(ul) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-m);
}
</style>

<style></style>
