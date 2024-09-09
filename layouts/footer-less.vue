<script setup>
/**
 * FooterLess Layout
 *
 * A layout component for pages that don't require a footer, with loading state and conditional curve decorations.
 *
 * @layout
 *
 * @example
 * // In a page file:
 * definePageMeta({
 *   layout: "footer-less",
 * });
 *
 * @features
 * - Displays a loading spinner on initial load
 * - Includes conditional decorative curves background
 * - Wraps content in a ContentsWrapper component
 * - Provides consistent header across pages
 * - Hides curves on specific pages (e.g., 'oev')
 * - Responsive design for decorative elements
 */

const route = useRoute();
const ui = useInterfaceStore();

const loadingDone = ref(ui.firstLoad ? false : true);

onMounted(() => {
  setTimeout(() => {
    loadingDone.value = true;
  }, 2000);
});

function hideCurvesOnPages() {
  const pages = ["oev"];

  if (!pages.includes(route.name)) {
    return true;
  }

  return false;
}
</script>

<template>
  <ContentsWrapper>
    <LoadingSpinner v-if="!loadingDone" />

    <template v-else>
      <div class="curves-wrapper" v-if="hideCurvesOnPages()">
        <LazyCurvesDecoration3 />
      </div>

      <SiteHeader />
      <main>
        <slot />
      </main>
    </template>
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
    @media (min-width: 1000px) {
      display: block;
      top: -50px;
      left: -500px;

      width: 250vw;
      z-index: -10;
    }
    //  @media (min-width: 1400px) {
    //    display: block;
    //    top: -50px;
    //    left: -500px;

    //    width: 200vw;
    //    z-index: -10;
    //  }
  }
}
</style>
