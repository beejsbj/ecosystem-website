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
const form = ref({}); // Reference to the form element

// Function to handle the button click event
function buttonHandle(event) {
  const tvl = event.tvl.split(",").join("").replace("$", "");
  const incentive = event.incentive;

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
  oev.hideAll(); // Hide all protocols
  oev.protocols[userDappIndex].hide = false; // Unhide the userAdded protocol

  // Scroll to the next section
  const section = document.querySelector(".chart-grid");
  section.scrollIntoView({ behavior: "smooth" });

  //   reset("oev-form"); // Reset the form
}

//watch

watch(
  form,
  (newForm) => {
    const tvl = newForm.tvl.split(",").join("").replace("$", "");
    const incentive = newForm.incentive;

    oev.userTvl = tvl;
    oev.userIncentive = incentive;

    // Calculate the total liquidated value, total incentive, total sent to builder, and total profit
    const incentiveRate = incentive / 100;
    const totalLiquidated = tvl * liquidationRate;
    const totalIncentiveUSD = totalLiquidated * incentiveRate;
    const totalSentToBuilderUSD = totalIncentiveUSD * 0.75;
    const totalProfitUSD = totalIncentiveUSD * 0.25;

    if (!oev?.protocols) {
      return;
    }
    // Update the userAdded protocol with the new values
    oev.protocols[userDappIndex].totalLiquidated = totalLiquidated;
    oev.protocols[userDappIndex].totalIncentiveUSD = totalIncentiveUSD;
    oev.protocols[userDappIndex].totalSentToBuilderUSD = totalSentToBuilderUSD;
    oev.protocols[userDappIndex].totalProfitUSD = totalProfitUSD;
  },
  { deep: true }
);
</script>

<template>
  <SectionColumn>
    <FormKit
      id="oev-form"
      type="form"
      @submit="buttonHandle"
      submit-label="Visualize your dApp"
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
          prefix-icon="percent"
          id="incentive"
          v-model.number="form.incentive"
          help="Enter the TVL percentage sent as a liquidation incentive."
          validation="required|numeric|min:0.5|max:100"
          validation-label="Incentive Rate"
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
          placeholder="$5,000,000"
          prefix-icon="dollar"
          mask="${###,|repeat}###"
          reverse
          allow-incomplete="true"
          show-mask="false"
          help="Optimal results are achieved with larger numerical values."
          id="tvl"
          v-model="form.tvl"
          step="100000"
          min="0"
          validation-label="TVL"
          validation="required"
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
