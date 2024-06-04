<script setup>
import { Chart } from "chart.js";

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

const inputProtocols = computed(() => {
  const protocols = oev.protocols.filter((protocol) => !protocol.trueHide);

  protocols.map((protocol) => {
    protocol.value = protocol.slug;
    protocol.label = protocol.name;

    return protocol;
  });

  protocols.push({
    value: "Total-1",
    label: "Total",
  });
  return protocols;
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
      <h2 class="attention-voice">Historic Liquidation Data</h2>
      <div class="actions">
        <!--  -->
        <FormKit
          type="dropdown"
          v-model="selectedDataset"
          :options="inputProtocols"
          label="Select a Protocol"
        >
          <template #option="{ option }">
            <div class="icon-option">
              <IconWithChain
                v-if="option.icon"
                :image="option.icon"
                :id="option.chainId"
              />
              <span class="">
                {{ option.label }}
              </span>
            </div>
          </template>
        </FormKit>
        <!--  -->
        <FormKit type="checkbox" label="Logarithmic" v-model="isLogarithmic" />

        <FormKit
          type="radio"
          label="Select Period"
          v-model="selectedPeriod"
          :options="periodOptions"
        />

        <FormKit
          type="checkbox"
          label="Legend"
          :options="legendItems"
          v-model="legendCheckboxes"
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
  align-content: center;

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

.legend-icon {
  aspect-ratio: 1/1;
  width: 24px;
  background: var(--background);
}
</style>
