<script setup>
/**
 * OEVProtocolDropdown Component
 *
 * A standard FormKit select for choosing protocols in showcase mode.
 *
 * @component
 *
 * @example
 * <OEVProtocolDropdown v-model="selectedProtocol" />
 *
 * @features
 * - Displays protocols with their respective blockchain network labels
 * - Filters out protocols marked for hiding
 *
 * @notes
 * - Relies on the OEV store for protocol data
 * - Assumes the existence of a `getChainName` function for converting chain IDs to readable names
 */

const oev = useOEVStore();

const protocolOptions = computed(() => {
  const protocols = oev.protocols.filter((protocol) => !protocol.trueHide);

  return protocols.map((protocol) => {
    return {
      label: `${protocol.name} (${getChainName(protocol.chainId)})`,
      value: protocol.slug,
    };
  });
});
</script>

<template>
  <FormKit type="select" :options="protocolOptions" />
</template>

<style scoped>
.icon-option :deep(span.label) {
  font-weight: var(--weight-light) !important;

  font-size: calc((var(--step--1) + var(--step-0)) / 2);
}
</style>
