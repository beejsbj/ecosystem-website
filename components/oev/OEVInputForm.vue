<script setup>
const oev = useOEVStore();

const oevRate = oev.getTotals().oevRate;
const maxLiquidated = oev.getTotals().totalLiquidated;

// variables
const showOutput = ref(false);
const userAdded = ref(0);

function addToChart(totalLiquidated) {
  oev.protocols.push({
    id: `userAdded`,
    totalLiquidated,
    withOEV: totalLiquidated + totalLiquidated * oevRate,
    totalSentToBuilderUSD: totalLiquidated * oevRate,
    name: `You`,
    trueHide: true,
  });

  userAdded.value++;

  //scroll to next section
  const section = document.querySelector(".chart-grid");
  section.scrollIntoView({ behavior: "smooth" });
}

function buttonHandle(event) {
  const tvl = oev.userTvl;
  addToChart(tvl);
  oev.userTvl = 0;
  showOutput.value = true;
}
</script>

<template>
  <form v-auto-animate>
    <form-field>
      <FormKit
        type="number"
        label="How much TVL is in Protocol?"
        :classes="{
          label: '$reset notice-voice',
          input: 'notice-voice',
        }"
        name="tvl"
        placeholder="tvl"
        id="tvl"
        v-model.number="oev.userTvl"
        :max="maxLiquidated"
        :validation="`max: ${maxLiquidated}`"
        validation-label="TVL"
        :show-validation="showOutput"
      />
    </form-field>
    <button class="button" @click.prevent="buttonHandle" :disabled="showOutput">
      Add
    </button>
    <output v-auto-animate v-if="false">
      <p class="loud-voice">${{ (oev.userTvl * oevRate).toFixed(2) }}</p>
      <p class="">Money Earned if OEV Network is integrated</p>
    </output>
  </form>
</template>

<style scoped lang="scss">
form {
  display: grid;
  justify-content: center;

  --fk-font-size-input: var(--step-1);

  :deep(.formkit-wrapper) {
    max-width: unset !important;
  }

  //   @media (min-width: 768px) {
  //     grid-template-columns: repeat(2, 1fr);

  //     output {
  //       grid-column: 2;
  //       grid-row: 1 / span 2;
  //     }

  //     form-field,
  //     button {
  //       grid-column: 1;
  //     }
  //   }
}
</style>
