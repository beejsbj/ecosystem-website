<script setup>
// Import the useOEVStore function from the OEV store module
const oev = useOEVStore();

function buttonHandle(protocol) {
  // Call the toggleHide method
  oev.toggleHide(protocol);
}
</script>

<template>
  <div class="protocol-list-wrapper">
    <h3
      class="whisper-voice"
      :class="{ hideOpacity: oev.isAllHidden && false }"
    >
      Select upto 3 Protocols to Compare
    </h3>

    <ul class="protocol-list">
      <!-- Loop through each protocol in the oev.protocols array -->
      <template v-for="(protocol, i) in oev.protocols">
        <!-- Render a list item if the protocol's "trueHide" property is false -->
        <li v-if="!protocol.trueHide" :key="protocol.id">
          <!-- Render a button with an event listener that calls the buttonHandle function and passes the protocol as an argument -->
          <button @click="buttonHandle(protocol)">
            <!-- Render a BoxCard component with the following props -->

            <BoxCard
              :teaser="protocol.name"
              layout="flex"
              :class="{
                'border-gradient-green': !protocol.hide,
                'border-gradient-blue': protocol.hide,
              }"
            >
              <ChainIcon :id="protocol.chainId" />
            </BoxCard>
          </button>
        </li>
      </template>
    </ul>
  </div>
</template>

<style scoped>
/* Apply styles only to this component */

.protocol-list-wrapper {
  display: grid;
  gap: var(--space-xs);
}
.protocol-list {
  display: grid;
  gap: var(--space-2xs);
  overflow-y: scroll;
  position: relative;
  max-height: 300px;

  @media (min-width: 768px) {
    max-height: 600px;
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
}
</style>
