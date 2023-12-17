<script setup>
const props = defineProps(["heading", "voice", "innerClass"]);
</script>

<template>
  <SectionColumn :innerClass="'page-title ' + innerClass">
    <h1 :class="voice ? voice : 'loud-voice'">
      {{ heading }}
    </h1>
    <slot />
  </SectionColumn>
</template>

<style scoped lang="scss">
.page-title {
  display: grid;
  justify-content: start;
  padding: var(--space-2xl) 15px;

  //   opacity: 0;

  @media (min-width: 768px) {
    margin-top: var(--space-l);
  }
  h1 {
    text-wrap: balance;
  }
}

main.ecosystem-detail .page-title {
  padding: var(--space-xl) 0px;
}
</style>
