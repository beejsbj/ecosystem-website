<script setup>
import { Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
  Title,
  SubTitle,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Colors, Title, SubTitle);

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
      position: "left",
    },

    legend: {
      display: true,
      position: "right",

      labels: {
        //   filter: function (item, chart) {
        //     // Logic to remove a particular legend item goes here
        //     return item.index <= 0;
        //   },
        generateLabels: function (chart) {
          // Get the default label list
          const original =
            ChartJS.overrides.pie.plugins.legend.labels.generateLabels;
          const labelsOriginal = original.call(this, chart);
          console.log("labelsOriginal", labelsOriginal);

          // Build an array of colors used in the datasets of the chart
          let datasetColors = chart.data.datasets.map(function (e) {
            return e.backgroundColor;
          });
          datasetColors = datasetColors.flat();

          // Modify the color and hide state of each label
          labelsOriginal.forEach((label) => {
            // the number of datasets is
            label.datasetIndex = (label.index - (label.index % 2)) / 2;

            // The hidden state must match the dataset's hidden state
            // label.hidden = !chart.isDatasetVisible(label.datasetIndex);

            // Change the color to match the dataset
            label.fillStyle = datasetColors[label.index];
          });

          return labelsOriginal;
        },

        onClick: function (mouseEvent, legendItem, legend) {
          // toggle the visibility of the dataset from what it currently is
          legend.chart.getDatasetMeta(legendItem.datasetIndex).hidden =
            legend.chart.isDatasetVisible(legendItem.datasetIndex);
          legend.chart.update();
        },
      },

      tooltip: {
        callbacks: {
          label: (chart) => {
            const datasets = chart.chart.data.datasets;
            const total = datasets.reduce((acc, dataset) => {
              return (
                acc +
                dataset.data.reduce((acc, dataPoint) => {
                  return acc + dataPoint.value;
                }, 0)
              );
            }, 0);

            //current dataset
            var dataset = chart.dataset;
            var index = chart.dataIndex;
            var dataPoint = dataset.data[index];
            const label = dataPoint.key;
            const value = dataPoint.value;

            //  get percentage

            var percentage = ((value / total) * 100).toFixed(2) + "%";

            return `${value} (${percentage})`;
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
    //   borderColor: "hsla(160, 65%, 69%, 1.00)",
    borderWidth: 1,
    //   offset: 50,

    //hover
    hoverBorderColor: "hsla(160, 60%, 60%, 1)",
    hoverBackgroundColor: "hsla(160, 60%, 100%, 1)",
    hoverOffset: 20,

    onClick: function (evt, item) {
      console.log("item", item);
    },
  },
};
</script>

<template>
  <Pie :data="data" :options="options" />
</template>
