<script setup>
definePageMeta({
  title: "OEV WatchTower",
  layout: "footer-less",
});

// Fetch data from the content/oev-data which contains the json files
const oevRaw = await queryContent("oev-data").find();

const oev = useOEVStore();

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

oev.setProtocols(oevRaw);
</script>

<template>
  <PageTitle heading="WatchTower"
    ><p class="notice-voice">
      The OEV WatchTower is a tool to help you visualize the impact of OEV on
      your protocol. The WatchTower is a tool to help you visualize the impact
      of OEV on your protocol.
    </p>

    <OEVSummaryCards class="summary-cards" />
  </PageTitle>

  <SectionColumn>
    <OEVInputForm />
  </SectionColumn>

  <SectionColumn inner-class="wide">
    <div class="chart-grid">
      <OEVInterfaceChart />
      <OEVProtocolList />
    </div>
  </SectionColumn>
  <SectionColumn>
    <text-content>
      <p class="loud-voice">
        With your liquitation of
        <span class="gradient-text-color"> ${{ userTvl.toFixed(2) }} </span>
        While using OEV share you would save
        <span class="gradient-text-color"> ${{ userSaving.toFixed(2) }} </span>
      </p>
    </text-content>
  </SectionColumn>
  <SectionColumn inner-class="wide">
    <OEVProtocolChart />
  </SectionColumn>
  <SectionColumn>
    <text-content>
      <p class="firm-voice">
        As with our datafeeds you don't need to trust our data and can verify it
        yourselves. Verify our data github link
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
