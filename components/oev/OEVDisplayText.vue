<script setup>
const oev = useOEVStore();

// Compute the user's total liquidated value (tvl) and total savings using OEV
const userSaving = computed(() =>
  oev.getProtocolById("userAdded") === undefined
    ? 0
    : oev.getProtocolById("userAdded").totalSentToBuilderUSD
);
</script>

<template>
  <SectionColumn class="user-tvl-text">
    <text-content>
      <p class="loud-voice">
        <span
          >With your TVL of
          <span class="gradient-text-color"
            >${{ formatNumber(oev.userTvl) }}</span
          >
          you would capture
          <span class="gradient-text-color"
            >${{ formatNumber(userSaving) }}</span
          >
          per year through the OEV Network**
        </span>
      </p>
      <p class="whisper-voice">
        **This is an estimate based on the current Liquidation rate of 5% of
        TVL.
      </p>
    </text-content>
  </SectionColumn>
</template>

<style lang="scss" scoped>
text-content {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  text-align: center;
  @media (min-width: 768px) {
    padding: var(--space-3xl);
  }

  .loud-voice {
    @media (max-width: 400px) {
      --font-size: var(--step-2);
    }
  }
}
.user-tvl-text {
  @supports (animation-timeline: view()) {
    text-content p span {
      background-repeat: no-repeat;
      background-size: 0 100%;
      animation: scroll-reveal linear forwards;
      animation-timeline: view() !important;

      animation-range-start: contain 10px !important;
      animation-range-end: contain 230px !important;

      &.gradient-text-color:nth-child(1) {
        animation-range-start: contain 170px !important;
        animation-range-end: contain 180px !important;
      }
      &.gradient-text-color:nth-child(2) {
        animation-range-start: contain 230px !important;
        animation-range-end: contain 240px !important;
      }

      &:not(.gradient-text-color) {
        color: hsla(0, 0%, 100%, 0.1) !important;
        background-image: var(--gradient-light);
        background-clip: text;
      }
    }
  }
}

@keyframes scroll-reveal {
  to {
    background-size: 100% 100%;
    scale: 1.1;
  }
}
</style>
