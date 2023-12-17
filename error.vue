<script setup>
const props = defineProps(["error"]);

const router = useRouter();

useHead({
  title: props?.error?.statusCode ?? "Error",
});
</script>

<template>
  <SectionColumn class="error-page">
    <h1 class="booming-voice gradient-text-color">
      {{ error.statusCode }}
    </h1>
    <h2 class="attention-voice">
      {{ error.message }}
    </h2>

    <div class="actions">
      <button class="button firm-voice" @click.prevent="router.back()">
        Go Back
      </button>
      <!-- button to go home -->
      <NuxtLink class="button firm-voice" to="/"> Go Home </NuxtLink>
    </div>

    <details v-auto-animate>
      <summary class="solid-voice">See Error Details</summary>
      <pre>
		<code v-html="error.stack"></code>
	 </pre>
    </details>
  </SectionColumn>
</template>

<style scoped lang="scss">
.error-page {
  display: grid;
  grid-template-rows: 1fr;
  place-items: center;

  h1.booming-voice {
    font-size: var(--step-5);
    padding: 0;
  }

  h2 {
    margin-bottom: var(--space-l);
  }

  :deep(inner-column) {
    display: grid;
    place-items: center;
    gap: var(--space-s);
  }
}
summary {
  text-align: center;
}
</style>
