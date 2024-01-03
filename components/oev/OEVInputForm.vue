<script setup>
const oev = useOEVStore();

const oevRate = oev.getTotals().oevRate;
const maxLiquidated = oev.getTotals().totalLiquidated;

// variables
const userTvl = ref(0);
const showOutput = ref(false);
const userAdded = ref(0);

function addToChart(totalLiquidated) {
  oev.protocols.push({
    id: `userAdded${userAdded.value}`,
    totalLiquidated,
    withOEV: totalLiquidated + totalLiquidated * oevRate,
    totalSentToBuilderUSD: totalLiquidated * oevRate,
    name: `User Added ${userAdded.value}`,
    trueHide: true,
  });

  userAdded.value++;
}

function buttonHandle(event) {
  const tvl = userTvl.value;
  addToChart(tvl);
  userTvl.value = 0;
  showOutput.value = true;
}
</script>

<template>
  <form v-auto-animate>
    <output v-auto-animate>
      <p class="loud-voice">${{ (userTvl * oevRate).toFixed(2) }}</p>
      <p class="whisper-voice">Money Earned if OEV Network is integrated</p>
    </output>
    <form-field>
      <FormKit
        type="number"
        label="How much TVL is in Protocol?"
        label-class="$reset calm-voice"
        name="tvl"
        placeholder="tvl"
        id="tvl"
        v-model.number="userTvl"
        :max="maxLiquidated"
        :validation="`max: ${maxLiquidated}`"
        validation-label="TVL"
        :show-validation="showOutput"
      />
    </form-field>
    <button class="button whisper-voice" @click.prevent="buttonHandle">
      Add
    </button>
  </form>
</template>

<style scoped lang="scss">
form {
  display: grid;

  :deep(.formkit-wrapper) {
    max-width: unset !important;
  }

  // 	grid-template-columns: subgrid;
  //   output {
  //     grid-column: span 2;
  //     grid-row: span 2;
  //   }

  //   form-field,
  //   button {
  //     grid-column: span 2;
  //   }
}
</style>
