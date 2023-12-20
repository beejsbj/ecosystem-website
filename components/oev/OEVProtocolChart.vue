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
        <li v-if="!protocol.hide">
          <button @click="selectedDataset = protocol.id">
            <BoxCard
              :teaser="protocol.name"
              :class="{
                'border-gradient-green': selectedDataset === protocol.id,
                'border-gradient-blue': selectedDataset !== protocol.id,
              }"
            />
          </button>
        </li>
      </template>
      <div class="actions">
        <button class="button outline" @click="selectedPeriod = 'daily'">
          <span>Daily</span>
        </button>
        <button class="button outline" @click="selectedPeriod = 'daily'">
          <span>Weekly</span>
        </button>
        <button class="button outline" @click="selectedPeriod = 'monthly'">
          <span>Montlhy</span>
        </button>
      </div>
    </ul>
    <div class="chart">
      <LineChart :data="parsed" :options="{}" :metadata="metadata" />
    </div>
  </SectionColumn>
</template>

<style scoped lang="scss">
:deep(inner-column) {
  display: grid;
  gap: var(--space-m);
  padding: var(--space-3xl) var(--space-s);

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

  &.border-gradient-blue > * {
    filter: hue-rotate(70deg);
  }
}

div.actions {
  grid-column: span 3;
  display: grid;
  grid-template-columns: subgrid;
  align-items: center;

  button {
    display: grid;
    place-items: center;
  }
}
</style>
