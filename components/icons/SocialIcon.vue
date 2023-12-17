<script setup>
const props = defineProps(["social", "fill", "stroke"]);

const capitalizedSocial =
  props.social[0].toUpperCase() + props.social.toLowerCase().slice(1);

const dynamicComponent = defineAsyncComponent(() =>
  import(`@/components/icons/socials/${capitalizedSocial}Icon.vue`)
);
</script>

<template>
  <picture class="social-icon" :class="social">
    <Component
      :is="dynamicComponent"
      :style="`
   ${fill ? `fill: ${fill};` : 'fill: var(--ink);'}
	${
    stroke
      ? `stroke: ${stroke}; stroke-width: var(--line-width);`
      : 'stroke: none;'
  }

  `"
    />
  </picture>
</template>
