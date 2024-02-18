<script setup>
import { CHAINS } from "@api3/chains";

const ecosystem = useEcosystemStore();
</script>

<template>
  <PageTitle heading="test ground" />
  <SectionColumn>
    <OEVLoader />
  </SectionColumn>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: var(--space-m);
}

div {
  background: var(--green);
  aspect-ratio: 1;
  width: var(--space);
}
</style>

<style></style>
