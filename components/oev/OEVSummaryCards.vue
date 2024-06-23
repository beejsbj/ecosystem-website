<script setup>
import formatNumber from "@/utils/formatNumber";

// Import the useOEVStore function from the OEV store module
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
  //   {
  //     title: "TOTAL SENT TO BUILDER",
  //     value: `$${formatNumber(totalSentToBuilderUSD)}*`,
  //   },
  {
    title: "OEV Lost",
    value: `$${formatNumber(totalIncentiveUSD)}`,
  },
  //   {
  //     title: "TOTAL Searcher PROFIT",
  //     value: `$${formatNumber(totalProfitUSD)}*`,
  //   },
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
      <h3 class="calm-voice">{{ card.title }}</h3>
      <p
        :class="{
          'firm-voice': !ui.isDesktop,
          'attention-voice': ui.isDesktop,
        }"
      >
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
</style>
