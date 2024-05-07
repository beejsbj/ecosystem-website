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

      attrs: {
        onchange: () => {
          buttonHandle(protocol);
        },
      },
    };
  });
});

// const protocolOptions = computed(() => {
//   const protocols = oev.protocols.filter((protocol) => !protocol.trueHide);

//   protocols.map((protocol) => {
//     protocol.value = protocol.id;
//     protocol.label = protocol.name;

//     return protocol;
//   });

//   protocols.push({
//     value: "all",
//     label: "Total",
//   });
//   return protocols;
// });

const modeledCheckboxes = computed(() => {
  const filtered = protocolOptions.value.filter((checkbox) => checkbox.checked);

  return filtered.map((checkbox) => checkbox.value);
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
    <FormKit
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
    </FormKit>

    <!-- Loop through each protocol in the oev.protocols array -->
    <!-- <ul class="protocol-list" :class="{ enabled: areChecked }">

      <template v-for="(protocol, i) in oev.protocols">
       
        <li v-if="!protocol.trueHide" :key="protocol.id">


          <FormKit
            type="checkbox"
            :label="protocol.name"
            v-model="checkboxes[i].value"
            @change="buttonHandle(protocol)"
          >
            <template #label="context">
              <div class="icon-option">
                <IconWithChain :image="protocol.icon" :id="protocol.chainId" />
                <span class="whisper-voice">
                  {{ context.label }}
                </span>
              </div>
            </template>
          </FormKit>
        </li>
      </template>
    </ul> -->
  </div>
</template>

<style scoped>
/* Apply styles only to this component */

.protocol-list-wrapper {
  display: grid;
  gap: var(--space-s);
  align-content: start;
}

:deep(.formkit-fieldset) {
  max-height: 300px;
  overflow-y: scroll;
  overscroll-behavior: contain;
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
</style>
