<script setup>
const props = defineProps(["protocols"]);

const selectedDataset = ref("aaveV2Eth");
const selectedPeriod = ref("daily");

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
  console.log(props.protocols);
  const protocol = props.protocols[selectedDataset.value];

  const rawData =
    selectedPeriod.value === "daily"
      ? protocol.data
      : selectedPeriod.value === "weekly"
      ? protocol.dataWeekly
      : protocol.dataMonthly;

  const dataLiquidated = rawData.map((dataPoint) => {
    return {
      x: new Date(dataPoint.date),
      y: dataPoint.totalLiquidated,
    };
  });

  const dataSentToBuilder = rawData.map((dataPoint) => {
    return {
      x: new Date(dataPoint.date),
      y: dataPoint.totalSentToBuilder,
    };
  });

  const dataOEV = rawData.map((dataPoint) => {
    return {
      x: new Date(dataPoint.date),
      y: dataPoint.withOEV,
    };
  });

  const labels =
    selectedPeriod.value === "daily"
      ? dataLiquidated.map((item) => item.x.toDateString().slice(4, 10))
      : selectedPeriod.value === "weekly"
      ? dataLiquidated.map((item) => item.x.toDateString().slice(4, 15)) //weekly
      : dataLiquidated.map(
          (item) =>
            item.x.toDateString().slice(4, 8) +
            item.x.toDateString().slice(10, 15)
        ); //monthly

  return {
    labels,
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
    <div class="chart">
      <div class="actions">
        <button class="icon" @click="selectedPeriod = 'daily'">
          <span>D</span>
        </button>
        <!-- <button class="icon">W</button> -->
        <button class="icon" @click="selectedPeriod = 'monthly'">
          <span>M</span>
        </button>
      </div>
      <pre></pre>
      <LineChart :data="parsed" :options="{}" :metadata="metadata" />
    </div>
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

.chart {
  grid-column: span 2;
}

:deep(.box-card) {
  cursor: pointer;

  &.selected {
    filter: hue-rotate(90deg);
  }
}
</style>
