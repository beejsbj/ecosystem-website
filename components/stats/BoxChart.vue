<script setup>
const props = defineProps(["data", "options", "metadata", "isChains"]);

const gradientColors = [
  // give me 7 colors from "hsla(160, 65%, 69%, 1.00)" to "hsla(256, 34%, 54%, 1)", by gradually increasing the hue, saturation, and lightness only, but keeping the alpha at 1
  "hsla(160, 65%, 69%, 1.00)",
  "hsla(180, 59%, 66%, 1.00)",
  "hsla(200, 53%, 63%, 1.00)",
  "hsla(220, 47%, 60%, 1.00)",
  "hsla(240, 41%, 57%, 1.00)",
  "hsla(260, 35%, 54%, 1.00)",
];

const data = computed(() => {
  return {
    //  labels: props.data.map((item) => item.key),

    datasets: [
      {
        data: props.data,
        borderColor: gradientColors,
        //   hoverBackgroundColor: gradientColors,
      },
    ],
  };
});
</script>

<template>
  <h4 class="teaser-voice group-heading" v-if="isChains">
    {{ metadata.title }}
  </h4>
  <ul class="box-chart" v-for="dataset in data.datasets">
    <li v-for="(dataPoint, index) in dataset.data">
      <picture v-if="isChains">
        <ChainIcon :chain="dataPoint.key" />
      </picture>
      <h4 class="teaser-voice" v-if="!isChains">
        {{ dataPoint.key ?? metadata.title }}
      </h4>
      <h5 class="solid-voice">
        {{ dataPoint.value }}
      </h5>

      <div
        class="is-testnet solid-voice"
        v-if="dataPoint?.key?.includes('testnet')"
      >
        T
      </div>
    </li>
  </ul>
</template>

<style scoped>
.group-heading {
  /* margin: 2rem 0; */
}

.box-chart {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  place-content: center;
}

.box-chart li {
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: var(--border);
  border-radius: var(--corners);
  padding: 1.5rem;
  text-align: center;
  position: relative;
}

.box-chart .is-testnet {
  position: absolute;
  top: 0.2rem;
  right: 0rem;
  width: 1.5rem;
  height: 1.5rem;

  font-weight: 900;

  display: grid;
  place-content: center;
}
</style>
