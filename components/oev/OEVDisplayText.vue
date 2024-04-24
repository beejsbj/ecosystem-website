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
    <div>
      <p class="loud-voice">
        With a TVL of

        <span class="gradient-text-color">
          ${{ oev.userTvl ? formatNumber(oev.userTvl) : "1B" }}
        </span>

        <!-- if userTvl is not defined, display the following text -->
        <span v-if="!oev.userTvl">
          and a <span class="gradient-text-color">5%</span> incentive rate
        </span>

        you would recapture

        <span class="gradient-text-color">
          ${{ oev.userTvl ? formatNumber(userSaving) : "1.9M" }}
        </span>

        per year through the OEV Network
      </p>

      <p class="whisper-voice">
        **This is an estimate based on the current Liquidation rate of 5% of TVL
        annually.
      </p>
    </div>
  </SectionColumn>
</template>

<style lang="scss" scoped>
div {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  text-align: center;
  padding-top: var(--space-3xl);
  padding-bottom: var(--space-3xl);

  @media (min-width: 768px) {
    padding: var(--space-3xl);
  }

  .loud-voice {
    @media (max-width: 500px) {
      --font-size: var(--step-2);
    }
  }
}

p {
  line-height: 1.3;
}

.gradient-text-color {
  padding: 0;
}
</style>
