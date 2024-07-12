<script setup>
const route = useRoute();
</script>

<template>
  <SiteHeader />

  <main>
    <slot />
  </main>

  <SiteFooter />
</template>
