<script setup>
/**
 * OEVFormChartSection Component
 * 
 * A section component that combines OEV input form, display text, protocol list, and interface chart.
 *
 * @component
 *
 * @example
 * <OEVFormChartSection />
 *
 * @features
 * - Displays either an input form or display text based on user visibility state
 * - Includes a protocol list and interface chart
 * - Uses lazy loading for child components to improve performance
 * - Implements a transition effect when switching between input form and display text
 * - Responsive design with different layouts for mobile and desktop
 */

const oev = useOEVStore();
</script>

<template>
  <SectionColumn class="form-chart-section">
    <Transition name="page" mode="out-in">
      <LazyOEVInputForm v-if="!oev.isUserVisible" />
      <LazyOEVDisplayText v-else />
    </Transition>

    <LazyOEVProtocolList />
    <LazyOEVInterfaceChart />
  </SectionColumn>
</template>

<style scoped lang="scss">
.form-chart-section {
  padding-inline: var(--space-l);
  margin-bottom: var(--space-2xl);

  @media (min-width: 1000px) {
    padding-inline: 0;
  }

  :deep(inner-column) {
    background: var(--gradient-radial-green);
    border-radius: calc(var(--corners) * 2);
    display: grid;
    gap: var(--space-l);

    @media (min-width: 1000px) {
      padding-inline: calc(var(--space-l) * 3);
    }

    & > * {
      // max-width: 560px;
      margin-inline: auto;

      @media (min-width: 1000px) {
        max-width: unset;
      }
    }
  }
}
</style>
