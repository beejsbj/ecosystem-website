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

//

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
      position: "top",
    },

    legend: {
      // display: false,
      position: "right",

      labels: {
        color: "hsla(160, 64%, 69%, 1)",
      },
    },

    datalabels: {
      display: "auto",

      formatter: function (value, context) {
        //   console.log(value);
        return value.value;
      },

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

  layout: {
    padding: 20,
  },
  responsive: true,
  maintainAspectRatio: false,
  //   cutout: "25%",
  //   borderColor: "hsla(160, 65%, 69%, 1.00)",
  borderWidth: 1,
  //   offset: 50,

  //hover
  hoverBorderColor: "hsla(160, 60%, 60%, 1)",
  hoverBackgroundColor: "hsla(160, 60%, 60%, 1)",
  hoverOffset: 20,

  onClick: function (evt, item) {
    console.log("item", item);
  },
};
</script>

<template>
  <Pie :data="data" :options="options" />
</template>
