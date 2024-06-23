<script setup>
import { reset } from "@formkit/core";
// Import the useOEVStore function to access the OEV store
const oev = useOEVStore();

//get the index of the userAdded protocol
const userDappIndex = oev.protocols.findIndex(
  (protocol) => protocol.slug === "userAdded"
);

const liquidationRate = 0.05; // 5% liquidation rate

// Define reactive variables
const form = ref({
  tvl: 5000000,
  incentive: 5,
}); // Reference to the form element

// Function to handle the button click event
function buttonHandle(event) {
  const tvl = event.tvl
    ? event.tvl.split(",").join("").replace("$", "")
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

  // Update the userAdded protocol with the new values
  oev.protocols[userDappIndex].totalLiquidated = totalLiquidated;
  oev.protocols[userDappIndex].totalIncentiveUSD = totalIncentiveUSD;
  oev.protocols[userDappIndex].totalSentToBuilderUSD = totalSentToBuilderUSD;
  oev.protocols[userDappIndex].totalProfitUSD = totalProfitUSD;

  //
  //   oev.userSelectedProtocols = {}; // Hide all protocols
  oev.userSelectedProtocols["dApp-1"] = "userAdded";

  //   reset("oev-form"); // Reset the form
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
      :config="{ validationVisibility: 'submit' }"
    >
      <form-field>
        <FormKit
          type="mask"
          suffix="%"
          mask="{##}#"
          show-mask="false"
          unmask-value="true"
          allow-incomplete="true"
          label="What is the liquidation incentive rate?"
          :classes="{
            label: '$reset calm-voice',
          }"
          name="incentive"
          placeholder="5%"
          id="incentive-percent"
          v-model="form.incentive"
          help="Enter the TVL percentage sent as a liquidation incentive."
          validation="numeric|between:1.00,100.00"
          validation-label="Incentive Rate"
        />
      </form-field>
      <form-field>
        <FormKit
          type="mask"
          prefix="$"
          mask="{#,##|repeat}#"
          show-mask="false"
          unmask-value="true"
          allow-incomplete="true"
          reverse
          label="What is the total value locked of your protocol?"
          :classes="{
            label: '$reset calm-voice',
          }"
          name="tvl"
          placeholder="$5,000,000"
          help="Optimal results are achieved with larger numerical values."
          id="tvl-input"
          v-model="form.tvl"
          step="100000"
          min="0"
          validation-label="TVL"
          validation="numeric"
        />
      </form-field>
    </FormKit>
  </ContentsWrapper>
</template>

<style scoped lang="scss">
form {
  display: grid;
  gap: var(--space-m);
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
</style>
