<script setup>
///
///
///
definePageMeta({
  title: "OEV",
  layout: "footer-less",
  description:
    "The OEV Watchtower helps you understand the impact of the OEV Network on your protocol.",

  alias: ["/watchtower", "/oev-watchtower"],
});
///
///
///

// Import the OEV store and initialize it
const oev = useOEVStore();
const ui = useInterfaceStore();

// Fetch the OEV data from the server
const { data: overview } = await useFetch("/api/oev");

// Set the fetched OEV data to the OEV store
oev.setProtocols(overview.value);
</script>

<template>
  <ContentsWrapper>
    <!-- Page Title component with heading and notice voice -->

    <OEVHero />

    <OEVFormChartSection />

    <ClientOnly>
      <LazyOEVProtocolChart />
    </ClientOnly>
    <LazyOEVExplainerCarosel />

    <OEVGithubLinkSection />
  </ContentsWrapper>
</template>

<style scoped>
:deep(inner-column) {
  @media (min-width: 768px) {
    padding: var(--space-3xl) var(--space-s);
  }
}
</style>
