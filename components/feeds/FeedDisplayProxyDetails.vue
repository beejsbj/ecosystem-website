<script setup>
const props = defineProps(["dapp", "proxy"]);
</script>

<template>
  <FeedChainValueCard :dapp="dapp" :proxy="proxy" key="chain-value-card" />

  <FeedOevChart
    :dapp="dapp"
    :proxy="proxy"
    key="oev-chart"
    v-if="proxy.proxyId && proxy.feedId"
  />

  <FeedOevTransactions
    :dapp="dapp"
    :proxy="proxy"
    key="oev-transactions"
    v-if="proxy.proxyId && proxy.feedId"
  />
</template>

<style scoped lang="scss"></style>
