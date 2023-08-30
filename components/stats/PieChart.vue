<script setup>
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";
import { Pie } from "vue-chartjs";

ChartJS.register(ArcElement, Tooltip, Legend, Colors);

//
const props = defineProps(["data", "options"]);
//

const data = computed(() => {
  return {
    labels: props.data.map((item) => item.key),
    datasets: [
      {
        data: props.data.filter((item, index) => item.value),
      },
    ],
  };
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  //   borderColor: "hsla(160, 0%, 0%, 1)",
  //   hoverBorderColor: "hsla(160, 0%, 100%, 1)",
  hoverOffset: 5,
  plugins: {
    legend: {
      // display: false,
      position: "right",
    },
  },

  onClick: function (evt, item) {
    console.log("item", item);
  },
};
</script>

<template>
  <Pie :data="data" :options="options" />
</template>
