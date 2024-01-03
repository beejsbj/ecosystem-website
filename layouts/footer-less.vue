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
    <picture class="curves-decoration-3">
      <CurvesDecoration3 />
    </picture>
  </div>

  <SiteHeader />

  <main>
    <slot />
  </main>
</template>

<style scoped lang="scss">
.curves-wrapper {
  position: absolute;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  z-index: -10;

  picture.curves-decoration-3 {
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
