<script setup>
import { Chart } from "chart.js";
import OEVProtocolDropdown from "./OEVProtocolDropdown.vue";

const oev = useOEVStore();
const ui = useInterfaceStore();

const selectedDataset = ref("aaveV2-1");
const selectedPeriod = ref("cumulative");
const isLogarithmic = ref(false);

const periodOptions = [
  {
    value: "daily",
    label: "Daily",
  },
  {
    value: "weekly",
    label: "Weekly",
  },
  {
    value: "monthly",
    label: "Monthly",
  },
  {
    value: "cumulative",
    label: "Cumulative",
  },
];

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
        display: false,
      },

      zoom: {
        enabled: true,
        //   pan: {
        //     enabled: true,
        //     mode: 'x',
        //     modifierKey: 'ctrl',
        //   },
        zoom: {
          drag: {
            enabled: true,
          },
          mode: "x",
        },
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

// fetch
//   /api/oev/chart?protocolId=aaveV2Eth-1&&period=daily

const apiString = computed(() => {
  return `/api/oev/chart?protocolId=${selectedDataset.value}&&period=${selectedPeriod.value}`;
});
const { data: rawData } = await useFetch(apiString);

// data manipulation
const parsed = computed(() => {
  const protocol = oev.getProtocolBySlug(selectedDataset.value);

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

  const dataProfit = rawData.value.map((dataPoint) => {
    return {
      x: new Date(dataPoint[0]),
      y: dataPoint[3],
    };
  });

  const dataIncentive = rawData.value.map((dataPoint) => {
    return {
      x: new Date(dataPoint[0]),
      y: dataPoint[4],
    };
  });

  let labels;

  if (
    selectedPeriod.value === "daily" ||
    selectedPeriod.value === "cumulative"
  ) {
    labels = dataLiquidated.map((item) => item.x.toDateString().slice(4, 10));
  }

  if (selectedPeriod.value === "weekly") {
    labels = dataLiquidated.map((item) => item.x.toDateString().slice(4, 15));
  }

  if (selectedPeriod.value === "monthly") {
    labels = dataLiquidated.map(
      (item) =>
        item.x.toDateString().slice(4, 8) + item.x.toDateString().slice(10, 15)
    );
  }

  return {
    labels,
    datasets: [
      {
        data: dataSentToBuilder,
        label: "Total Sent to Builder",
        hidden: true,
      },
      {
        data: dataProfit,
        label: "Total Profit",
        hidden: true,
      },

      {
        data: dataIncentive,
        label: "Total Incentive",
      },
      {
        data: dataLiquidated,
        label: "Total Liquidated",
      },
    ],
  };
});

// legend items

const legendItems = ref([]);
const legendCheckboxes = ref([2, 3]);

function toggleDataset(index) {
  const chart = Chart.getChart("line-chart");
  chart.setDatasetVisibility(index, !chart.isDatasetVisible(index));
  chart.update();
}

onMounted(() => {
  const chart = Chart.getChart("line-chart");
  const items = chart.options.plugins.legend.labels.generateLabels(chart);

  const options = items.map((item, index) => {
    return {
      label: item.text,
      value: item.datasetIndex,
      datasetIndex: item.datasetIndex,
      fillStyle: item.fillStyle,
      attrs: {
        onchange: () => {
          toggleDataset(item.datasetIndex);
        },
      },
    };
  });

  legendItems.value = options;
});
</script>

<template>
  <SectionColumn inner-class="wide">
    <div class="chart-grid">
      <h2 class="firm-voice">Historic Liquidation Data</h2>
      <FormKit
        type="checkbox"
        label="Legend"
        :options="legendItems"
        v-model="legendCheckboxes"
        v-if="ui.isDesktop"
      >
        <template #label="{ option }">
          <div class="icon-option">
            <div
              class="legend-icon"
              :style="`background-color: ${option.fillStyle}`"
            ></div>
            <span class="formkit-label">
              {{ option.label }}
            </span>
          </div>
        </template>
      </FormKit>
      <div class="actions">
        <!--  -->
        <OEVProtocolDropdown v-model="selectedDataset" />
        <!--  -->
        <FormKit
          name="logarithmic-checkbox"
          type="checkbox"
          label="Logarithmic"
          v-model="isLogarithmic"
        />
        <!--  -->
        <FormKit
          type="radio"
          label="Select Period"
          legend-class="$reset firm-voice-smaller"
          v-model="selectedPeriod"
          :options="periodOptions"
        />
        <!--  -->
        <FormKit
          type="checkbox"
          label="Legend"
          :options="legendItems"
          v-model="legendCheckboxes"
          v-if="!ui.isDesktop"
        >
          <template #label="{ option }">
            <div class="icon-option">
              <div
                class="legend-icon"
                :style="`background-color: ${option.fillStyle}`"
              ></div>
              <span class="formkit-label">
                {{ option.label }}
              </span>
            </div>
          </template>
        </FormKit>
      </div>
      <div class="chart-container lines">
        <LineChart :data="parsed" :options="options" :metadata="metadata" />
      </div>
    </div>
  </SectionColumn>
</template>

<style scoped lang="scss">
.chart-grid {
  display: grid;
  gap: var(--space-xl);
  position: relative;

  .actions {
    order: 2;
  }

  > .formkit-outer {
    grid-column: 1 / -1;
    justify-self: center;

    :deep(.formkit-options) {
      display: flex;
      gap: var(--space-m);
      // justify-content: center;
    }
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(12, 1fr);

    .chart-container {
      grid-column: span 9;
    }
    .actions {
      grid-column: span 3;
      order: unset;
    }
  }
}
h2 {
  text-align: center;
  grid-column: 1 / -1;
}

div.actions {
  display: grid;
  gap: var(--space-m);
  align-content: start;
  grid-template-columns: 1fr 1.5fr;

  @media (min-width: 768px) {
    grid-template-columns: unset;
  }

  .formkit-outer:nth-child(1),
  .formkit-outer:nth-child(2) {
    grid-column: 1 / -1;
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

  .formkit-outer:nth-child(4) :deep(.icon-option) {
    padding: 0;
  }
}

.legend-icon {
  aspect-ratio: 1/1;
  min-width: 18px;
  max-width: 18px;
  background: var(--background);
}
</style>
