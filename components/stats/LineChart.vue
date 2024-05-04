<script setup>
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

      // zoom: {
      //   //   pan: {
      //   //     enabled: true,
      //   //     mode: 'x',
      //   //     modifierKey: 'ctrl',
      //   //   },
      //   zoom: {
      //     drag: {
      //       enabled: true,
      //     },
      //     mode: "x",
      //   },
      // },
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
        type: "logarithmic",
        title: {
          display: true,
          text: props.metadata.y.title,
          color: "hsla(160, 64%, 69%, 1)",
          position: "left",
        },
        ticks: {
          //   autoSkip: true,
          maxTicksLimit: 10,
          callback: function (value, index, values) {
            return formatNumber(value);
          },
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
        color.replace("1)", "0.5)"),
        color.replace("1)", "0)"),
      ];
      gradient.addColorStop(0, startColor);
      gradient.addColorStop(1, endColor);
      return gradient;
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
    <Line
      :data="props.data"
      :options="options"
      :metadata="props.metadata"
      ref="chart"
    />
    <button
      v-if="isZoomEnabled"
      @click="handleZoomReset"
      class="whisper-voice button outline"
    >
      Reset Zoom
    </button>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  height: 100%;
  width: 100%;
}
</style>
