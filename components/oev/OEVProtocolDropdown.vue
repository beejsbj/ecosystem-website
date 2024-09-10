<script setup>
/**
 * OEVProtocolDropdown Component
 *
 * A custom dropdown component for selecting protocols, grouped by blockchain networks.
 *
 * @component
 *
 * @example
 * <OEVProtocolDropdown v-model="selectedProtocol" />
 *
 * @features
 * - Displays protocols grouped by their respective blockchain networks
 * - Shows protocol icons and chain icons for easy identification
 * - Customizes the appearance of group labels, options, and selected items
 * - Filters out protocols marked for hiding
 * - Handles special case for user-added protocols
 *
 * @notes
 * - Relies on the OEV store for protocol data
 * - Assumes the existence of a `getChainName` function for converting chain IDs to readable names
 * - Special handling for 'userAdded' protocol, displaying it as "Your dApp"
 */

// Import the useOEVStore function from the OEV store module
const oev = useOEVStore();

const protocolOptions = computed(() => {
  const protocols = oev.protocols.filter((protocol) => !protocol.trueHide);

  const selected = oev.userSelectedProtocols;

  const groupedByChain = protocols.reduce((acc, protocol) => {
    const chainId = protocol.chainId;
    if (!acc[chainId]) {
      acc[chainId] = {};
      acc[chainId].group = chainId;
      acc[chainId].options = [];
    }

    if (protocol.slug === "userAdded") console.log(protocol);

    acc[chainId].options.push({
      label: protocol.name,
      value: protocol.slug,
      icon: protocol.icon,
      chainId: protocol.chainId,
      attrs: {
        key: protocol.slug,
      },
    });
    return acc;
  }, {});

  const options = Object.values(groupedByChain);

  return options;
});
</script>

<template>
  <FormKit type="dropdown" :options="protocolOptions">
    <!-- Group label -->
    <template #groupLabel="{ option }">
      <div class="icon-option">
        <ChainIcon :id="option.group" />

        <span class="label group"> {{ getChainName(option.group) }} </span>
      </div>
    </template>

    <!-- Option -->
    <template #option="{ option }">
      <div class="icon-option">
        <IconWithChain
          v-if="option.icon"
          :image="option.icon"
          :id="option.chainId"
        />
        <span class="label option">
          {{ option.label }}
        </span>
      </div>
    </template>

    <!-- Selection -->

    <template #selection="{ option }">
      <div class="icon-option">
        <DoubleIcon
          v-if="option.icon"
          :icon1="{
            chainId: option.chainId,
          }"
          :icon2="{
            src: option.icon,
          }"
        />
        <span class="label selection">
          {{ option.value == "userAdded" ? "Your dApp" : option.label }}
        </span>
      </div>
    </template>
  </FormKit>
</template>

<style scoped>
.icon-option :deep(span.label) {
  font-weight: var(--weight-light) !important;

  font-size: calc((var(--step--1) + var(--step-0)) / 2);
}
</style>
