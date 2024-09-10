<script setup>
/**
 * FormSubmit Component
 *
 * A component that renders either a submit button or a connect wallet button
 * based on the wallet connection state and form step.
 *
 * @component
 *
 * @example
 * <FormSubmit  />
 * <FormSubmit :isLastStep="true" />
 *
 * @props
 * @prop {Boolean} isLastStep - Indicates if this is the last step of a multi-step form
 *
 * @features
 * - Conditionally renders a submit button or connect wallet button
 * - Uses FormKit for the submit button
 * - Integrates with web3 wallet connection state
 *
 */

const props = defineProps(["isLastStep"]);
const web3Store = useWeb3Store();
</script>

<template>
  <div class="actions">
    <FormKit
      type="submit"
      label="Add Project"
      input-class="$reset button"
      v-if="web3Store.state.isConnected && isLastStep"
    />
    <ConnectButton v-if="!web3Store.state.isConnected && isLastStep" />
  </div>
</template>

<style scoped lang="scss">
:deep(button) {
  padding-left: var(--space-xl);
  padding-right: var(--space-xl);
  @media (min-width: 768px) {
    padding-left: var(--space-3xl);
    padding-right: var(--space-3xl);
  }
}
</style>
