<script setup>
definePageMeta({
  title: "OEV WatchTower",
  layout: "footer-less",
});

// Fetch data from the content/oev-data which contains the json files
const oevRaw = await queryContent("oev-data").find();

const oev = useOEVStore();

oev.setProtocols(oevRaw);
</script>

<template>
  <PageTitle heading="WatchTower"
    ><p class="notice-voice">
      The OEV WatchTower is a tool to help you visualize the impact of OEV on
      your protocol. The WatchTower is a tool to help you visualize the impact
      of OEV on your protocol.
    </p></PageTitle
  >
  <SectionColumn inner-class="wide">
    <div class="oev-grid">
      <OEVSummaryCards class="summary-cards" />

      <OEVInputForm />
      <OEVProtocolList />

      <OEVInterfaceChart />

      <OEVProtocolChart />

      <text-content>
        <p class="firm-voice">
          As with our datafeeds you don't need to trust our data and can verify
          it yourselves. Verify our data github link
        </p>
      </text-content>
    </div>
  </SectionColumn>
</template>

<style scoped lang="scss">
.oev-grid {
  display: grid;
  gap: var(--space-m);

  grid-template-columns: repeat(12, 1fr);
}

:deep(.summary-cards) {
  grid-column: 1 / 10;
  align-self: start;
}

:deep(form) {
  grid-column: 10 / -1;
}

:deep(.protocol-list) {
  grid-column: 10 / -1;
}

:deep(.chart-container.bars) {
  grid-column: 1 / 10;
  grid-row: 2 / 3;
  align-self: start;
}

:deep(.chart-container.lines) {
  grid-column: 1 / 12;
  grid-row: 3 / 4;
}

text-content {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  text-align: center;
  padding: var(--space-3xl);
}
</style>
