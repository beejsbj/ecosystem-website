<script setup>
///
///
///
definePageMeta({
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

    <SectionColumn class="form-chart-section">
      <Transition name="fade" mode="out-in">
        <LazyOEVInputForm v-if="!oev.userIncentive || !oev.userTvl" />
        <LazyOEVDisplayText v-else />
      </Transition>

      <LazyOEVProtocolList />
      <LazyOEVInterfaceChart />
    </SectionColumn>

    <ClientOnly>
      <!-- <LazyOEVProtocolChart /> -->
    </ClientOnly>

    <!-- <OEVExplainerCarosel /> -->

    <!--  displaying a message about data verification -->
    <!-- <SectionColumn class="github-link-section">
      <text-content>
        <p
          :class="{
            'notice-voice': ui.isMobile,
            'attention-voice': !ui.isMobile,
          }"
        >
          You can verify this data by
          <NuxtLink
            class="text green external-link"
            to="https://github.com/AamirAlam/aave-extract-mev-funds"
          >
            heading to our GitHub.
          </NuxtLink>
        </p>
      </text-content>
    </SectionColumn> -->
  </ContentsWrapper>
</template>

<style scoped lang="scss">
:deep(inner-column) {
  @media (min-width: 768px) {
    padding: var(--space-3xl) var(--space-s);
  }
}

.form-chart-section :deep(inner-column) {
  background: var(--gradient-radial-green);
  border-radius: calc(var(--corners) * 2);
  display: grid;
  gap: var(--space-l);
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

.github-link-section {
  background: url("@/assets/images/github-graphic.svg"),
    radial-gradient(circle at bottom, transparent 20%, black 100%);
  background-repeat: no-repeat;
  background-size: 100%;
  padding-bottom: 300px;
  background-position: center;

  @media (min-width: 1000px) {
    background-position: center 10%;
  }
}
</style>
