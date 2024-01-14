<script setup>
// Import the useOEVStore function to access the OEV store
const oev = useOEVStore();

// Get the oevRate and maxLiquidated values from the OEV store
const oevRate = oev.getTotals().oevRate;
const maxLiquidated = oev.getTotals().totalLiquidated;

// Define reactive variables
const showOutput = ref(false); // Controls the visibility of the output section

// Function to add the user's input to the chart
function addToChart(totalLiquidated) {
  // Create a new protocol object and push it to the protocols array in the OEV store
  const userProtocol = {
    id: `userAdded`,
    totalLiquidated,
    withOEV: totalLiquidated + totalLiquidated * oevRate,
    totalSentToBuilderUSD: totalLiquidated * oevRate,
    name: `You`,
    trueHide: true,
  };
  oev.addProtocol(userProtocol);

  // Scroll to the next section
  const section = document.querySelector(".chart-grid");
  section.scrollIntoView({ behavior: "smooth" });
}

// Function to handle the button click event
function buttonHandle(event) {
  const tvl = oev.userTvl;
  addToChart(tvl); // Add the user's input to the chart
  oev.userTvl = 0; // Reset the user's input value
  showOutput.value = true; // Show the output section
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
}
</style>
