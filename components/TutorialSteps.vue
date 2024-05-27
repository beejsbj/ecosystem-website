<script setup>
import { FormKitIcon } from "@formkit/vue";

const { currentTutorial, currentStep, currentStepNum, steps } =
  await useTutorial();

function cleanName(step) {
  const name = step.name.toLowerCase();

  if (name.includes("readme")) {
    return "Introduction";
  }

  return name.replace("-", " ");
}
</script>

<template>
  <ModalSlot>
    <nav>
      <ul>
        <li v-for="(step, i) in steps">
          <NuxtLink class="calm-voice text" :to="`?step-${i}`">
            {{ cleanName(step) }}
          </NuxtLink>
        </li>
      </ul>
    </nav>
  </ModalSlot>
</template>

<style scoped>
nav {
  background: var(--gray-darkest);
  padding: var(--space-m);
  border-radius: var(--corners);
}
ul {
  display: grid;
  gap: var(--space-m);
}
a {
  text-transform: capitalize;
  padding-inline-start: 0;
}
</style>
