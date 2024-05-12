<script setup>
const props = defineProps(["dapp", "proxy"]);
</script>

<template>
  <div class="chain-value-card">
    <text-content>
      <h2 class="teaser-voice">Chain Value</h2>
      <p class="value attention-voice">$176.2</p>
    </text-content>

    <div class="source-card">
      <h2 class="teaser-voice">Source</h2>
      <div>
        <picture>
          <NuxtImg loading="lazy" src="/images/chains/bsc.svg" alt="bsc" />
        </picture>
        <p class="solid-voice">Chainlink</p>
      </div>
    </div>

    <text-content>
      <h2 class="teaser-voice">OEV Value</h2>
      <p class="value attention-voice">$176.2</p>
    </text-content>
  </div>
</template>

<style scoped lang="scss">
.chain-value-card {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-s);
  padding: var(--space-m);

  align-self: start;

  background: var(--paper);

  border: var(--border-dark);
  border-radius: var(--corners);

  p.value {
    margin-top: var(--space-2xs);
  }
}

.source-card {
  div {
    margin-top: var(--space-2xs);
    display: flex;
    gap: var(--space-s);
    align-items: center;
  }

  picture {
    aspect-ratio: 1/1;
    border-radius: 50%;
    width: 100%;
    max-width: 42px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
