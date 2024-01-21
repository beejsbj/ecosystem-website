<script setup>
import { useInterfaceStore } from "@/stores/interface";
import { Line } from "vue-chartjs";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  Colors,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  Colors,
  Filler
);

const props = defineProps(["data", "options", "metadata"]);

const ui = useInterfaceStore();

const options = {
  plugins: {
    title: {
      display: true,
      text: props.metadata.title,
      color: "hsla(160, 64%, 69%, 1)",
    },

    subtitle: {
      display: true,
      text: props.metadata.subtitle,
      color: "hsla(160, 64%, 69%, 1)",
    },

    legend: {
      display: true,
      position: "top",
    },

    datalabels: {
      formatter: function (value, context) {
        //   console.log(value);
        return value.value;
      },

      display: false,

      anchor: "end",
      color: "white",
      backgroundColor: "hsla(178, 12%, 3%, 1.00)",
      borderRadius: 16,
      padding: {
        top: 4,
        right: 8,
        bottom: 4,
        left: 8,
      },
    },
  },

  scales: {
    x: {
      title: {
        display: true,
        text: props.metadata.x.title,
        color: "hsla(160, 64%, 69%, 1)",
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
    y: {
      alignToPixels: true,
      title: {
        display: true,
        text: props.metadata.y.title,
        color: "hsla(160, 64%, 69%, 1)",
        position: "left",
      },
      ticks: {
        //   autoSkip: true,
        maxTicksLimit: 10,
        callback: function (value, index, values) {
          if (value >= 1e9) {
            return (value / 1e9).toFixed(1) + "B";
          } else if (value >= 1e6) {
            return (value / 1e6).toFixed(1) + "M";
          } else if (value >= 1e3) {
            return (value / 1e3).toFixed(1) + "K";
          }
          return value;
        },
      },
    },
  },

  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: ui.isMobile ? 0.9 : 1.75,
  borderWidth: 1.1,
  borderColor: function (context, options) {
    const datasetIndex = context.datasetIndex;

    return context.dataset.color
      ? ui.api3Colors[context.dataset.color]
      : Object.values(ui.api3Colors)[datasetIndex];
  },

  hoverOffset: 5,

  fill: "origin",

  backgroundColor: function (context, options) {
    const { datasetIndex, chart, dataset } = context;
    const { width, height, ctx } = chart;
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    const color = dataset.color
      ? ui.api3Colors[dataset.color]
      : Object.values(ui.api3Colors)[datasetIndex];
    const [startColor, endColor] = [
      color.replace("1)", "0.5)"),
      color.replace("1)", "0)"),
    ];
    gradient.addColorStop(0, startColor);
    gradient.addColorStop(1, endColor);
    return gradient;
  },

  ...props.options,
};
</script>

<template>
  <div class="chart-container">
    <Line :data="props.data" :options="options" :metadata="props.metadata" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
