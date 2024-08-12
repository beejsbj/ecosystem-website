<script setup>
const hello = "hello";
const ui = useInterfaceStore();

definePageMeta({
  alias: ["/testing"],
});

const ecosystem = useEcosystemStore();

const showCta = ref(true);
</script>

<template>
  <ContentsWrapper>
    <PageTitle heading="test ground" />
    <SectionColumn>
      <button @click="showCta = !showCta">CLick</button>
      <CallToAction v-if="showCta" />
    </SectionColumn>
  </ContentsWrapper>
</template>

<style scoped></style>

<style></style>
