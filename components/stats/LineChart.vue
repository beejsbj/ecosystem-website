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

const data = computed(() => {
  const datasets = props.data.map((item, index) => {
    return {
      label: item.label,
      data: item.data,
    };
  });

  const largestDataset = datasets.reduce((a, b) => {
    return a.data.length > b.data.length ? a : b;
  });

  const labels = largestDataset.data.map((item) => {
    // sort by date
    //  return item.x.toDateString().slice(4, 10);
    //  date and time Aug 5 00:00
    return (
      item.x.toDateString().slice(4, 10) +
      " " +
      item.x.toTimeString().slice(0, 5)
    );
  });

  //   sort labels by date
  const sortedLabels = labels.sort((a, b) => {
    return new Date(a) - new Date(b);
  });

  return {
    labels: labels,
    datasets,
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
      display: true,
      position: "top",
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
