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
      {
        data: dataProfit,
        label: "Total Profit",
      },
      {
        data: dataIncentive,
        label: "Total Incentive",
      },
    ],
  };
});

// const inputProtocols = oev.protocols.filter((protocol) => !protocol.trueHide);
// inputProtocols.push({
//   id: "all",
//   name: "Total",
// });
// change it to value and label

const inputProtocols = computed(() => {
  const protocols = oev.protocols.filter((protocol) => !protocol.trueHide);

  protocols.map((protocol) => {
    //  console.log(protocol);
    protocol.value = protocol.id;
    protocol.label = protocol.name;
    protocol.chainId = protocol.chainId;

    return protocol;
  });

  protocols.push({
    value: "all",
    label: "Total",
  });
  return protocols;
});
</script>

<template>
  <SectionColumn inner-class="wide">
    <div class="chart-grid">
      <h2 class="attention-voice">Historic Liquidation Data</h2>
      <div class="actions">
        <FormKit
          type="dropdown"
          v-model="selectedDataset"
          :options="inputProtocols"
        >
          <template #option="{ option }">
            <div class="protocol-option">
              <ChainIcon v-if="option.chainId" :id="option.chainId" />
              <DynamicIcon v-else icon="dapp" />
              <span class="whisper-voice">
                {{ option.label }}
              </span>
            </div>
          </template>
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
  </SectionColumn>
</template>

<style scoped lang="scss">
.chart-grid {
  display: grid;
  gap: var(--space-xl);
  position: relative;

  @media (min-width: 768px) {
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
  align-content: center;

  @media (min-width: 768px) {
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

.protocol-option {
  display: grid;
  align-items: center;

  grid-template-columns: 24px 1fr;
  gap: var(--space-3xs);
  padding: var(--space-2xs);
}
</style>
