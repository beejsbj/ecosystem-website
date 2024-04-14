<script setup>
const hello = "hello";

definePageMeta({
  alias: ["/testing"],
});

const box = ref(true);
</script>

<template>
  <ContentsWrapper>
    <PageTitle heading="test ground" />
    <SectionColumn>
      <NuxtLink to="/style-guide">style guide</NuxtLink>
      <FeedIcon feed="aapl/usd" />
    </SectionColumn>
  </ContentsWrapper>
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
