<script setup>
import VueEasyLightbox from "vue-easy-lightbox";

const props = defineProps(["image", "alt", "caption"]);

//
//
const visibleRef = ref(false);
const indexRef = ref(0); // default 0

const onHide = () => (visibleRef.value = false);
const onShow = (index) => {
  indexRef.value = index;

  visibleRef.value = true;
};
</script>

<template>
  <figure @click="onShow(0)">
    <NuxtImg loading="lazy" :src="image" :alt="alt" />
    <figcaption class="whisper-voice" v-if="caption">
      {{ caption }}
    </figcaption>
    <VueEasyLightbox
      :visible="visibleRef"
      :imgs="image"
      :index="indexRef"
      @hide="onHide"
      teleport="body"
    />
  </figure>
</template>

<style scoped lang="scss">
figure {
  display: grid;
  gap: var(--space-2xs);

  position: relative;
  margin-top: var(--space-l);

  @media (min-width: 768px) {
    max-width: 60%;
    margin-left: auto;
    margin-right: auto;
  }

  figcaption {
    text-align: center;
  }
}
</style>
