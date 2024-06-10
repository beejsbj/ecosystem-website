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
  display: none;
  grid-template-columns: repeat(5, 1fr);
  margin-top: var(--space-xl);
  max-width: 400px;
}

li:has(+ li) {
  padding-right: 2rem;
  background-image: url("/images/oev/explainer-steps/arrow.svg");
  background-repeat: no-repeat;
  background-position: right 30%;
  background-size: 2rem;
}
</style>
