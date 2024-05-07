<script setup>
const props = defineProps(["image", "id"]);
</script>

<template>
  <div class="icon-with-chain">
    <picture>
      <NuxtImg loading="lazy" :src="image" />
    </picture>
    <ChainIcon :id="id" />
  </div>
</template>

<style scoped lang="scss">
div {
  position: relative;
  max-width: 32px;
}

picture {
  aspect-ratio: 1/1;
  width: 100%;
  border-radius: 50%;

  & > img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

picture.chain-icon {
  position: absolute;
  bottom: -10%;
  right: -10%;
  max-width: 60%;
  border-radius: 50%;
  background: var(--ink);
}
</style>
