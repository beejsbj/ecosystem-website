<script setup>
const ui = useInterfaceStore();
</script>

<template>
  <SectionColumn>
    <div class="hero-container">
      <h1
        class="page-title"
        :class="{ 'attention-voice': ui.isMobile, 'loud-voice': !ui.isMobile }"
      >
        OEV Watchtower
      </h1>
      <p :class="{ 'calm-voice': ui.isMobile, 'notice-voice': !ui.isMobile }">
        Understand how much you can capture with OEV Network*
      </p>
      <picture class="hero-tower">
        <img
          v-if="ui.isDesktop"
          src="@/assets/images/tower-graphic-desktop.svg"
          alt="OEV Tower"
        />
        <img v-else src="@/assets/images/tower-graphic.svg" alt="OEV Tower" />
      </picture>

      <!-- OEV Summary Cards component -->
      <OEVSummaryCards class="summary-cards" />
      <p class="whisper-voice disclamer">
        *All data is based on records from 2021 onwards
      </p>
    </div>
  </SectionColumn>
</template>

<style scoped lang="scss">
section {
  //   background: ;
}

:deep(inner-column) {
  padding-top: 0;
}
.hero-container {
  display: grid;
  row-gap: var(--space-s);
  grid-template-columns: 1fr 1.5fr;
  align-items: end;

  @media (min-width: 768px) {
    grid-template-columns: repeat(12, 1fr);
    row-gap: var(--space-m);
    align-items: unset;
  }
}

h1 {
  @media (min-width: 768px) {
    grid-column: span 9;
  }

  @media (min-width: 1100px) {
    grid-column: span 6;
  }
}

p {
  grid-column: 1 / -1;

  @media (min-width: 768px) {
    grid-column: span 9;
  }
  @media (min-width: 1100px) {
    grid-column: span 6;
  }
}

.hero-tower {
  grid-column: 2 / -1;
  grid-row: 1;

  @media (min-width: 768px) {
    grid-column: span 3 / -1;
    grid-row: 1 / span 5;
  }
  @media (min-width: 1100px) {
    grid-column: span 6 / -1;
  }
}

.summary-cards {
  grid-column: 1 / -1;

  @media (min-width: 768px) {
    grid-column: span 9;
  }
  @media (min-width: 1100px) {
    grid-column: span 6;
    scale: 1.1;
    transform-origin: left;
  }
}
</style>
