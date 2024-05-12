<script setup>
const props = defineProps(["dapp", "proxy"]);

const isLogarithmic = ref(false);

const mockData = [
  {
    value: 3032.4767,
    timestamp: "2024-04-17 14:05:01",
    transactionId:
      "0x87277c903b0b0a30b62fc5eefabc3f0733f8273bfd43c142d3b673c8c45bbffc",
  },
  {
    value: 3002.3068,
    timestamp: "2024-04-17 13:56:34",
    transactionId:
      "0x39f8d88ceacc0d3743680c6c6ae57099bf32a9095ae3821c07abca1c21e04b3f",
  },
  {
    value: 2972.1199,
    timestamp: "2024-04-17 12:12:04",
    transactionId:
      "0x13613410544c271d75d3c0f20a8c1ad2f2056d03f8f74f157b9a6aa5445c32f2",
  },
  {
    value: 2939.51,
    timestamp: "2024-04-17 11:32:32",
    transactionId:
      "0x833b5626f7eda42d8ec1c03308d8e1c4ef2648b0244271cd715bbacc513c7226",
  },
  {
    value: 2970.93,
    timestamp: "2024-04-17 11:03:34",
    transactionId:
      "0x9b5eca6dc54dc48b727ad85c85dac876df7e9c40926ba6399b3b2049200fabbd",
  },
  {
    value: 2982.14,
    timestamp: "2024-04-17 10:45:12",
    transactionId:
      "0x9b5eca6dc54dc48b727ad85c85dac876df7e9c40926ba6399b3b2049200fabbe",
  },
  {
    value: 2962.4,
    timestamp: "2024-04-17 10:15:34",
    transactionId:
      "0x9b5eca6dc54dc48b727ad85c85dac876df7e9c40926ba6399b3b2049200fabbf",
  },

  {
    value: 2965.7,
    timestamp: "2024-04-17 09:45:34",
    transactionId:
      "0x9b5eca6dc54dc48b727ad85c85dac876df7e9c40926ba6399b3b2049200fabc0",
  },
  {
    value: 2970.3,
    timestamp: "2024-04-17 09:15:34",
    transactionId:
      "0x9b5eca6dc54dc48b727ad85c85dac876df7e9c40926ba6399b3b2049200fabc1",
  },
  {
    value: 2992.1,
    timestamp: "2024-04-17 08:45:34",
    transactionId:
      "0x9b5eca6dc54dc48b727ad85c85dac876df7e9c40926ba6399b3b2049200fabc2",
  },
  {
    value: 3190.3,
    timestamp: "2024-04-17 08:15:34",
    transactionId:
      "0x9b5eca6dc54dc48b727ad85c85dac876df7e9c40926ba6399b3b2049200fabc3",
  },
  {
    value: 2899.3,
    timestamp: "2024-04-17 07:45:34",
    transactionId:
      "0x9b5eca6dc54dc48b727ad85c85dac876df7e9c40926ba6399b3b2049200fabc4",
  },
];

const metadata = {
  title: "OEV over time",
  chartColor: "green",
  x: {
    title: "Time",
  },
  y: {
    title: "OEV",
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
      x: {
        //   ticks: {
        //     callback: function (value, index, values) {
        //       console.log(value, index, values);
        //       // return value;
        //     },
        //   },
      },
      y: {
        type: isLogarithmic.value ? "logarithmic" : "linear",

        ticks: {
          callback: function (value, index, values) {
            return "$" + value.toFixed(2);
          },
        },
      },
    },
    //  elements: {
    //    line: {
    //      tension: 0,
    //    },
    //  },
  };
});

const parsed = computed(() => {
  //labels are dates

  const data = mockData.map((dataPoint) => {
    return {
      x: new Date(dataPoint.timestamp),
      y: dataPoint.value,
      // id: dataPoint.transactionId,
    };
  });

  data.sort((a, b) => a.x - b.x);

  const labels = data.map((dataPoint) => {
    return (
      dataPoint.x.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }) +
      " " +
      dataPoint.x.toLocaleTimeString("en-GB")
    );
  });

  return {
    labels,
    datasets: [
      {
        data: data,
        label: "OEV",
        stepped: true,
      },
    ],
  };
});
</script>

<template>
  <div class="feed-oev-chart">
    <h2 class="teaser-voice">OEV over time</h2>

    <div class="chart-container lines">
      <ClientOnly>
        <LineChart :data="parsed" :options="options" :metadata="metadata" />
      </ClientOnly>
    </div>
  </div>
</template>

<style scoped lang="scss">
.feed-oev-chart {
  display: grid;
  gap: var(--space-s);
  padding: var(--space-m);
  background: var(--paper);

  border: var(--border-dark);
  border-radius: var(--corners);
}
</style>
