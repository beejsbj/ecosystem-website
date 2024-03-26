<script setup>
// import * as Logos from "@phase21/logos";

const { $chainLogo, $symbolLogo } = useNuxtApp();

const props = defineProps(["feed"]);
// DAI/USD
const symbols = props.feed.split("/");
symbols.map((symbol) => symbol.toLowerCase());

const isFound = ref(true);

const onError = () => {
  isFound.value = false;
};

function imgSrc(symbol) {
  const src = $symbolLogo(symbol);
  return src;
}

// const imgSrc = computed(() => {
//   //   const src = "btc";
//   return src;
// });
</script>

<template>
  <div class="feed-icon">
    <picture
      v-for="symbol in symbols"
      :data-first-letter="symbol[0].toUpperCase()"
    >
      <img
        loading="lazy"
        :src="imgSrc(symbol)"
        :alt="symbol"
        @error="onError"
        :class="{ 'not-found': !isFound }"
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

picture:has(.not-found) {
  position: relative;
  overflow: hidden;

  img {
    border-radius: 50%;
  }

  &::before {
    content: attr(data-first-letter);
    display: grid;
    place-items: center;
    line-height: 0;

    position: absolute;
    inset: 0;
    background: var(--gray-darker);
    border-radius: var(--corners);
    padding: 0.5%;
    z-index: 2;
  }
}
</style>
