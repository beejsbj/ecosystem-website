<script setup>
// Import the useOEVStore function from the OEV store module
const oev = useOEVStore();

const checkboxes = computed(() => {
  return oev.protocols.map((protocol) => {
    return {
      label: protocol.name,
      value: !protocol.hide,
    };
  });
});

const areChecked = computed(() => {
  return checkboxes.value.filter((checkbox) => checkbox.value).length > 3;
});

async function buttonHandle(protocol) {
  // Call the toggleHide method
  console.log(protocol.hide);
  oev.toggleHide(protocol);
  console.log(protocol.hide);
  await nextTick();
}
</script>

<template>
  <div class="protocol-list-wrapper">
    <h3
      class="whisper-voice"
      :class="{ hideOpacity: oev.isAllHidden && false }"
    >
      Select upto {{ oev.isUserVisible ? "3" : "4" }} Protocols to Compare
    </h3>

    <ul class="protocol-list" :class="{ enabled: areChecked }">
      <!-- Loop through each protocol in the oev.protocols array -->

      <template v-for="(protocol, i) in oev.protocols">
        <!-- Render a list item if the protocol's "trueHide" property is false -->
        <li v-if="!protocol.trueHide" :key="protocol.id">
          <!-- Render a button with an event listener that calls the buttonHandle function and passes the protocol as an argument -->

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
    </ul>
  </div>
</template>

<style scoped>
/* Apply styles only to this component */

.protocol-list-wrapper {
  display: grid;
  gap: var(--space-s);
  align-content: start;
}
.protocol-list {
  display: grid;
  gap: var(--space-2xs);
  overflow-y: scroll;
  position: relative;
  max-height: 300px;

  @media (min-width: 768px) {
    max-height: min(600px, 100%);
  }

  .box-card {
    :deep(picture) {
      width: 50px;
    }
  }
}
:deep(.box-card .teaser-voice) {
  @media (max-width: 768px) {
    font-size: var(--step-0);
  }
}

h3 {
  text-align: center;
  position: sticky;
  top: 0;
  padding-top: var(--space-m);
  z-index: 1;
  background: var(--paper);
  transition: all 0.3s ease-in-out, scale 0.2s 0.3s ease-in-out;
  font-weight: var(--weight-heavy);
  color: var(--ink);

  &.large {
    scale: 3;
    position: absolute;
    transform: translate(-12cqw, 10cqh);

    /* &::after {
      content: "       --->";
    } */
  }
}

li {
  display: grid;
  padding: 0 var(--space-s);
}

ul.enabled {
  li:not(:has(input:checked)) {
    filter: grayscale(0.8) opacity(0.6);
  }
}
</style>
