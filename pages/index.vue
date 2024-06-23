<script setup>
definePageMeta({
  layout: "home",
  meta: [
    {
      hid: "home",
      name: "home",
    },
  ],
});

useSeoMeta({
  title: "API3 Ecosystem",
});

// onMounted(() => {
//   document.body.scrollTop = document.documentElement.scrollTop = 0;
//   window.scroll({
//     top: 0,
//     left: 0,
//   });
// });
</script>

<template>
  <ContentsWrapper>
    <HeroLanding />

    <MissionComponent />

    <section class="curves-wrapper">
      <CurvesDecoration3 />
    </section>

    <CallToAction />

    <HomeArticles />
  </ContentsWrapper>
</template>

<style lang="scss">
main.index {
  display: grid;
  gap: var(--space-3xs);

  inner-column > h2 {
    margin-bottom: var(--space-l);
  }
  @media (min-width: 768px) {
    gap: calc(var(--space-3xs) * 10);
  }
}
</style>

<style scoped lang="scss">
.curves-wrapper {
  position: absolute;
  overflow-x: hidden;
  height: 80%;
  width: 100%;
  z-index: -10;
  top: 0;
  left: 0;

  picture.curves-decoration-3 {
    position: absolute;
    top: 100vh;
    left: 50%;
    transform: translate(-50%, -50%) rotate(10deg) scaleY(1.8);

    width: 500vw;

    @media (min-width: 768px) {
      display: block;
      top: 55%;
      left: 45%;
      transform: translate(-50%, -50%) scaleY(0.9);

      width: 200vw;
      z-index: -10;
    }

    @media (min-width: 1600px) {
      width: 100vw;
      transform: translate(-50%, -50%) scaleX(2);
    }
  }
}
</style>
