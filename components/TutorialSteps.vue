<script setup>
import { FormKitIcon } from "@formkit/vue";

const { currentTutorial, currentStep, currentStepNum, steps } =
  await useTutorial();

function cleanName(step) {
  console.log(step);

  const path = step._path.split("/");
  const stepArr = path[path.length - 1].split("-");
  const cleaned = stepArr.join(" ");

  return cleaned;
}
</script>

<template>
  <ModalSlot>
    <nav>
      <ul>
        <li v-for="step in steps">
          <NuxtLink class="calm-voice text" :to="step._path">
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
