<script setup>
const props = defineProps(["next", "previous", "isLastStep"]);
const web3Store = useWeb3Store();
</script>

<template>
  <div class="actions">
    <button class="text" @click.prevent="previous()">Previous</button>
    <button class="button outline" @click.prevent="next()" v-if="!isLastStep">
      Next
    </button>

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
