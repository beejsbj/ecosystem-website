<script setup>
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

        <span> {{ getChainName(option.group) }} </span>
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
        <span class="">
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
        <span class="">
          {{ option.label }}
        </span>
      </div>
    </template>
  </FormKit>
</template>

