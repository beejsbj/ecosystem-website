<script setup>
/**
 * BarChart Component
 *
 * A reusable bar chart component built with vue-chartjs and Chart.js.
 *
 * @component
 *
 * @example
 * <BarChart :data="chartData" :options="chartOptions" :metadata="chartMetadata" />
 *
 * @props
 * @prop {Object} data - The chart data object containing labels and datasets
 * @prop {Object} options - Additional chart options to override defaults
 * @prop {Object} metadata - Metadata for chart titles and axis labels
 *
 * @features
 * - Renders a customizable bar chart using Chart.js
 * - Supports zoom functionality with chartjs-plugin-zoom
 * - Customizable colors, labels, and styling
 * - Responsive design that maintains aspect ratio
 * - Optional zoom reset button
 * - Gradient or solid color bars with customizable opacity
 *
 * @computed
 * @property {Object} options - Merged chart options combining defaults and provided options
 * @property {String} color - Computed chart color based on props or default
 * @property {Boolean} isZoomEnabled - Whether zoom functionality is enabled
 *
 * @methods
 * @method handleZoomReset - Resets the chart zoom when the reset button is clicked
 *
 * @notes
 * - Utilizes Chart.js plugins: Title, SubTitle, Tooltip, Legend, BarElement, CategoryScale, LinearScale, Colors
 * - Some features (like data labels) are configured but disabled by default
 * - Assumes the existence of a `formatNumber` function for Y-axis tick formatting
 */

import { Bar } from "vue-chartjs";
import zoom from "chartjs-plugin-zoom";

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
  Colors,
  zoom
);

const props = defineProps(["data", "options", "metadata"]);

const chart = ref(null);

const ui = useInterfaceStore();

const color = computed(() => {
  return props.options.color ? props.options.color : "hsla(160, 64%, 69%, 1)";
});

const options = computed(() => {
  const defaultOptions = {
    plugins: {
      title: {
        display: true,
        text: props.metadata.title,
      },

      subtitle: {
        display: true,
        text: props.metadata.subtitle,
      },

      legend: {
        display: true,
        position: "top",
      },

      datalabels: {
        formatter: function (value, context) {
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
          color: "#C3C4C3",
        },

        grid: {
          display: false,
          color: "#C3C4C3",
        },
      },
      y: {
        title: {
          display: true,
          text: props.metadata.y.title,
        },
        ticks: {
          //   autoSkip: true,
          maxTicksLimit: 10,
          color: "#C3C4C3",
          callback: function (value, index, values) {
            return formatNumber(value);
          },
        },
      },
    },

    responsive: true,
    maintainAspectRatio: true,

    barPercentage: 0.4,
    borderRadius: 16,

    borderWidth: 1.1,
    borderColor: function (context, options) {
      const datasetIndex = context.datasetIndex;

      return context.dataset.color
        ? ui.api3Colors[context.dataset.color]
        : Object.values(ui.api3Colors)[datasetIndex];
    },

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

      // return gradient;
      return color;
    },

    hoverOffset: 5,
    pointHoverBorderWidth: 10,
  };

  const merged = _Merge(defaultOptions, props.options);

  return merged;
});

const isZoomEnabled = computed(() => {
  return props.options.plugins.zoom.enabled;
});

const handleZoomReset = () => {
  chart.value.chart.resetZoom();
};
</script>

<template>
  <div class="chart-container">
    <button
      v-if="isZoomEnabled"
      @click="handleZoomReset"
      class="whisper-voice text zoom-reset-button"
    >
      Reset Zoom
    </button>
    <Bar
      :data="props.data"
      id="bar-chart"
      ref="chart"
      :options="options"
      :metadata="props.metadata"
    />
  </div>
</template>
<style scoped>
.chart-container {
  position: relative;
  height: 100%;
  width: 100%;

  display: grid;
}

.zoom-reset-button {
  justify-self: end;
}
</style>
