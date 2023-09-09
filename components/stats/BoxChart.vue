<script setup>
const props = defineProps(["data", "options", "metadata", "isChains"]);
</script>

<template>
  <h4 class="solid-voice group-heading" v-if="isChains">
    {{ metadata.title }}
  </h4>
  <ul class="box-chart" v-for="dataset in data.datasets">
    <li
      v-for="(dataPoint, index) in dataset.data"
      :style="`border-color: ${dataset.borderColor[index]}`"
    >
      <picture v-if="isChains">
        <ChainIcon :chain="dataPoint.key" />
      </picture>
      <h4 class="solid-voice" v-if="!isChains">
        {{ dataPoint.key ?? metadata.title }}
      </h4>
      <h5 class="solid-voice">
        {{ dataPoint.value }}
      </h5>
    </li>
  </ul>
</template>

<style scoped>
.group-heading {
  margin: 2rem 0;
}

.box-chart {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  place-content: center;
}

.box-chart li {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border: 1px solid;
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
}
</style>
