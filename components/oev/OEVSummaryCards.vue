<script setup>
/**
 * OEVSummaryCards Component
 *
 * A component that displays summary cards with key OEV (Oracle Extractable Value) metrics.
 *
 * @component
 *
 * @example
 * <OEVSummaryCards />
 *
 * @features
 * - Displays multiple summary cards with OEV-related statistics
 * - Responsive design that adjusts layout based on screen size and number of cards
 * - Utilizes data from the OEV store for calculations
 * - Applies custom styling for visual appeal
 * 
 * @notes
 * - Currently displays "Total Liquidated" and "OEV Lost" metrics
 * - Includes a disclaimer about data source
 * - Some card options are commented out in the current implementation
 */

import formatNumber from "@/utils/formatNumber";

const oev = useOEVStore();
const ui = useInterfaceStore();

// Compute the OEV rate
const {
  totalLiquidated,
  totalSentToBuilderUSD,
  totalIncentiveUSD,
  totalProfitUSD,
} = oev.getTotals();

const cards = [
  {
    title: "Total Liquidated",
    value: `$${formatNumber(totalLiquidated)}`,
  },
  {
    title: "OEV Lost",
    value: `$${formatNumber(totalIncentiveUSD)}`,
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
  <div class="summary-cards">
    <ul class="summary-cards-list">
      <!-- Display the OEV Saving Rate -->
      <li class="summary-card" v-for="card in cards">
        <h3 class="calm-voice">{{ card.title }}</h3>
        <p
          :class="{
            'notice-voice': !ui.isDesktop,
            'attention-voice': ui.isDesktop,
          }"
        >
          {{ card.value }}
        </p>
      </li>
    </ul>
    <p class="whisper-voice disclamer">
      *All data is based on records from 2021 onwards
    </p>
  </div>
</template>

<style scoped>
.summary-cards {
  padding-inline: var(--space-s);
}

/* Style the summary cards container */
ul {
  display: grid;
  --grid-count: v-bind(gridCount);

  gap: var(--space-m);
  padding-top: var(--space-m);

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  }
}

/* Style each summary card */
li {
  display: grid;

  gap: var(--space-xs);
  padding: var(--space-s);
  padding-bottom: var(--space-m);
  position: relative;
  /* border: var(--border-dark); */

  border-radius: var(--corners);
  text-align: center;
  background: var(--gradient-radial-green);

  &::after {
    content: "";
    position: absolute;
    inset: -1px;
    background: linear-gradient(
      180deg,
      rgba(94, 255, 215, 0.4) -25.46%,
      rgba(94, 255, 215, 0) 79%
    );
    z-index: -1;
    border-radius: var(--corners);
  }
}

h3 {
  color: var(--green-lightest);
}
p {
  margin-top: unset;
}

p.disclamer {
  margin-top: var(--space-l);
}
</style>
