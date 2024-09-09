<script setup>
/**
 * Default Layout
 *
 * The main layout component for the application, providing a consistent
 * structure across pages.
 *
 * @layout
 *
 * @example
 * // Automatically applied to pages unless overridden
 *
 * @features
 * - Includes a decorative curves background
 * - Wraps content in a ContentsWrapper component
 * - Provides consistent header and footer across pages
 * - Responsive design with adjustments for different screen sizes
 *
 * @slots
 * default - The main content area for page-specific components
 *
 * @dependencies
 * - ContentsWrapper
 * - CurvesDecoration3
 * - SiteHeader
 * - SiteFooter
 */

const route = useRoute();
</script>

<template>
  <ContentsWrapper>
    <div class="curves-wrapper">
      <CurvesDecoration3 />
    </div>

    <SiteHeader />

    <main>
      <slot />
    </main>

    <SiteFooter />
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

    --top: 0px;
    --left: -250px;
    --left: -60vw;
    --width: 300vw;
    top: var(--top);
    left: var(--left);

    width: var(--width);
    @media (min-width: 768px) {
      display: block;
      --top: -0px;
      --left: -350px;

      --width: 200vw;
      z-index: -10;
    }

    @media (min-width: 1024px) {
      display: block;
      --top: -50px;
      --left: -500px;

      --width: 200vw;
      z-index: -10;
    }
  }
}
</style>
