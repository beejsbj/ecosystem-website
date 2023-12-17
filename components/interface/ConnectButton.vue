<script setup>
const web3Store = useWeb3Store();

async function buttonHandle() {
  await web3Store.func.openModal();
}
</script>

<template>
  <button class="button" @click.prevent="buttonHandle">
    <Transition name="fade" mode="out-in">
      <span class="" v-if="!web3Store?.state?.isConnected"> Connect </span>
      <span v-else class=""> Connected </span>
    </Transition>
  </button>
</template>

<style scoped></style>
