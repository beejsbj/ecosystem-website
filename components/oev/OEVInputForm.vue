<script setup>
/**
 * OEVInputForm Component
 *
 * A form component for calculating and visualizing a dApp's potential based on user input.
 *
 * @component
 *
 * @example
 * <OEVInputForm />
 *
 * @features
 * - Allows users to input liquidation incentive rate and total value locked (TVL)
 * - Calculates various metrics based on user input (e.g., total liquidated value, total incentive, etc.)
 * - Updates the OEV store with calculated values
 * - Provides form validation and input constraints
 * - Responsive design with custom styling
 *

 *
 * @notes
 * - Relies on the OEV store for state management
 * - Uses FormKit for form handling and validation
 * - Assumes the existence of a 'userAdded' protocol in the OEV store
 */

import { reset } from "@formkit/core";
// Import the useOEVStore function to access the OEV store
const oev = useOEVStore();

//get the index of the userAdded protocol
const userDappIndex = oev.protocols.findIndex(
  (protocol) => protocol.slug === "userAdded"
);

const liquidationRate = 0.05; // 5% liquidation rate

// Define reactive variables
const form = ref({}); // Reference to the form element

// Function to handle the button click event
function buttonHandle(event) {
  const tvl = event.tvl
    ? String(event.tvl).split(",").join("").replace("$", "")
    : 5000000;
  const incentive = event.incentive ? event.incentive : 5;

  oev.userTvl = tvl;
  oev.userIncentive = incentive;

  // Calculate the total liquidated value, total incentive, total sent to builder, and total profit
  const incentiveRate = incentive / 100;
  const totalLiquidated = tvl * liquidationRate;
  const totalIncentiveUSD = totalLiquidated * incentiveRate;
  const totalSentToBuilderUSD = totalIncentiveUSD * 0.75;
  const totalProfitUSD = totalIncentiveUSD * 0.25;
  const totalOevLostUSD = totalSentToBuilderUSD + totalProfitUSD;

  // Update the userAdded protocol with the new values
  oev.protocols[userDappIndex].totalLiquidated = totalLiquidated;
  oev.protocols[userDappIndex].totalIncentiveUSD = totalIncentiveUSD;
  oev.protocols[userDappIndex].totalSentToBuilderUSD = totalSentToBuilderUSD;
  oev.protocols[userDappIndex].totalProfitUSD = totalProfitUSD;
  oev.protocols[userDappIndex].totalOevLostUSD = totalOevLostUSD;

  oev.userSelectedProtocols["dApp-1"] = "userAdded";
}

function adjustIncentiveValue(value) {
  if (value < 1) {
    form.value.incentive = 1;
  } else if (value > 100) {
    form.value.incentive = 100;
  }
}
</script>

<template>
  <ContentsWrapper>
    <h2 class="attention-voice">Calculate Your dApp's Potential</h2>

    <FormKit
      id="oev-form"
      type="form"
      @submit="buttonHandle"
      submit-label="Visualize your dApp"
      :submit-attrs="{
        inputClass: '$reset button',
      }"
      :config="{ validationVisibility: 'blur' }"
    >
      <form-field>
        <FormKit
          type="number"
          number
          :prefix-icon="false"
          label="What is the liquidation incentive rate?"
          name="incentive"
          placeholder="5%"
          id="incentive-percent"
          v-model="form.incentive"
          help="Enter the TVL percentage sent as a liquidation incentive."
          validation="numeric|between:1,100"
          validation-label="Incentive Rate"
          @input="adjustIncentiveValue"
        />
      </form-field>
      <form-field>
        <FormKit
          type="text"
          number
          label="What is the total value locked of your protocol?"
          name="tvl"
          placeholder="$5,000,000"
          help="Optimal results are achieved with larger numerical values."
          id="tvl-input"
          v-model="form.tvl"
          validation-label="TVL"
        />
      </form-field>
    </FormKit>
  </ContentsWrapper>
</template>

<style scoped lang="scss">
form {
  display: grid;
  gap: var(--space-xl);
  justify-content: center;
  margin-top: var(--space-l);

  :deep(.formkit-actions) {
    margin-top: var(--space-m);
    justify-self: center;

    grid-column: 1 / -1;
  }
}

h2 {
  text-align: center;
}

form > :deep(.formkit-messages) {
  display: none !important;
}

:deep(.formkit-label, .formkit-input) {
  font-size: var(--step-0);
}

.contents-wrapper {
  display: inherit;
  gap: inherit;
  grid-template-columns: inherit;
  grid-template-rows: inherit;
  flex: inherit;
  flex-wrap: inherit;
}
</style>
