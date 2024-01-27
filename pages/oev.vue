<script setup>
definePageMeta({
  layout: "footer-less",
  title: "OEV",
  description:
    "The OEV Watchtower helps you understand the impact of the OEV Network on your protocol.",

  aliases: ["/watchtower", "/oev-watchtower"],
});

// Fetch data from the content/oev-data which contains the json files
const oevRaw = await queryContent("oev-data").find();

// Import the OEV store and initialize it
const oev = useOEVStore();

// Compute the user's total liquidated value (tvl) and total savings using OEV
const userTvl = computed(() =>
  oev.getProtocolById("userAdded") === undefined
    ? 0
    : oev.getProtocolById("userAdded").totalLiquidated
);
const userSaving = computed(() =>
  oev.getProtocolById("userAdded") === undefined
    ? 0
    : oev.getProtocolById("userAdded").totalSentToBuilderUSD
);

// Set the fetched OEV data to the OEV store
oev.setProtocols(oevRaw);
</script>

<template>
  <!-- Page Title component with heading and notice voice -->
  <PageTitle heading="OEV Watchtower">
    <p class="notice-voice">
      Understand how much you
      can capture with the OEV Network. 
    </p>

    <!-- OEV Summary Cards component -->
    <OEVSummaryCards class="summary-cards" />
  </PageTitle>

  <!--  -->
  <SectionColumn>
    <LazyOEVInputForm />
  </SectionColumn>

  <SectionColumn inner-class="wide">
    <div class="chart-grid">
      <!-- OEV Interface Chart component -->
      <OEVInterfaceChart />
      <!-- OEV Protocol List component -->
      <LazyOEVProtocolList />
    </div>
  </SectionColumn>

  <!-- displaying user's TVL and savings -->
  <SectionColumn>
    <text-content>
      <p class="loud-voice">
        With your TVL of
        <span class="gradient-text-color"> ${{ userTvl.toFixed(2) }} </span>
        you would capture
        <span class="gradient-text-color"> ${{ userSaving.toFixed(2) }} </span>
        through the OEV Network
      </p>
    </text-content>
  </SectionColumn>

  <SectionColumn inner-class="wide">
    <OEVProtocolChart />
  </SectionColumn>

  <!--  displaying a message about data verification -->
  <SectionColumn>
    <text-content>
      <p class="firm-voice">
        You can verify this data yourself by heading to our GitHub. 
        
      </p>
    </text-content>
  </SectionColumn>
</template>

<style scoped lang="scss">
:deep(inner-column:not(.page-title)) {
  padding: var(--space-3xl) var(--space-s);
}

.chart-grid {
  display: grid;
  gap: var(--space-s);
  position: relative;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    .chart-container {
      grid-column: 1 / 4;
    }
    .protocol-list {
      grid-column: 4 / 5;
    }
  }
}

text-content {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  text-align: center;
  //   padding: var(--space-s);

  @media (min-width: 768px) {
    padding: var(--space-3xl);
  }

  .loud-voice {
    @media (max-width: 400px) {
      // --font-size: var(--step-2);
    }
  }
}
</style>
