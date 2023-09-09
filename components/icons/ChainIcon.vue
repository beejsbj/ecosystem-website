<script setup>
import slug from "slug";
slug.extend({ "/": "-" });

const props = defineProps(["chain", "fill", "stroke", "strokeWidth"]);
const isTestnet = computed(() => props.chain?.includes("-testnet"));

const dynamicComponent = defineAsyncComponent(() => {
  let chain = props.chain;
  chain = chain.replace("-testnet", "");
  chain = chain.replace("-goerli", "");
  chain = chain.replace("-chain", "");

  chain = chain === "sepolia" ? "ethereum" : chain;
  chain = chain === "goerli" ? "ethereum" : chain;

  console.log(chain);

  return import(`@/components/icons/chains/${slug(chain)}.vue`);
});
</script>

<template>
  <Component
    :is="dynamicComponent"
    :style="`
   	fill: ${props.fill ? props.fill : 'none'};
      stroke: ${props.stroke ? props.stroke : 'var(--color)'};
      ${props.strokeWidth ? `stroke-width: ${props.strokeWidth};` : ''}
  `"
    v-tooltip="props.chain"
    v-if="props.chain"
  />
</template>

<style scoped></style>
