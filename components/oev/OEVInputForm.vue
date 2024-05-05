<script setup>
import { reset } from "@formkit/core";
// Import the useOEVStore function to access the OEV store
const oev = useOEVStore();

//get the index of the userAdded protocol
const userDappIndex = oev.protocols.findIndex(
  (protocol) => protocol.id === "userAdded"
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
    const tvl = Number(newForm.tvl);
    const incentive = Number(newForm.incentive);

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
  },
  { deep: true }
);

onMounted(() => {
  const form = document.getElementById("oev-form");
  const incentive = document.getElementById("incentive-percent");
  const tvl = document.getElementById("tvl-input");

  console.clear();
  console.dir(incentive);
});
</script>

<template>
  <SectionColumn>
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
      <h2 class="solid-voice">Calculate Your Protocol's Potential</h2>
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
          validation="required|numeric|between:1.00,100.00"
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
          validation="required|numeric"
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

form > :deep(.formkit-messages) {
  display: none !important;
}
</style>
