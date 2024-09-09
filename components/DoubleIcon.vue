<script setup>
/**
 * DoubleIcon Component
 *
 * Displays two overlapping icons, typically used for representing
 * cryptocurrency pairs or chain-token combinations.
 *
 * @component
 *
 * @example
 * <DoubleIcon
 *   :icon1="{ chainId: '1' }"
 *   :icon2="{ symbol: 'BTC' }"
 *   width="32px"
 * />
 *
 * @props
 * @prop {Object} icon1 - First icon object { src?, chainId?, symbol? }
 * @prop {Object} icon2 - Second icon object { src?, chainId?, symbol? }
 * @prop {string} [width='24px'] - Width of the icons
 *
 * @features
 * - Supports direct image source, chain logos, or token symbols
 * - Fallback display for not found images
 * - Customizable width
 * - Lazy loading of images
 *
 */

const { $chainLogo, $symbolLogo } = useNuxtApp();

const props = defineProps(["icon1", "icon2", "width"]);

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
</script>

<template>
  <div class="double-icon">
    <picture
      v-for="(icon, i) in [props.icon1, props.icon2]"
      :class="`icon-${i}`"
      :key="i"
    >
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
  --props-width: v-bind("props.width ?? '24px'");
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: var(--gray-darker);
  width: 100%;
  --width: var(--props-width, 24px);
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
