<script setup>
const hello = "hello";

definePageMeta({
  alias: ["/testing"],
});

const ecosystem = useEcosystemStore();
</script>

<template>
  <ContentsWrapper>
    <PageTitle heading="test ground" />
    <SectionColumn>
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
