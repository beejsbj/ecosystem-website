<script setup>
import VueEasyLightbox from "vue-easy-lightbox";

const props = defineProps(["dapp"]);

const visibleRef = ref(false);
const indexRef = ref(0); // default 0

const onHide = () => (visibleRef.value = false);
const onShow = (index) => {
  indexRef.value = index;
  console.log(indexRef.value);

  visibleRef.value = true;
};
</script>

<template>
  <section class="screenshots">
    <h2 class="attention-voice">Screenshots</h2>
    <ul class="image-grid">
      <li
        v-for="(image, index) in dapp?.images.screenshots"
        :key="image"
        @click="onShow(index)"
      >
        <NuxtImg loading="lazy" :src="image" alt="Screenshots" />
      </li>

      <VueEasyLightbox
        :visible="visibleRef"
        :imgs="dapp?.images.screenshots"
        :index="indexRef"
        @hide="onHide"
        teleport="body"
      />
    </ul>
  </section>
</template>

<style scoped lang="scss">
.image-grid {
  display: grid;
  gap: var(--space-3xs);
  grid-template-columns: repeat(auto-fit, minmax(min(250px, 100%), 1fr));
  grid-template-rows: auto auto;

  li {
    cursor: pointer;
  }
}
</style>
