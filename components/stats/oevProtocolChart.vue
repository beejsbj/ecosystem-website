<script setup>
const props = defineProps(["protocols"]);

const selectedDataset = ref("aaveV2Eth");

//
const metadata = {
  title: "Total Liquidation",
  chartColor: "blue",
  x: {
    title: "Date",
  },
  y: {
    title: "Liquidation",
  },
};

// data manipulation
const parsed = computed(() => {
  const protocol = props.protocols[selectedDataset.value];

  const dataLiquidated = protocol.data.map((dataPoint) => {
    return {
      x: new Date(dataPoint.date),
      y: dataPoint.totalLiquidated,
    };
  });

  const dataSentToBuilder = protocol.data.map((dataPoint) => {
    return {
      x: new Date(dataPoint.date),
      y: dataPoint.totalSentToBuilder,
    };
  });

  const dataOEV = protocol.data.map((dataPoint) => {
    return {
      x: new Date(dataPoint.date),
      y: dataPoint.withOEV,
    };
  });

  return {
    labels: dataLiquidated.map((item) => item.x.toDateString().slice(4, 10)),
    datasets: [
      {
        data: dataLiquidated,
        label: "Total Liquidated",
      },
      {
        data: dataSentToBuilder,
        label: "Total Sent to Builder",
      },
      {
        data: dataOEV,
        label: "With OEV",
      },
    ],
  };
});
</script>

<template>
  <SectionColumn class="single-chart" inner-class="wide">
    <ul>
      <template v-for="protocol in protocols">
        <li v-if="protocol.id != 'total'">
          <button @click="selectedDataset = protocol.id">
            <BoxCard
              :teaser="protocol.name"
              class="border-gradient-green"
              :class="{
                selected: selectedDataset === protocol.id,
              }"
            />
          </button>
        </li>
      </template>
    </ul>
    <LineChart :data="parsed" :options="{}" :metadata="metadata" />
  </SectionColumn>
</template>

<style scoped lang="scss">
:deep(inner-column) {
  display: grid;
  gap: var(--space-m);

  @media (min-width: 1000px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}

ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-xs);

  li,
  button {
    display: grid;
  }
}

:deep(.chart-container) {
  grid-column: span 2;
}

:deep(.box-card) {
  cursor: pointer;

  &.selected {
    filter: hue-rotate(90deg);
  }
}
</style>
