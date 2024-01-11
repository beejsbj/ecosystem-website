<script setup>
definePageMeta({
  layout: "footer-less",
  title: "OEV WatchTower",
  description:
    "The OEV WatchTower is a tool to help you visualize the impact of OEV on your protocol.",
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
  <PageTitle heading="WatchTower"
    ><p class="notice-voice">
      The OEV WatchTower is a tool to help you visualize the impact of OEV on
      your protocol. The WatchTower is a tool to help you visualize the impact
      of OEV on your protocol.
    </p>

    <!-- OEV Summary Cards component -->
    <OEVSummaryCards class="summary-cards" />
  </PageTitle>

  <!--  -->
  <SectionColumn>
    <OEVInputForm />
  </SectionColumn>

  <SectionColumn inner-class="wide">
    <div class="chart-grid">
      <!-- OEV Interface Chart component -->
      <OEVInterfaceChart />
      <!-- OEV Protocol List component -->
      <OEVProtocolList />
    </div>
  </SectionColumn>

  <!-- displaying user's TVL and savings -->
  <SectionColumn>
    <text-content>
      <p class="loud-voice">
        With your liquidation of
        <span class="gradient-text-color"> ${{ userTvl.toFixed(2) }} </span>
        while using OEV share, you would save
        <span class="gradient-text-color"> ${{ userSaving.toFixed(2) }} </span>
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
        As with our data feeds, you don't need to trust our data and can verify
        it yourselves. Verify our data on GitHub using the provided link.
      </p>
    </text-content>
  </SectionColumn>
</template>

<style scoped lang="scss">
:deep(inner-column) {
  padding: var(--space-3xl) var(--space-s);
}

.chart-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: var(--space-s);

  .chart-container {
    grid-column: 1 / 4;
  }
  .protocol-list {
    grid-column: 4 / 5;
  }
}

text-content {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  text-align: center;
  padding: var(--space-3xl);
}
</style>
