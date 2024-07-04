<script setup>
const oev = useOEVStore();
</script>

<template>
  <SectionColumn class="form-chart-section">
    <Transition name="fade" mode="out-in">
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
      max-width: 560px;
      margin-inline: auto;

      @media (min-width: 1000px) {
        max-width: unset;
      }
    }
  }
}
</style>
