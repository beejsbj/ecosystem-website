<script setup>
import formatNumber from "@/utils/formatNumber";

// Import the useOEVStore function from the OEV store module
const oev = useOEVStore();
const ui = useInterfaceStore();

// Compute the OEV rate
const oevRate = computed(() => oev.getTotals().oevRate.toFixed(2));
</script>

<template>
  <ul class="summary-cards">
    <!-- Display the OEV Saving Rate -->
    <li class="summary-card">
      <h3 class="teaser-voice">TOTAL LIQUIDATED</h3>
      <p class="attention-voice">
        ${{ formatNumber(oev.getTotals().totalLiquidated) }}*
      </p>
    </li>
    <!-- Display the Average Savings -->
    <li class="summary-card">
      <h3 class="teaser-voice">TOTAL OEV LOST</h3>
      <p class="attention-voice">
        ${{ formatNumber(oev.getTotals().totalSentToBuilderUSD) }}*
      </p>
    </li>
    <!-- Display the Total Savings -->
    <li class="summary-card hide" v-if="false">
      <h3 class="teaser-voice">OEV Capture Rate</h3>
      <p class="attention-voice">{{ oevRate }}%</p>
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
    grid-template-columns: repeat(2, 1fr);
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
