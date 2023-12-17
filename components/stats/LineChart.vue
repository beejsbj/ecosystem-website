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
  Colors
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
      },
      ticks: {
        //   autoSkip: true,
        maxTicksLimit: 10,
      },
    },
  },

  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: ui.isMobile ? 1.25 : 1.75,
  //   borderColor: "hsla(160, 64%, 69%, 1)",
  borderWidth: 1,

  hoverOffset: 5,
  hoverBackgroundColor: "hsla(160, 64%, 69%, 1)",
  //   hoverBorderColor: "hsla(160, 0%, 94%, 1)",

  onClick: function (evt, item) {
    console.log("item", item);
  },

  onResize: function (chart, size) {
    console.log("chart", chart);
    console.log("size", size);

    console.log("chart.canvas.parentNode", chart.canvas.parentNode);
  },
};
</script>

<template>
  <div class="chart-container">
    <Line :data="data" :options="options" />
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
