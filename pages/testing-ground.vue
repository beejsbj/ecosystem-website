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
      <button class="button" @click="notify('hello world')">default</button>
      <button class="button" @click="notify.success('hello world')">
        sucess
      </button>
      <button class="button" @click="notify.error('hello world')">error</button>
      <button class="button" @click="notify.warn('hello world')">warn</button>
      <button class="button" @click="notify.info('hello world')">info</button>
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
