<script setup>
const oev = useOEVStore();
const ui = useInterfaceStore();

const selectedDataset = ref("aaveV2Eth-1");
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
      // legend: {
      //   position: "right",
      //   align: "start",
      // },
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

// fetch
//   /api/oev/chart?protocolId=aaveV2Eth-1&&period=daily

const apiString = computed(() => {
  return `/api/oev/chart?protocolId=${selectedDataset.value}&&period=${selectedPeriod.value}`;
});
const { data: rawData } = await useFetch(apiString);

// data manipulation
const parsed = computed(() => {
  //   console.log(oev.protocols);
  const protocol = oev.getProtocolById(selectedDataset.value);

  const dataLiquidated = rawData.value.map((dataPoint) => {
    return {
      x: new Date(dataPoint[0]),
      y: dataPoint[1],
    };
  });

  const dataSentToBuilder = rawData.value.map((dataPoint) => {
    return {
      x: new Date(dataPoint[0]),
      y: dataPoint[2],
    };
  });

  console.log(dataLiquidated);

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
            :selected="protocol.id === selectedDataset"
          >
            {{ protocol.name }}
          </option>
        </template>

        <!-- total all -->
        <option :key="'all'" :value="'all'">Total</option>
      </FormKit>
      <div class="buttons-content">
        <template v-for="period in periods">
          <button
            class="button outline"
            @click="selectedPeriod = period"
            :class="{
              hover: selectedPeriod === period,
            }"
          >
            <span>{{ ui.isMobile ? period.slice(0, 1) : period }}</span>
          </button>
        </template>
        <button
          class="button outline log"
          @click="isLogarithmic = !isLogarithmic"
          :class="{
            hover: isLogarithmic,
          }"
        >
          <span>
            {{ ui.isMobile ? "log" : "logarithmic" }}
          </span>
        </button>
      </div>
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

  .buttons-content {
    display: flex;
    justify-content: space-between;
    @media (min-width: 768px) {
      display: contents;
    }
  }

  button {
    display: grid;
    place-items: center;

    @media (max-width: 768px) {
      padding: 0.5em 1.5em;
    }

    span {
      text-transform: capitalize;
    }
  }
}
</style>
