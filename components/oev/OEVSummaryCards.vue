<script setup>
const oev = useOEVStore();

const averageSavings = computed(() => {
  const totalSaving = oev.getTotals().totalSentToBuilderUSD;
  return (totalSaving / oev.protocols.length - 1).toFixed(2);
});

const oevRate = computed(() => oev.getTotals().oevRate.toFixed(2));

const totalSaving = computed(() =>
  oev.getTotals().totalSentToBuilderUSD.toFixed(2)
);
</script>

<template>
  <ul class="summary-cards">
    <li class="summary-card">
      <h3 class="teaser-voice">OEV Saving Rate</h3>
      <!-- <p class="whisper-voice">Total Liquidated Value</p> -->
      <p class="firm-voice">{{ oevRate * 100 ?? 0.21 }}%</p>
    </li>
    <li class="summary-card">
      <h3 class="teaser-voice">Average Savings</h3>
      <!-- <p class="whisper-voice">Total Liquidated Value</p> -->
      <p class="firm-voice">${{ averageSavings ?? 21500 }}</p>
    </li>
    <li class="summary-card">
      <h3 class="teaser-voice">Total Savings</h3>
      <!-- <p class="whisper-voice">Total Liquidated Value</p> -->
      <p class="firm-voice">${{ totalSaving ?? 21500 }}</p>
    </li>
  </ul>
</template>

<style scoped>
ul {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-m);
  padding-top: var(--space-m);
}

li {
  display: grid;
  padding: var(--space-m);
  border: var(--border);
  border-radius: var(--corners);
  background: var(--paper);
}
</style>
