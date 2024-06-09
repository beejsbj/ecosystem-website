<script setup>
import { button } from "@formkit/icons";

const oev = useOEVStore();

// Compute the user's total liquidated value (tvl) and total savings using OEV
const userSaving = computed(() =>
  oev.getProtocolById("userAdded") === undefined
    ? 0
    : oev.getProtocolById("userAdded").totalSentToBuilderUSD
);

function buttonHandle() {
  oev.userIncentive = 0;
  oev.userTvl = 0;
}
</script>

<template>
  <ContentsWrapper class="user-tvl-text">
    <div>
      <p class="attention-voice">
        With a
        <span class="highlight-green">
          ${{ oev.userIncentive ? oev.userIncentive : "5%" }}</span
        >
        incentive rate and TVL of
        <span class="highlight-green">
          ${{ oev.userTvl ? formatNumber(oev.userTvl) : "1B" }}
        </span>
        you would recapture
      </p>
      <p class="booming-voice highlight-green">
        ${{ oev.userTvl ? formatNumber(userSaving) : "1.9M" }} per year
      </p>
      <p class="notice-voice">Through the OEV Network**</p>

      <p class="calm-voice">
        **This is an estimate based on the current liquidation rate of 5% of TVL
        annually
      </p>
      <button class="button outline firm-voice" @click="buttonHandle">
        Calculate Again
      </button>
    </div>
  </ContentsWrapper>
</template>

<style lang="scss" scoped>
div {
  grid-column: 1 / -1;
  display: grid;
  place-items: center;
  text-align: center;

  .loud-voice {
    @media (max-width: 400px) {
      --font-size: var(--step-2);
    }
  }
}

p {
  line-height: 1.3;
  text-wrap: balance;

  + .booming-voice {
    margin-top: 0;
  }
}

.calm-voice {
  color: var(--gray);
}

button {
  margin-top: var(--space-m);
}
</style>
