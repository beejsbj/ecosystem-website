<script setup>
/**
 * OEVProtocolList Component
 *
 * A component for selecting and comparing multiple dApps (decentralized applications) in the context of OEV (Oracle Extractable Value).
 *
 * @component
 *
 * @example
 * <OEVProtocolList />
 *
 * @features
 * - Allows selection of up to 4 dApps for comparison
 * - Utilizes OEVProtocolDropdown components for each dApp selection
 * - Dynamically adjusts the number of selectable dApps based on user's dApp visibility
 * - Disables selection for user-added dApps
 * - Responsive design for different screen sizes
 *
 * @notes
 * - The component title suggests a comparison feature: "How your dApp Compares"
 * - Adjusts the number of selectable dApps based on `oev.isUserVisible`
 * - Special handling for 'userAdded' protocol, making its dropdown non-removable
 */

const oev = useOEVStore();
</script>

<template>
  <div class="protocol-list-wrapper">
    <h2 class="attention-voice">How your dApp Compares</h2>

    <h3 class="notice-voice">
      Select {{ oev.isUserVisible ? "3" : "4" }} dApps to Compare
    </h3>
    <div class="dropdown-group">
      <FormKit type="group" v-model="oev.userSelectedProtocols">
        <OEVProtocolDropdown
          v-for="i in 4"
          :key="`dApp-${i}`"
          :label="`dApp ${i}`"
          :name="`dApp-${i}`"
          options-appearance="checkbox"
          selection-removable
          :disabled="oev.userSelectedProtocols[`dApp-${i}`] === 'userAdded'"
        />
      </FormKit>
    </div>
  </div>
</template>

<style scoped>
/* Apply styles only to this component */

.protocol-list-wrapper {
  margin-top: var(--space-3xl);
  display: grid;
  gap: var(--space-l);
  align-content: start;
}

.dropdown-group {
  display: grid;
  gap: var(--space-l);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;
  }
}

:deep(.formkit-outer) {
  /* max-height: 300px; */
  /* overflow-y: scroll; */
  /* overscroll-behavior: contain; */
  /* max-width: 250px; */

  @media (min-width: 768px) {
    /* max-width: 270px; */
  }
}

li {
  display: grid;
  padding: 0 var(--space-s);
}

:deep(ul.enabled) {
  li:not(:has(input:checked)) {
    filter: grayscale(0.8) opacity(0.6);
  }
}

h2,
h3 {
  text-align: center;
}

/* :deep(.formkit-fieldset, .formkit-wrapper) {
  max-width: 350px;
} */
</style>
