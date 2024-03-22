<script setup>
import { CHAINS } from "@api3/chains";
// import { ChainLogo, SymbolLogo, ApiProviderLogo } from "@phase21/logos";,

definePageMeta({
  alias: ["/testing"],
});

const ecosystem = useEcosystemStore();
</script>

<template>
  <ContentsWrapper>
    <PageTitle heading="test ground" />
    <SectionColumn>
      <ul>
        <li v-for="chain in CHAINS" :key="chain.id">
          {{ chain.name }}

          <ChainIcon :chainId="chain.id" />
        </li>
      </ul>

      <NuxtLink to="/style-guide">style guide</NuxtLink>
    </SectionColumn>
  </ContentsWrapper>
</template>

<style scoped>
:deep(ul) {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-m);
}
</style>

<style></style>
