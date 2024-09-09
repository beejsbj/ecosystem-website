<script setup>
/**
 * Feed Layout
 *
 * A specialized layout component for feed-related pages in the application.
 *
 * @layout
 *
 * @example
 * // Applied to feed-related pages
 *
 * @features
 * - Includes a decorative feed-specific background
 * - Wraps content in a ContentsWrapper component
 * - Provides consistent header and footer
 * - Applies a radial green gradient background to feed pages
 * - Responsive design for the decorative elements
 *
 * @slots
 *  The main content area for feed-specific components
 *
 */
</script>

<template>
  <ContentsWrapper>
    <div class="curves-wrapper">
      <FeedDecoration />
    </div>

    <SiteHeader />

    <main>
      <slot />
    </main>

    <SiteFooter />
  </ContentsWrapper>
</template>

<style scoped lang="scss">
:global(body:is(.feeds, .feeds-detail)) {
  background: var(--gradient-radial-green);
}

.curves-wrapper {
  position: absolute;
  overflow-x: hidden;
  height: 100%;
  width: 100%;
  z-index: -10;

  :deep(picture) {
    position: absolute;

    --top: 0px;
    --left: -250px;
    --left: -20vw;
    --width: 120vw;
    //  top: var(--top);
    left: var(--left);

    width: var(--width);

    @media (min-width: 1024px) {
    }
  }
}
</style>
