<script setup>
// Import the useOEVStore function from the OEV store module
const oev = useOEVStore();

const protocolOptions = computed(() => {
  const protocols = oev.protocols.filter((protocol) => !protocol.trueHide);

  return protocols.map((protocol) => {
    return {
      label: protocol.name,
      value: protocol.id,
      icon: protocol.icon,
      chainId: protocol.chainId,
      checked: !protocol.hide,
      toggle: () => {
        buttonHandle(protocol);
      },
    };
  });
});

const modeledCheckboxes = computed(() => {
  const protocols = oev.protocols.filter((protocol) => !protocol.trueHide);
  const filtered = protocols.filter((protocol) => !protocol.hide);

  return filtered.map((protocol) => protocol.id);
});

const areChecked = computed(() => {
  return (
    protocolOptions.value.filter((checkbox) => checkbox.checked).length > 3
  );
});

async function buttonHandle(protocol) {
  // Call the toggleHide method
  oev.toggleHide(protocol);
}
</script>

<template>
  <div class="protocol-list-wrapper">
    <!-- <FormKit
      type="checkbox"
      :label="`Select upto ${
        oev.isUserVisible ? '3' : '4'
      } Protocols to Compare`"
      :options="protocolOptions"
      v-model="modeledCheckboxes"
      options-class="protocol-list"
      :options-class="{ enabled: areChecked }"
    >
      <template #label="{ option }">
        <div class="icon-option">
          <IconWithChain :image="option?.icon" :id="option?.chainId" />
          <span class="formkit-label">
            {{ option.label }}
          </span>
        </div>
      </template>
    </FormKit> -->

    <FormKit
      type="dropdown"
      popover
      multiple
      :label="`Select upto ${
        oev.isUserVisible ? '3' : '4'
      } Protocols to Compare`"
      :options="protocolOptions"
      :key="protocolOptions"
      options-appearance="checkbox"
      v-model="modeledCheckboxes"
    >
      <template #option="{ option }">
        <div class="icon-option" @click="option.toggle">
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
    </FormKit>
  </div>
</template>

<style scoped>
/* Apply styles only to this component */

.protocol-list-wrapper {
  display: grid;
  gap: var(--space-s);
  align-content: start;
}

:deep(.formkit-outer) {
  /* max-height: 300px; */
  /* overflow-y: scroll; */
  /* overscroll-behavior: contain; */
  max-width: 250px;

  @media (min-width: 768px) {
    max-width: 270px;
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

/* :deep(.formkit-fieldset, .formkit-wrapper) {
  max-width: 350px;
} */
</style>
