<script setup>
import { FormKitKitchenSink } from "@formkit/vue";

const ecosystem = useEcosystemStore();
</script>

<template>
  <PageTitle heading="test ground" />
  <SectionColumn>
    <!-- <FormKitKitchenSink /> -->
    <FormGuide />
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
