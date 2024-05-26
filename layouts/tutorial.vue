<script setup>
import { FormKitIcon } from "@formkit/vue";

const { currentTutorial, currentStep, currentStepNum, stepsCount } =
  await useTutorial();

const ui = useInterfaceStore();
</script>

<template>
  <header>
    <NuxtLink class="icon" to="/">
      <FormKitIcon icon="left" />
    </NuxtLink>
    <p>
      {{ currentTutorial }}
    </p>
  </header>
  <main>
    <slot />
  </main>
  <footer>
    <div class="actions">
      <div class="step-info">
        <button class="icon" @click="ui.toggleModal">
          <FormKitIcon icon="info" />
        </button>

        <TutorialSteps />

        <p class="step-counter">{{ currentStepNum }} / {{ stepsCount }}</p>
      </div>

      <button class="button outline whisper-voice">Reset</button>
    </div>
  </footer>
</template>

<style scoped lang="scss">
header,
footer,
main {
  padding: var(--space-3xs) var(--space-s);
}

main {
  padding-inline-start: 0;
}

header {
  display: flex;
  align-items: center;

  .icon {
    /* color: var(--ink); */
    max-width: 32px;
  }
}

footer {
  .actions {
    justify-content: space-between;

    .step-info {
      display: flex;
      align-items: center;
    }
    button.icon {
      /* color: var(--ink); */
      max-width: 45px;
    }
  }
}
</style>

<style>
#nuxt-devtools-container,
w3m-modal {
  display: none;
}
</style>
