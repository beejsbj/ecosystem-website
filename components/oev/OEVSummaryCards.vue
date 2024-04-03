<script setup>
import formatNumber from "@/utils/formatNumber";

// Import the useOEVStore function from the OEV store module
const oev = useOEVStore();
const ui = useInterfaceStore();

// Compute the OEV rate
const oevRate = computed(() => oev.getTotals().oevRate.toFixed(2));

const cards = [
  {
    title: "TOTAL LIQUIDATED",
    value: `$${formatNumber(oev.getTotals().totalLiquidated)}*`,
  },
  {
    title: "TOTAL SENT TO BUILDER",
    value: `$${formatNumber(oev.getTotals().totalSentToBuilderUSD)}*`,
  },
];

const gridCount = computed(() => {
  if (cards.length == 1) {
    return 1;
  }
  return cards.length % 2 === 0 ? 2 : 3;
});
</script>

<template>
  <ul class="summary-cards">
    <!-- Display the OEV Saving Rate -->
    <li class="summary-card" v-for="card in cards">
      <h3 class="teaser-voice">{{ card.title }}</h3>
      <p class="attention-voice">
        {{ card.value }}
      </p>
    </li>
  </ul>
</template>

<style scoped>
/* Style the summary cards container */
ul {
  display: grid;
  --grid-count: v-bind(gridCount);

  gap: var(--space-m);
  padding-top: var(--space-m);

  @media (min-width: 768px) {
    grid-template-columns: repeat(var(--grid-count), 1fr);
  }
}

/* Style each summary card */
li {
  display: grid;
  gap: var(--space-xs);
  padding: var(--space-m);
  border: var(--border-dark);
  border-radius: var(--corners);
  text-align: center;
  background: var(--gradient-radial-dark);

  p {
    margin-top: unset;
  }
}
</style>
