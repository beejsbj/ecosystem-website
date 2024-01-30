<script setup>
const oev = useOEVStore();

const selectedDataset = ref("aaveV2Eth");
const selectedPeriod = ref("monthly");
const isLogarithmic = ref(false);

const periods = ["daily", "weekly", "monthly"];

//
const metadata = {
  title: "Historic Liquidation Data",
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
        data: dataSentToBuilder,
        label: "Total Sent to Builder",
      },
      {
        data: dataLiquidated,
        label: "Total Liquidated",
      },
      // {
      //   data: dataOEV,
      //   label: "With OEV",
      // },
    ],
  };
});

const options = computed(() => {
  return {
    scales: {
      y: {
        type: isLogarithmic.value ? "logarithmic" : "linear",
      },
    },
  };
});
</script>

<template>
  <div class="chart-container lines">
    <div class="chart">
      <LineChart :data="parsed" :options="options" :metadata="metadata" />
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
      <button
        class="button outline log"
        @click="isLogarithmic = !isLogarithmic"
        :class="{
          hover: isLogarithmic,
        }"
      >
        <span>Logarithmic</span>
      </button>
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
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  }
  button {
    display: grid;
    place-items: center;

    span {
      text-transform: capitalize;
    }
  }
  .log {
    @media (min-width: 768px) {
      margin-left: var(--space-xs);
      position: relative;
      &::before {
        content: "";
        position: absolute;
        left: calc((var(--space-s) + var(--space-xs)) * -1 / 2);
        top: 0;
        width: var(--line-width);
        height: 100%;
        background: var(--ink);
      }
    }
  }
}
</style>
