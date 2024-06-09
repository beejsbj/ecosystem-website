<script setup>
// Import the useOEVStore function from the OEV store module
const oev = useOEVStore();

const protocolOptions = computed(() => {
  const protocols = oev.protocols.filter((protocol) => !protocol.trueHide);

  const groupedByChain = protocols.reduce((acc, protocol) => {
    const chainId = protocol.chainId;
    if (!acc[chainId]) {
      acc[chainId] = {};
      acc[chainId].group = chainId;
      acc[chainId].options = [];
    }
    acc[chainId].options.push({
      label: protocol.name,
      value: protocol.slug,
      icon: protocol.icon,
      chainId: protocol.chainId,
      checked: !protocol.hide,
    });
    return acc;
  }, {});

  const options = Object.values(groupedByChain);

  return options;
});
</script>

<template>
  <div class="protocol-list-wrapper">
    <h2 class="attention-voice">How your dApp Compares</h2>

    <h3 class="notice-voice">
      Select {{ oev.isUserVisible ? "3" : "4" }} dApps to Compare
    </h3>
    <div class="dropdown-group">
      <FormKit type="group" v-model="oev.userSelectedProtocols">
        <FormKit
          v-for="i in oev.isUserVisible ? 3 : 4"
          type="dropdown"
          popover
          :label="`dApp ${i}`"
          :name="`dApp-${i}`"
          :options="protocolOptions"
          :key="protocolOptions"
          options-appearance="checkbox"
        >
          <template #groupLabel="{ option }">
            <div class="icon-option">
              <ChainIcon :id="option.group" />

              <span> {{ getChainName(option.group) }} </span>
            </div>
          </template>

          <template #option="{ option }">
            <div class="icon-option">
              <IconWithChain
                v-if="option.icon"
                :image="option.icon"
                :id="option.chainId"
              />
              <span class="">
                {{ option.label }}
                <!-- {{ getChainName(option.chainId) }} -->
              </span>
            </div>
          </template>
        </FormKit>
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
  border-bottom: var(--border-dark);

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
