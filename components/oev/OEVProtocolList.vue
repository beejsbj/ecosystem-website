<script setup>
const oev = useOEVStore();

function buttonHandle(protocol) {
  oev.toggleHide(protocol);
}
</script>

<template>
  <ul class="protocol-list">
    <template v-for="(protocol, i) in oev.protocols">
      <li v-if="!protocol.trueHide" :key="protocol.id">
        <button @click="buttonHandle(protocol)">
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
.protocol-list {
  display: grid;

  gap: var(--space-s);
}

li {
  display: grid;
}
</style>
