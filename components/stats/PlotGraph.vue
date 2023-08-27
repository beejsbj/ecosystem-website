<script setup>
const { $plotly: Plotly } = useNuxtApp();

const { data } = useFetch(
  "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/115/card/120?parameters=%5B%5D"
);
const rows = computed(() => {
  const filterAbove6000 = data.value.data.rows.filter((row) => row[0] > 6000);
  return data.value.data.rows;
});
const columns = computed(() => data.value.data.columns);

var plotData = computed(() => {
  return [
    {
      values: rows.value.map((row) => row[0]),
      labels: rows.value.map((row) => row[1]),
      type: "pie",

      textinfo: "label+value",
      text: "QRNG",

      hoverinfo: "percent",

      hole: 0.4,

      // transforms: [
      //   {
      //     type: "filter",
      //     target: rows.value.map((row) => row[0]),
      //     operation: "<",
      //     value: 6000,
      //   },
      //   {
      //     type: "groupby",
      //     groups: rows.value.map((row) => row[1]),
      //     styles: [{ target: "other", value: { marker: { color: "gray" } } }],
      //   },
      // ],
    },
  ];
});

const layout = {
  font: {
    // family : 'Inter',
    color: "hsla(160, 0%, 94%, 1)",
  },

  colorway: [
    "hsla(160, 64%, 69%, 1)",
    "hsla(256, 34%, 54%, 1)",
    "hsla(226, 77%, 44%, 1)",
  ],

  paper_bgcolor: "transparent",
  title: "Plotly Graph",
  xaxis: {
    title: "x Axis",
  },
  yaxis: {
    title: "y Axis",
  },
};

const config = {
  responsive: true,
};

const $plot = ref(null);
onMounted(() => {
  Plotly.newPlot($plot.value, plotData.value, layout, config);
});
</script>

<template>
  <div ref="$plot"></div>
</template>
