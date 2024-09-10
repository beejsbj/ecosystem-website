<script setup>
const props = defineProps(["data", "options", "metadata", "isChains"]);

const gradientColors = [
  "hsla(160, 65%, 69%, 1.00)",
  "hsla(180, 59%, 66%, 1.00)",
  "hsla(200, 53%, 63%, 1.00)",
  "hsla(220, 47%, 60%, 1.00)",
  "hsla(240, 41%, 57%, 1.00)",
  "hsla(260, 35%, 54%, 1.00)",
];

const data = computed(() => {
  return {
    datasets: [
      {
        data: props.data,
        borderColor: gradientColors,
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
      <BoxCard
        :teaser="dataPoint.key ?? metadata.title"
        :solid="dataPoint.value"
      >
        <ChainIcon :id="dataPoint.key" v-if="isChains" />
      </BoxCard>

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
.box-chart {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  place-content: center;
}

.box-chart li {
  position: relative;
  display: grid;
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
