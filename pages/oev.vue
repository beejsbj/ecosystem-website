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

    <ClientOnly>
      <!-- <LazyOEVTotalsChart /> -->
    </ClientOnly>

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
    padding: var(--space-2xl) var(--space-l);
  }
}

:deep(.attention-voice:not(h1)) {
  @media (max-width: 768px) {
    --font-size: var(--step-1);
  }
}

:deep(.firm-voice) {
  @media (max-width: 768px) {
    font-size: calc((var(--step-1) + var(--step-0)) / 2);
  }
}
</style>
