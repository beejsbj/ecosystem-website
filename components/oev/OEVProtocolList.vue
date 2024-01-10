<script setup>
// Import the useOEVStore function from the OEV store module
const oev = useOEVStore();

function buttonHandle(protocol) {
  // Call the toggleHide method
  oev.toggleHide(protocol);
}
</script>

<template>
  <!-- Render an unordered list with the class "protocol-list" -->
  <ul class="protocol-list">
    <!-- Render a heading with the class "solid-voice" -->
    <h3 class="solid-voice">Select Protocols to Compare</h3>
    <!-- Loop through each protocol in the oev.protocols array -->
    <template v-for="(protocol, i) in oev.protocols">
      <!-- Render a list item if the protocol's "trueHide" property is false -->
      <li v-if="!protocol.trueHide" :key="protocol.id">
        <!-- Render a button with an event listener that calls the buttonHandle function and passes the protocol as an argument -->
        <button @click="buttonHandle(protocol)">
          <!-- Render a BoxCard component with the following props -->
          <BoxCard
            :teaser="protocol.name"
            hideImage="true"
            :class="{
              'border-gradient-green': !protocol.hide,
              'border-gradient-blue': protocol.hide,
            }"
          />
        </button>
      </li>
    </template>
  </ul>
</template>

<style scoped>
/* Apply styles only to this component */
.protocol-list {
  display: grid;
  gap: var(--space-s);
  max-height: 600px;
  overflow-y: scroll;
  position: relative;
}

h3 {
  text-align: center;
  position: sticky;
  top: 0;
  z-index: 1;
  background: var(--paper);
}

li {
  display: grid;
}
</style>
