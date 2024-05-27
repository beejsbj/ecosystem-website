<script setup>
const {
  hasPreviousStep,
  hasNextStep,
  parsedMarkdown,
  currentStep,
  changeStep,
  initTutorial,
} = await useTutorial();

// function handleClick(direction) {

// }

//
definePageMeta({
  layout: "tutorial",
});

//
onMounted(() => {
  initTutorial();
});
</script>

<template>
  <div class="tutorial-container">
    <div class="guide-content">
      <Transition name="page" mode="out-in">
        <ContentRendererMarkdown
          :value="parsedMarkdown"
          v-if="parsedMarkdown"
          :key="'step-' + currentStep"
        />
      </Transition>

      <!--  -->
      <div class="actions" v-auto-animate>
        <button
          class="button prev-step"
          v-if="hasPreviousStep"
          @click="changeStep(-1)"
        >
          Previous
        </button>
        <button
          class="button next-step"
          v-if="hasNextStep"
          @click="changeStep(1)"
        >
          {{ !hasPreviousStep ? "Start" : "Next" }}
        </button>
      </div>
    </div>
    <div class="stackblitz-container" v-auto-animate>
      <Transition name="page" mode="out-in">
        <div id="stackblitz"></div>
      </Transition>
    </div>
  </div>
</template>

<style scoped>
.tutorial-container {
  display: grid;
  gap: var(--space-m);
  height: 100%;

  @media (min-width: 768px) {
    grid-template-columns: 0.5fr 1fr;
  }
}
.guide-content {
  max-height: 800px;
  overflow-y: scroll;
  padding-inline: var(--space-s);

  display: grid;
  align-items: center;
}

div.actions {
  margin-top: var(--space-xl);
  justify-content: space-between;

  align-self: end;

  .next-step {
    justify-self: end;
  }
}

/* .tutorial-container { */
/* padding-inline: var(--space-s); */
/* background: var(--gray-darkest); */
/* } */

.stackblitz-container {
  max-height: 100%;
  border-radius: var(--corners);
  overflow: hidden;
}

iframe#stackblitz {
  display: block;
  width: 100%;
}
</style>
