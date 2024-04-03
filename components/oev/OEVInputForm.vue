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
    chainId: 1,
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

  const tvl = event.tvl.split(",").join("");
  const incentive = event.incentive;

  oev.userTvl = tvl;

  oev.userIncentive = incentive;

  const totalLiquidated = tvl * liquidationRate;
  const incentiveRate = incentive / 100;

  addToChart(totalLiquidated, incentiveRate); // Add the user's input to the chart

  form.value = {}; // Reset the form
  formSubmitted.value = true; // Show the output section
}
</script>

<template>
  <SectionColumn>
    <FormKit
      type="form"
      @submit="buttonHandle"
      submit-label="Visualize your dApp"
      :submit-attrs="{
        inputClass: '$reset button' + (formSubmitted ? ' disabled' : ''),
      }"
      :disabled="formSubmitted"
    >
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
          placeholder="5%"
          id="incentive"
          v-model.number="form.incentive"
          :show-validation="formSubmitted"
          suffix-icon="info"
          help="Enter the TVL percentage sent as a liquidation incentive."
        />
      </form-field>
      <form-field>
        <FormKit
          type="mask"
          label="What is the total value locked of your protocol?"
          :classes="{
            label: '$reset calm-voice',
          }"
          name="tvl"
          placeholder="5000000"
          mask="###{,###|repeat}"
          allow-incomplete="true"
          show-mask="false"
          help="Optimal results are achieved with larger numerical values."
          id="tvl"
          v-model="form.tvl"
          step="100000"
          min="0"
          validation-label="TVL"
          :show-validation="formSubmitted"
          suffix-icon="info"
        />
      </form-field>
    </FormKit>
  </SectionColumn>
</template>

<style scoped lang="scss">
form {
  display: grid;
  gap: var(--space-m);
  justify-content: center;

  --fk-font-size-input: var(--step-0);

  :deep(.formkit-wrapper) {
    max-width: unset !important;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;

    h2,
    :deep(.formkit-actions) {
      grid-column: 1 / -1;
      justify-self: center;
    }
  }
}

h2 {
  text-align: center;
}
</style>
