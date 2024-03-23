<script setup>
const route = useRoute();

const loadingDone = ref(false);

onMounted(() => {
  setTimeout(() => {
    loadingDone.value = true;
  }, 2000);
});

useHead({
  htmlAttrs: {
    lang: "en",
  },
  bodyAttrs: {
    class: route.name,
  },
});
</script>

<template>
  <ContentsWrapper>
    <div class="curves-wrapper">
      <LazyCurvesDecoration3 />
    </div>

    <SiteHeader />

    <main>
      <slot />
    </main>

    <!-- <LoadingSpinner v-if="!loadingDone" /> -->
  </ContentsWrapper>
</template>

<style scoped lang="scss">
.curves-wrapper {
  position: absolute;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  z-index: -10;

  :deep(picture.curves-decoration-3) {
    position: absolute;
    top: 100px;
    left: -200px;

    width: 300vw;

    @media (min-width: 768px) {
      display: block;
      top: -50px;
      left: -500px;

      width: 200vw;
      z-index: -10;
    }
  }
}
</style>
