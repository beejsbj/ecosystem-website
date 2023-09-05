<script setup>
import { useStatsStore } from "@/stores/stats";

const stats = useStatsStore();

//
</script>

<template>
  <PageTitle heading="Stats" />

  <SectionColumn>
    <h2 class="attention-voice">dAPI</h2>
    <ul class="charts-list">
      <li>
        <PieChart
          :data="stats.dapi.fulfilledOrdersPerChain.data"
          :metadata="stats.dapi.fulfilledOrdersPerChain.metadata"
          :options="stats.dapi.fulfilledOrdersPerChain.options"
        />
      </li>
      <li>
        <PieChart
          :data="stats.dapi.managedPerChain.data"
          :metadata="stats.dapi.managedPerChain.metadata"
          :options="stats.dapi.managedPerChain.options"
        />
      </li>
      <li>
        <PieChart
          :data="stats.dapi.transactionsPerChain.data"
          :metadata="stats.dapi.transactionsPerChain.metadata"
          :options="stats.dapi.transactionsPerChain.options"
        />
      </li>
      <li>
        <PieChart
          :data="stats.dapi.selfFundedPerChain.data"
          :metadata="stats.dapi.selfFundedPerChain.metadata"
          :options="stats.dapi.selfFundedPerChain.options"
        />
      </li>
      <li>
        <LineChart
          :data="stats.dapi.updatesPerDayPerChain.data"
          :metadata="stats.dapi.updatesPerDayPerChain.metadata"
          :options="stats.dapi.updatesPerDayPerChain.options"
        />
      </li>
    </ul>
  </SectionColumn>

  <SectionColumn>
    <h2 class="attention-voice">QRNG</h2>

    <ul class="charts-list">
      <li>
        <PieChart
          :data="stats.qrng.totals.data"
          :metadata="stats.qrng.totals.metadata"
          :options="stats.qrng.totals.options"
        />
      </li>
      <li>
        <PieChart
          :data="stats.qrng.last7Days.data"
          :metadata="stats.qrng.last7Days.metadata"
          :options="stats.qrng.last7Days.options"
        />
      </li>

      <li>
        <PieChart
          :data="stats.qrng.last30Days.data"
          :metadata="stats.qrng.last30Days.metadata"
          :options="stats.qrng.last30Days.options"
        />
      </li>

      <li>
        <BarChart
          :data="stats.qrng.last45Days.data"
          :metadata="stats.qrng.last45Days.metadata"
          :options="stats.qrng.last45Days.options"
        />
      </li>

      <li>
        <BarChart
          :data="stats.qrng.last52Weeks.data"
          :metadata="stats.qrng.last52Weeks.metadata"
          :options="stats.qrng.last52Weeks.options"
        />
      </li>
      <li>
        <BarChart
          :data="stats.qrng.last12Months.data"
          :metadata="stats.qrng.last12Months.metadata"
          :options="stats.qrng.last12Months.options"
        />
      </li>

      <li>
        <LineChart
          :data="stats.qrng.last2000Requests.data"
          :metadata="stats.qrng.last2000Requests.metadata"
          :options="stats.qrng.last2000Requests.options"
        />
      </li>
    </ul>
  </SectionColumn>
</template>

<style scoped>
ul {
  display: grid;
  /* grid-template-columns: repeat(auto-fit, minmax(500px, 1fr)); */
  /* grid-template-columns: 1fr 1fr; */
  gap: 4rem;
}
</style>
