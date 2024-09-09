<script setup>
/**
 * ConnectButton Component
 *
 * This component renders a button for connecting and disconnecting a wallet.
 * It dynamically displays the connection status and handles the wallet
 * connection process.
 *
 * @vue-component
 *
 * @example
 * <ConnectButton />
 *
 * @features
 * - Displays "Connect Wallet" when not connected
 * - Shows "Connected" when a wallet is connected
 * - Handles wallet connection through the web3Store
 * - Uses a transition effect for smooth text changes
 *
 * @dependencies
 * - Relies on useWeb3Store for wallet connection state and functionality
 *
 */

const web3Store = useWeb3Store();

async function buttonHandle() {
  await web3Store.func.openModal();
}
</script>

<template>
  <button class="button" @click.prevent="buttonHandle">
    <Transition name="fade" mode="out-in">
      <span class="" v-if="!web3Store?.state?.isConnected">
        Connect Wallet
      </span>
      <span v-else class=""> Connected </span>
    </Transition>
  </button>
</template>

<style scoped></style>
