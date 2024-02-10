<script setup>
// Import the useOEVStore function to access the OEV store
const oev = useOEVStore();

// Define reactive variables
const formSubmitted = ref(false); // Controls the visibility of the output section
const form = ref({}); // Reference to the form element

// Function to add the user's input to the chart
function addToChart(totalLiquidated, incentiveRate) {
  // Create a new protocol object and push it to the protocols array in the OEV store
  const userProtocol = {
    id: `userAdded`,
    totalLiquidated,
    withOEV: totalLiquidated - totalLiquidated * incentiveRate,
    totalSentToBuilderUSD: totalLiquidated * incentiveRate,
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
  const liquidationRate = 0.05; // 5% liquidation rate

  oev.userTvl = form.value.tvl;
  oev.userIncentive = form.value.incentive;

  const totalLiquidated = form.value.tvl * liquidationRate;
  const incentiveRate = form.value.incentive / 100;

  addToChart(totalLiquidated, incentiveRate); // Add the user's input to the chart

  form.value = {}; // Reset the form
  formSubmitted.value = true; // Show the output section
}
</script>

<template>
  <form v-auto-animate>
    <h2 class="solid-voice">Calculate Your Protocol's Potential</h2>
    <form-field>
      <FormKit
        type="number"
        label="What is the liquidation incentive rate?"
        :classes="{
          label: '$reset calm-voice',
        }"
        name="incentive"
        min="0.5"
        max="100"
        step="0.5"
        placeholder="Enter the percentage"
        id="incentive"
        v-model.number="form.incentive"
        :show-validation="formSubmitted"
      />
    </form-field>
    <form-field>
      <FormKit
        type="number"
        label="What is the total value locked of your protocol?"
        :classes="{
          label: '$reset calm-voice',
        }"
        name="tvl"
        placeholder="Enter amount of TVL"
        help="Large numbers work best."
        id="tvl"
        v-model.number="form.tvl"
        step="100000"
        min="0"
        validation-label="TVL"
        :show-validation="formSubmitted"
      />
    </form-field>

    <button
      class="button"
      @click.prevent="buttonHandle"
      :disabled="formSubmitted"
    >
      Visualize your dApp
    </button>
  </form>
</template>

<style scoped lang="scss">
form {
  display: grid;
  gap: var(--space-s);
  justify-content: center;

  --fk-font-size-input: var(--step-0);

  :deep(.formkit-wrapper) {
    max-width: unset !important;
  }
}

h2 {
  text-align: center;
}
</style>
