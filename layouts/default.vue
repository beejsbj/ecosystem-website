<script setup>
const route = useRoute();

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
  <div class="curves-wrapper">
    <CurvesDecoration3 />
  </div>

  <SiteHeader />

  <main>
    <slot />
  </main>

  <SiteFooter />
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

    --top: 100px;
    --left: -200px;
    --width: 300vw;
    top: var(--top);
    left: var(--left);

    width: var(--width);

    @media (min-width: 768px) {
      display: block;
      --top: -50px;
      --left: -500px;

      --width: 200vw;
      z-index: -10;
    }
  }
}
</style>
