<script setup>
///
///
///
definePageMeta({
  layout: "footer-less",
  title: "OEV",
  description:
    "The OEV Watchtower helps you understand the impact of the OEV Network on your protocol.",

  alias: ["/watchtower", "/oev-watchtower"],
});
///
///
///

// Import the OEV store and initialize it
const oev = useOEVStore();

// Fetch the OEV data from the server
const { data: overview } = await useFetch("/api/oev");

// Set the fetched OEV data to the OEV store
oev.setProtocols(overview.value);

const loading = ref(true);

setTimeout(() => {
  loading.value = false;
}, 2000);
</script>

<template>
  <ContentsWrapper>
    <!-- Page Title component with heading and notice voice -->
    <PageTitle heading="OEV Watchtower">
      <p class="calm-voice">
        OEV Watchtower helps you understand how much you can capture with the
        OEV Network.
      </p>

      <!-- OEV Summary Cards component -->
      <OEVSummaryCards class="summary-cards" />

      <p class="whisper-voice disclamer">
        <!-- data starts frpm 2021 -->
        *All data is based on records from 2021 onwards.
      </p>
    </PageTitle>

    <!--  -->
    <LazyOEVInputForm />

    <LazyOEVInterfaceChart />

    <!-- displaying user's TVL and savings -->
    <LazyOEVDisplayText />

    <LazyOEVProtocolChart />

    <!--  displaying a message about data verification -->
    <SectionColumn>
      <text-content>
        <p class="firm-voice">
          You can verify this data by
          <NuxtLink
            class="text green"
            to="https://github.com/AamirAlam/aave-extract-mev-funds"
          >
            heading to our GitHub.
          </NuxtLink>
        </p>
      </text-content>
    </SectionColumn>
  </ContentsWrapper>
</template>

<style scoped lang="scss">
:deep(inner-column:not(.page-title)) {
  @media (min-width: 768px) {
    padding: var(--space-2xl) var(--space-s);
  }
}

:deep(h1) {
  text-align: center;
}

.page-title p {
  text-align: center;
}

text-content {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  text-align: center;
  @media (min-width: 768px) {
    padding: var(--space-3xl);
  }

  .loud-voice {
    @media (max-width: 400px) {
      --font-size: var(--step-2);
    }
  }
}

.disclamer {
  margin-top: var(--space-2xs);
}
</style>
