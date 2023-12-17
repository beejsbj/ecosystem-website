<script setup>
// import { useEcosystemStore } from "~/stores/ecosystem";
// const ecosystem = useEcosystemStore();
const props = defineProps(["dapp"]);
</script>

<template>
  <SectionColumn v-if="dapp" class="banner">
    <picture>
      <NuxtImg
        loading="lazy"
        :src="dapp.images.cover"
        src="/images/landscape.jpg"
        :alt="`Cover Image of ${dapp.name}`"
      />
    </picture>
  </SectionColumn>
</template>

<style lang="scss" scoped>
.banner {
  //   position: relative;
  //   top: 4rem;
  //   z-index: -1;
  margin-top: var(--space-2xl);
  picture {
    overflow: hidden;
    aspect-ratio: 16 / 6;
    @media (min-width: 1400px) {
      border-radius: var(--corners);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
  }
}

:deep(inner-column) {
  max-width: 1700px;
  padding: 0;
}
</style>
