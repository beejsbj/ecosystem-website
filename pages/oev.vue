<script setup>
definePageMeta({
  title: "OEV",
  layout: "footer-less",
  description:
    "The OEV Watchtower helps you understand the impact of the OEV Network on your protocol.",

  alias: ["/watchtower", "/oev-watchtower"],
});

// Import the OEV store and initialize it
const oev = useOEVStore();
const ui = useInterfaceStore();

// Fetch the OEV data from the server
const { data: overview, error } = await useFetch("/api/oev");

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

:deep(.legend-icon) {
  --direction: 150deg;

  aspect-ratio: 1/1;
  width: 18px;
  flex-shrink: 0;

  border-radius: 1px;
  border: 1px solid;

  background: linear-gradient(var(--direction), var(--color), transparent);

  border-image: linear-gradient(
      var(--direction),
      color-mix(in hsl, var(--color), white 35%),
      color-mix(in hsl, var(--color), black 70%)
    )
    1;
}

:deep(fieldset.formkit-fieldset) {
  display: flex;
  align-items: center;
}
</style>
