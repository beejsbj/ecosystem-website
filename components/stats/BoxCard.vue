<script setup>
const props = defineProps(["teaser", "solid"]);
</script>

<template>
  <div class="box-card">
    <picture>
      <slot>
        <img src="@/assets/images/background/square.jpg" alt="" />
      </slot>
    </picture>

    <h4 class="teaser-voice" v-if="props.teaser">
      {{ props.teaser }}
    </h4>

    <h5 class="solid-voice" v-if="props.solid">
      {{ props.solid }}
    </h5>
  </div>
</template>

<style scoped lang="scss">
.box-card {
  display: grid;
  gap: 0.5rem;
  //   align-items: center;
  //   justify-content: center;
  border-radius: var(--corners);
  padding: 1.5rem;
  text-align: center;
  position: relative;
}

.box-card .teaser-voice {
  font-size: var(--step--1);
}

.box-card .solid-voice {
  font-size: var(--step--1);
}
</style>
