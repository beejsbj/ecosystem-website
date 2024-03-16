<script setup>
const props = defineProps(["feed"]);
// props.feed = API3/USD

const symbols = props.feed.split("/");
symbols.map((symbol) => symbol.toLowerCase());
</script>

<template>
  <div class="feed-icon">
    <picture v-for="symbol in symbols">
      <NuxtImg
        loading="lazy"
        :src="`/images/chains/${symbol}.svg`"
        :alt="symbol"
      />
    </picture>
  </div>
</template>

<style scoped lang="scss">
.feed-icon {
  display: flex;
  align-items: center;
}

picture {
  aspect-ratio: 1/1;
  border-radius: 50%;
  width: 100%;
  --width: 30px;
  max-width: var(--width);
  isolation: isolate;
  overflow: unset;
  border: 1px solid var(--ink);
  padding: var(--space-3xs);
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:first-child {
    position: relative;
    z-index: 3;
    left: calc(var(--width) * 0.1);
  }

  &:last-child {
    position: relative;
    z-index: 2;
    right: calc(var(--width) * 0.1);
  }
}
</style>
