<script setup>
const props = defineProps(["teaser", "solid", "hideImage", "layout"]);
</script>

<template>
  <div class="box-card" :class="props.layout ?? 'grid'">
    <slot>
      <picture v-if="!props.hideImage">
        <img src="@/assets/images/background/square.jpg" alt="" />
      </picture>
    </slot>

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
  gap: 0.5rem;
  border-radius: var(--corners);
  padding: 2rem 1rem;
  padding-top: 1.25rem;
  text-align: center;
  position: relative;

  cursor: pointer;

  &.border-gradient-blue > *:not(picture) {
    filter: hue-rotate(70deg);
  }
}

.box-card.grid {
  display: grid;
}

.box-card.flex {
  display: flex;
  align-items: center;
  justify-content: start;
  picture {
    width: 50px;
    border-radius: 50%;
  }
}

.box-card .teaser-voice {
  font-size: var(--step--1);
  white-space: nowrap;
}

.box-card .solid-voice {
  font-size: var(--step--1);
}
</style>
