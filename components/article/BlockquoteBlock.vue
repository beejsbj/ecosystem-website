<script setup>
const props = defineProps(["quote", "source"]);
</script>

<template>
  <blockquote>
    <p>
      {{ quote }}
    </p>
    <figcaption>—{{ source }}</figcaption>
  </blockquote>
</template>

<style scoped lang="scss">
blockquote {
  margin: var(--space-l) 0;

  padding: var(--space-2xl);
  background: var(--gradient-dark);
  display: block;
  max-width: 70ch;
  color: var(--ink);
  position: relative;
  border-radius: var(--corners);
  //   overflow: hidden;
  z-index: 1;

  p {
    margin: 0;
    padding: 0;
    font-style: italic;
  }
  figcaption {
    margin-top: var(--space-s);
    color: var(--green);
    text-align: right;
    font-style: normal;
  }

  &::after {
    content: "“";
    position: absolute;
    top: 1rem;
    left: 1rem;
    font-size: 10rem;
    color: var(--violet);
    z-index: 1;
    opacity: 0.5;
  }

  p::after {
    content: "";
    position: absolute;
    inset: calc(var(--line-width) * -1);
    z-index: -2;
    background: var(--gradient-dark);
    border-radius: calc(var(--corners) + 3rem);
  }
}
</style>
