<script setup>
/**
 * Home Layout
 *
 * A simple layout component for the home page, providing a basic structure
 * with header, main content area, and footer.
 *
 * @layout
 *
 * @example
 * // In a page file:
 * definePageMeta({
 *   layout: "home",
 * });
 */

const route = useRoute();
</script>

<template>
  <SiteHeader />

  <main>
    <slot />
  </main>

  <SiteFooter />
</template>
