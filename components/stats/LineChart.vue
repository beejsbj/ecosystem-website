<script setup>
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
      title: {
        display: true,
        text: props.metadata.y.title,
        color: "hsla(160, 64%, 69%, 1)",
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
  },

  responsive: true,
  maintainAspectRatio: true,
  //   borderColor: "hsla(160, 64%, 69%, 1)",
  borderWidth: 1,

  hoverOffset: 5,
  hoverBackgroundColor: "hsla(160, 64%, 69%, 1)",
  //   hoverBorderColor: "hsla(160, 0%, 94%, 1)",

  onClick: function (evt, item) {
    console.log("item", item);
  },
};
</script>

<template>
  <Line :data="data" :options="options" />
</template>
