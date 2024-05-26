<script setup>
import sdk from "@stackblitz/sdk";
const { hasPreviousStep, hasNextStep, changeStep } = await useTutorial();

//
definePageMeta({
  layout: "tutorial",
});

onMounted(() => {
  const vm = sdk.embedProject(
    "stackblitz",
    {
      title: "Node Starter",
      description: "A basic Node.js project",
      template: "node",
      files: {
        "index.js": `console.log('Hello World!');`,
        "package.json": `{
      "name": "my-project",
      "scripts": { "hello": "node index.js", "start": "serve node_modules" },
      "dependencies": { "serve": "^14.0.0" },
      "stackblitz": { "installDependencies": true, "startCommand": "npm run hello" }
    }`,
      },
    },
    {
      openFile: "index.js",
      height: "100%",
    }
  );
});
</script>

<template>
  <div class="tutorial-container">
    <div class="guide-content">
      <ContentDoc />
      <div class="actions">
        <NuxtLink class="button" v-if="hasPreviousStep" :to="changeStep(-1)">
          Previous
        </NuxtLink>
        <NuxtLink class="button" v-if="hasNextStep" :to="changeStep(1)">
          Next
        </NuxtLink>
      </div>
    </div>
    <div class="stackblitz-container">
      <div id="stackblitz"></div>
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
  align-self: center;
}

div.actions {
  margin-top: var(--space-xl);
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
