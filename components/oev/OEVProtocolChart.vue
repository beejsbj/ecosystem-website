<script setup>
const oev = useOEVStore();

const selectedDataset = ref("aaveV2Eth");
const selectedPeriod = ref("monthly");
const isLogarithmic = ref(false);

const periods = ["daily", "weekly", "monthly", "cumulative"];

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

const options = computed(() => {
  return {
    plugins: {
      title: {
        display: false,
      },
      legend: {
        position: "right",
        align: "start",
      },
    },
    scales: {
      y: {
        type: isLogarithmic.value ? "logarithmic" : "linear",
      },
    },
    //  elements: {
    //    line: {
    //      tension: 0,
    //    },
    //  },
  };
});

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
      : selectedPeriod.value === "monthly"
      ? protocol.dataMonthly
      : protocol.dataCumulative;

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
</script>

<template>
  <div class="chart-grid">
    <h2 class="attention-voice">Historic Liquidation Data</h2>
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
    <div class="chart-container lines">
      <LineChart :data="parsed" :options="options" :metadata="metadata" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.chart-grid {
  display: grid;
  gap: var(--space-xl);
  position: relative;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    .chart-container {
      grid-column: 2 / -1;
    }
    .actions {
      grid-column: 1 / 2;
    }
  }
}
h2 {
  text-align: center;
  grid-column: 1 / -1;
}

div.actions {
  display: grid;
  align-content: center;

  @media (min-width: 768px) {
    //  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  }
  button {
    display: grid;
    place-items: center;

    span {
      text-transform: capitalize;
    }
  }
}
</style>
