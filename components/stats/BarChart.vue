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
} from "chart.js";

ChartJS.register(
  Title,
  SubTitle,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const props = defineProps(["data", "options", "metadata"]);

//

//

//
const data = computed(() => {
  return {
    labels: props.data.map((item) => item.x.toDateString().slice(4, 10)),

    datasets: [
      {
        label: props.metadata.label,
        data: props.data,
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
    },

    subtitle: {
      display: true,
      text: props.metadata.subtitle,
      color: "hsla(160, 64%, 69%, 1)",
    },

    legend: {
      display: false,
      position: "right",
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
  //   backgroundColor: "hsla(160, 64%, 69%, 1)",
  barPercentage: 0.4,
  borderRadius: 16,
  borderColor: "hsla(160, 64%, 69%, 1)",
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
  <Bar id="my-chart-id" :options="options" :data="data" />
</template>
