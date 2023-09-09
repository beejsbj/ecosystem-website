<script setup>
import { Pie } from "vue-chartjs";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  Title,
  SubTitle,
} from "chart.js";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  Title,
  SubTitle,
  ChartDataLabels
);

//
const props = defineProps(["data", "options", "metadata"]);

const gradientColors = [
  // give me 7 colors from "hsla(160, 65%, 69%, 1.00)" to "hsla(256, 34%, 54%, 1)", by gradually increasing the hue, saturation, and lightness only, but keeping the alpha at 1
  "hsla(160, 65%, 69%, 1.00)",
  "hsla(180, 59%, 66%, 1.00)",
  "hsla(200, 53%, 63%, 1.00)",
  "hsla(220, 47%, 60%, 1.00)",
  "hsla(240, 41%, 57%, 1.00)",
  "hsla(260, 35%, 54%, 1.00)",
];

//
function hoverState(chart, datasetIndex, dataIndex) {
  const tooltip = chart.tooltip;
  const item = {
    datasetIndex,
    index: dataIndex,
  };
  chart.setActiveElements([item]);
  tooltip.setActiveElements([item]);

  chart.update();
}

const data = computed(() => {
  var total = props.data.reduce((a, v) => a + v.value, 0);
  var inPercent = props.data.map((v) => {
    return {
      value: Math.max((v.value / total) * 100, 0.5).toFixed(2),
      key: v.key,
      rawValue: v.value,
    };
  });

  return {
    labels: props.data.map((item) => item.key),
    datasets: [
      {
        data: inPercent,
        borderColor: gradientColors,
        //   hoverBackgroundColor: gradientColors,
      },
    ],
  };
});

const options = {
  plugins: {
    title: {
      display: true,

      text: props.metadata.title,
      color: "hsla(160, 64%, 69%, 1)",
      align: "start",
      // position: "left",
    },

    subtitle: {
      display: true,
      text: props.metadata.subtitle,
      color: "hsla(160, 64%, 69%, 1)",
      position: "top",
    },

    legend: {
      // display: false,
      position: "right",

      labels: {
        color: "hsla(160, 64%, 69%, 1)",
      },

      onHover: (event, legendItem, legend) => {
        //  get dataset index and index of hovered element by searching for legendItem in legend.chart.data.datasets
        const datasetIndex = legend.chart.data.datasets.findIndex((dataset) => {
          return dataset.data.some((item, index) => {
            return item.key === legendItem.text;
          });
        });

        hoverState(legend.chart, datasetIndex, legendItem.index);
      },
    },

    tooltip: {
      callbacks: {
        label: function (context) {
          return context.raw.rawValue;
        },
      },
    },

    datalabels: {
      display: "auto",

      anchor: "end",
      // align: "start",
      color: "white",
      backgroundColor: "hsla(178, 12%, 3%, 1.00)",
      borderRadius: 16,
      padding: 4,

      formatter: function (value, context) {
        return value.rawValue;
      },

      listeners: {
        enter: function (context, event) {
          const chart = context.chart;
          const datasetIndex = context.datasetIndex;
          const dataIndex = context.dataIndex;
          //  hoverState(chart, datasetIndex, dataIndex);
        },
      },
    },
  },

  layout: {
    padding: 20,
  },
  responsive: true,
  maintainAspectRatio: false,
  //   cutout: "25%",
  borderColor: "hsla(160, 65%, 69%, 1.00)",
  backgroundColor: "hsla(160, 65%, 69%, 0.00)",
  borderWidth: 1,
  spacing: 5,
  //   offset: 10,

  //hover
  //   hoverBorderColor: "hsla(160, 60%, 60%, 0)",
  hoverBackgroundColor: "hsla(160, 60%, 60%, 1)",
  hoverOffset: 20,

  onClick: function (evt, item, chart) {
    // hide item in chart
    chart.toggleDataVisibility(item[0].index);
    chart.update();
  },
  onHover: function (evt, item) {},
};
</script>

<template>
  <Pie :data="data" :options="options" />
</template>
