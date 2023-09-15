<script setup>
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Colors,
} from "chart.js";

ChartJS.register(
  Title,
  SubTitle,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  Colors
);

const props = defineProps(["data", "options", "metadata"]);

//
const color = computed(() => {
  return props.options.color ? props.options.color : "hsla(160, 64%, 69%, 1)";
});

//

//

const options = {
  plugins: {
    title: {
      display: true,
      text: props.metadata.title,
      color: color.value,
    },

    subtitle: {
      display: true,
      text: props.metadata.subtitle,
      color: color.value,
    },

    legend: {
      display: false,
      position: "right",
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
        color: color.value,
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
        color: color.value,
      },
      ticks: {
        autoSkip: true,
        maxTicksLimit: 10,
      },
    },
  },

  responsive: true,
  maintainAspectRatio: true,

  //  backgroundColor: color.value,
  barPercentage: 0.4,
  borderRadius: 16,
  borderColor: color.value,
  borderWidth: 1,

  hoverOffset: 5,
  hoverBackgroundColor: color.value,
  pointHoverBorderWidth: 10,

  onClick: function (evt, item) {
    console.log("item", item);
  },
};
</script>

<template>
  <Bar id="my-chart-id" :options="options" :data="data" />
</template>
