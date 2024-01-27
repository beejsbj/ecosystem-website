<script setup>
// Import the useOEVStore function from the OEV store module
const oev = useOEVStore();

// Compute the average savings
const averageSavings = computed(() => {
  const totalSaving = oev.getTotals().totalSentToBuilderUSD;
  return (totalSaving / oev.protocols.length - 1).toFixed(2);
});

// Compute the OEV rate
const oevRate = computed(() => oev.getTotals().oevRate.toFixed(2));

// Compute the total savings
const totalSaving = computed(() =>
  oev.getTotals().totalSentToBuilderUSD.toFixed(2)
);
</script>

<template>
  <ul class="summary-cards">
    <!-- Display the OEV Saving Rate -->
    <li class="summary-card">
      <h3 class="teaser-voice">Amount of Protocol TVL Recaptured</h3>
      <p class="firm-voice">{{ oevRate * 100 ?? 0.21 }}%</p>
    </li>
    <!-- Display the Average Savings -->
    <li class="summary-card">
      <h3 class="teaser-voice">Average Value Recaptured</h3>
      <p class="firm-voice">${{ averageSavings ?? 21500 }}</p>
    </li>
    <!-- Display the Total Savings -->
    <li class="summary-card">
      <h3 class="teaser-voice">Total OEV Captured</h3>
      <p class="firm-voice">${{ totalSaving ?? 21500 }}</p>
    </li>
  </ul>
</template>

<style scoped>
/* Style the summary cards container */
ul {
  display: grid;

  gap: var(--space-m);
  padding-top: var(--space-m);

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

/* Style each summary card */
li {
  display: grid;
  padding: var(--space-m);
  border: var(--border);
  border-radius: var(--corners);
  background: var(--paper);
}
</style>
