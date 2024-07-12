<script setup>
const hello = "hello";
const ui = useInterfaceStore();

definePageMeta({
  alias: ["/testing"],
});

const ecosystem = useEcosystemStore();
</script>

<template>
  <ContentsWrapper>
    <PageTitle heading="test ground" />
    <SectionColumn>
      <OEVTotalsChart />
    </SectionColumn>
  </ContentsWrapper>
</template>

<style scoped></style>

<style></style>
