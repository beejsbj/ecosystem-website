<script setup>
const oev = useOEVStore();

const selectedDataset = ref("aaveV2Eth");
const selectedPeriod = ref("daily");

const periods = ["daily", "weekly", "monthly"];

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
  //   console.log(oev.protocols);
  const index = oev.protocols.findIndex(
    (protocol) => protocol.id === selectedDataset.value
  );

  const protocol = oev.protocols[index];
  //   console.log(index);
  //   console.log(oev.protocols);

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
      y: dataPoint.totalSentToBuilderUSD,
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
  <div class="chart-container lines">
    <!-- <ul> -->

    <!-- <template v-for="protocol in oev.protocols">
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
      </template> -->

    <!-- </ul> -->
    <div class="chart">
      <LineChart :data="parsed" :options="{}" :metadata="metadata" />
    </div>
    <div class="actions">
      <FormKit type="select" v-model="selectedDataset">
        <template v-for="protocol in oev.protocols">
          <option
            :key="protocol.id"
            :value="protocol.id"
            v-if="!protocol.trueHide"
          >
            {{ protocol.name }}
          </option>
        </template>
      </FormKit>
      <template v-for="period in periods">
        <button
          class="button outline"
          @click="selectedPeriod = period"
          :class="{
            hover: selectedPeriod === period,
          }"
        >
          <span>{{ period }}</span>
        </button>
      </template>
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart-container {
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
  grid-column: span 3;
}

div.actions {
  grid-column: span 3;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  align-items: center;

  button {
    display: grid;
    place-items: center;

    span {
      text-transform: capitalize;
    }
  }
}
</style>
