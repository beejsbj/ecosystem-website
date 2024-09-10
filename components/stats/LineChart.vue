<script setup>
/**
 * LineChart Component
 *
 * A reusable line chart component built with vue-chartjs and Chart.js.
 *
 * @component
 *
 * @example
 * <LineChart :data="chartData" :options="chartOptions" :metadata="chartMetadata" />
 *
 * @props
 * @prop {Object} data - The chart data object containing labels and datasets
 * @prop {Object} options - Additional chart options to override defaults
 * @prop {Object} metadata - Metadata for chart titles and axis labels
 *
 * @features
 * - Renders a customizable line chart using Chart.js
 * - Supports logarithmic scale on Y-axis
 * - Customizable colors, labels, and styling
 * - Responsive design that maintains aspect ratio
 * - Optional zoom functionality with reset button
 * - Gradient fill below lines
 * - Customizable point and line styles
 *
 * @computed
 * @property {Object} options - Merged chart options combining defaults and provided options
 * @property {Boolean} isZoomEnabled - Whether zoom functionality is enabled
 *
 * @methods
 * @method handleZoomReset - Resets the chart zoom when the reset button is clicked
 *
 * @notes
 * - Utilizes various Chart.js plugins and scales (including LogarithmicScale)
 * - Some features (like data labels and zoom) are configured but may be disabled by default
 * - Aspect ratio adjusts based on device type (mobile vs desktop)
 * - Custom color handling for datasets, allowing for gradients
 */

import { useInterfaceStore } from "@/stores/interface";
import { Line } from "vue-chartjs";
import zoom from "chartjs-plugin-zoom";
import formatNumber from "@/utils/formatNumber";

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
  LogarithmicScale,
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
  Filler,
  LogarithmicScale,
  zoom
);

const props = defineProps(["data", "options", "metadata"]);

const chart = ref(null);

const ui = useInterfaceStore();

const options = computed(() => {
  const defaultOptions = {
    elements: {
      point: {
        pointStyle: "rectRot",
        backgroundColor: "black",
        radius: 3,
      },
      line: {
        tension: 0.4,
      },
    },

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
          color: "white",
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
        alignToPixels: true,
        type: "logarithmic",
        title: {
          display: true,
          text: props.metadata.y.title,
          color: "white",
        },
        ticks: {
          //   autoSkip: true,
          maxTicksLimit: 10,
          color: "#C3C4C3",
          callback: function (value, index, values) {
            return formatNumber(value);
          },
        },

        grid: {
          display: true,
          color: "hsla(0, 0%, 100%, .150)",
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
        color.replace("1)", "0.75)"),
        color.replace("1)", "0)"),
      ];
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(1, endColor);

      return gradient;
      return color;
    },
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
    <Line
      :data="props.data"
      :options="options"
      :metadata="props.metadata"
      id="line-chart"
      ref="chart"
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
