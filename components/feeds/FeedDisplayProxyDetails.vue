<script setup>
const props = defineProps(["dapp", "proxy"]);
</script>

<template>
  <FeedChainValueCard :dapp="dapp" :proxy="proxy" key="chain-value-card" />

  <FeedOevChart :dapp="dapp" :proxy="proxy" key="oev-chart" />

  <FeedOevTransactions :dapp="dapp" :proxy="proxy" key="oev-transactions" />
</template>

<style scoped lang="scss"></style>
