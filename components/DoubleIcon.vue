<script setup>
// import * as Logos from "@phase21/logos";

const { $chainLogo, $symbolLogo } = useNuxtApp();

const props = defineProps(["icon1", "icon2"]);
// icon1: object
// icon2: object

// {
// src: "",
// chainId: 0,
// symbol: "",
//}

const isFound = ref(true);

const onError = () => {
  isFound.value = false;
};

function imgSrc(icon) {
  if (icon.src) {
    return icon.src;
  }

  if (icon.chainId) {
    return $chainLogo(icon.chainId);
  }

  if (icon.symbol) {
    return $symbolLogo(icon.symbol);
  }
}

// const imgSrc = computed(() => {
//   //   const src = "btc";
//   return src;
// });
</script>

<template>
  <div class="double-icon">
    <picture v-for="(icon, i) in props" :class="`icon-${i}`" :key="i">
      <img
        loading="lazy"
        :src="imgSrc(icon)"
        :alt="icon.symbol || icon.chainId"
        @error="onError"
        :class="{ 'not-found': !isFound }"
      />
    </picture>
  </div>
</template>

<style scoped lang="scss">
.double-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

picture {
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: var(--gray-darker);
  width: 100%;
  --width: 30px;
  max-width: var(--width);
  isolation: isolate;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  &:first-child {
    position: relative;
    z-index: 3;
    //  left: calc(var(--width) * 0.1);
  }

  &:last-child {
    position: relative;
    z-index: 4;
    right: calc(var(--width) * 0.2);
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
