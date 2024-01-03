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
  <SiteHeader />

  <main>
    <slot />
  </main>

  <SiteFooter />
</template>
