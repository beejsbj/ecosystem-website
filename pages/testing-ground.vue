<script setup>
import { CHAINS } from "@api3/chains";

definePageMeta({
  alias: ["/testing"],
});

const ecosystem = useEcosystemStore();
</script>

<template>
  <PageTitle heading="test ground" />
  <SectionColumn> </SectionColumn>
</template>

<style scoped>
:deep(ul) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-m);
}
</style>

<style></style>
