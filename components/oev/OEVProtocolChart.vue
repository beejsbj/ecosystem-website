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

console.log(rawData);

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

  const dataOevLost = rawData.value.map((dataPoint) => {
    return {
      x: new Date(dataPoint[0]),
      y: dataPoint[5],
    };
  });

  let labels = dataLiquidated.map(
    (item) =>
      item.x.toDateString().slice(4, 8) + item.x.toDateString().slice(8, 15)
  );

  return {
    labels,
    datasets: [
      {
        data: dataLiquidated,
        label: "Total Liquidated",
        order: 4,
      },
      {
        data: dataOevLost,
        label: "Potential OEV Lost",
        order: 3,
      },
      {
        data: dataSentToBuilder,
        label: "Blockspace Auction Bribes",
        hidden: true,
        order: 1,
      },
      {
        data: dataProfit,
        label: "Liquidator Profits",
        hidden: true,
        order: 2,
      },
      // {
      //   data: dataIncentive,
      //   label: "Incentives",
      //   hidden: true,
      // },
    ],
  };
});

// legend items

const legendItems = ref([]);
const legendCheckboxes = ref([0, 1]);

function toggleDataset(index) {
  const chart = Chart.getChart("line-chart");
  chart.setDatasetVisibility(index, !chart.isDatasetVisible(index));
  chart.update();
}

onMounted(() => {
  const chart = Chart.getChart("line-chart");
  const items = chart.options.plugins.legend.labels.generateLabels(chart);

  const options = items.map((item, index) => {
    const color = `${item.strokeStyle}`;
    return {
      label: item.text,
      value: item.datasetIndex,
      datasetIndex: item.datasetIndex,
      fillStyle: color,
      help:
        index === 1 ? "(Blockspace auction bribes + Liquidater Profits)" : null,
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
      <FormKit
        type="checkbox"
        label="Legend"
        :options="legendItems"
        v-model="legendCheckboxes"
        v-if="ui.isDesktop"
      >
        <template #label="{ option }">
          <div class="icon-option" :style="`--color: ${option.fillStyle}`">
            <div class="legend-icon"></div>
            <span class="formkit-label">
              {{ option.label }}
            </span>
          </div>
        </template>
      </FormKit>
      <div class="actions">
        <!--  -->
        <OEVProtocolDropdown
          v-model="selectedDataset"
          label="Select Protocol"
        />
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
                :style="`--color: ${option.fillStyle}`"
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
  gap: var(--space-l);
  position: relative;
  user-select: none;

  > .formkit-outer {
    grid-column: 1 / -1;
    justify-self: center;

    :deep(.formkit-options) {
      display: flex;
      gap: var(--space-m);
    }
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(12, 1fr);

    .chart-container {
      grid-column: span 9;
    }
    .actions {
      grid-column: span 3;
    }
  }
}
h2 {
  text-align: center;
  grid-column: 1 / -1;
}

div.actions {
  display: grid;
  gap: var(--space-xl);
  align-content: start;
  grid-template-columns: 1fr 1.5fr;
  margin-top: var(--space-l);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr 1fr;
    padding-inline: var(--space-l);
  }

  .formkit-outer:nth-child(1),
  .formkit-outer:nth-child(2) {
    grid-column: 1 / -1;
    max-width: 500px;
  }
  .formkit-outer:nth-child(4) {
    grid-column: 2 / span 2;
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
    padding-block: 0;
  }
}
</style>
