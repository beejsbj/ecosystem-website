<script setup>
const ui = useInterfaceStore();
</script>

<template>
  <SectionColumn>
    <h2
      :class="{
        'notice-voice': ui.isMobile,
        'attention-voice': !ui.isMobile,
      }"
    >
      How does it all work?
    </h2>

    <ul>
      <li v-for="step in 5">
        <picture :class="`step-${step}`">
          <img :src="`/images/oev/explainer-steps/step-${step}.png`" />
        </picture>
      </li>
    </ul>
  </SectionColumn>
</template>

<style scoped>
h2 {
  text-align: center;
}
ul {
  display: grid;
  grid-template-columns: repeat(5, 175px);
  margin-top: var(--space-xl);
  max-width: 320px;
  overflow-x: scroll;
}

li:has(+ li) {
  --arrow-size: 1.5rem;
  padding-right: var(--arrow-size);
  background-image: url("/images/oev/explainer-steps/arrow.svg");
  background-repeat: no-repeat;
  background-position: right 30%;
  background-size: var(--arrow-size);
}
</style>
