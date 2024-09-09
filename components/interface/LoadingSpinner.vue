<script setup>
/**
 * LoadingSpinner Component
 *
 * This component displays a loading spinner or an OEV-specific loader
 * depending on the current route. It also disables vertical scrolling
 * on the body while active.
 *
 * @vue-component
 *
 * @example
 * <LoadingSpinner />
 *
 * @features
 * - Shows a spinning loader animation for most routes
 * - Displays an OEV-specific loader for the 'oev' route
 * - Covers the entire viewport with a mask
 * - Disables vertical scrolling on the body
 * - Uses GSAP for setting body overflow
 *
 * @dependencies
 * - Uses vue-router's useRoute for route information
 * - Relies on GSAP for DOM manipulation
 * - Requires an OEVLoader component for the 'oev' route
 *
 * @note
 * The component assumes the existence of an OEVLoader component
 * and a GSAP plugin setup in the project.
 */

const route = useRoute();

const page = ref(route.name);

useGsap((gsap) => {
  gsap.set("body", {
    overflowY: "hidden",
  });
});
</script>

<template>
  <div class="mask" v-if="route.name !== 'oev'">
    <div class="loader"></div>
  </div>
  <OEVLoader v-else />
</template>

<style scoped lang="scss">
.mask {
  position: fixed;
  inset: 0;
  background: var(--paper);
  z-index: 1031;
}

.loader {
  display: block;
  box-sizing: border-box;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-right: solid 2px var(--green);
  border-radius: 50%;
  --size: 50px;
  width: var(--size);
  height: var(--size);
  -webkit-animation: loader 800ms ease-in-out infinite;
  animation: loader 800ms ease-in-out infinite;
}

@-webkit-keyframes loader {
  0% {
    -webkit-transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    -webkit-transform: translate(-50%, -50%) rotate(360deg);
  }
}

@keyframes loader {
  0% {
    transform: translate(-50%, -50%) rotate(0deg);
  }

  100% {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
</style>
