<script>
/**
 * WalletAddress Component
 *
 * A component that displays a shortened version of a wallet address
 * with copy-to-clipboard functionality.
 *
 * @component
 *
 * @example
 * <WalletAddress walletAddress="0x1234567890abcdef1234567890abcdef12345678" />
 *
 * @props
 * @prop {String} walletAddress - The full wallet address to display and copy
 *
 * @features
 * - Displays a shortened version of the wallet address (e.g., "0x1234...678")
 * - Allows copying the full address to clipboard on click
 * - Shows a tooltip indicating "Copy" on hover and "Copied!" after clicking
 * - Uses a copy icon from DynamicIcon component
 *
 * @methods
 * - copyToClipboard: Copies the full wallet address to clipboard
 * - getShortWallet: Shortens the wallet address for display
 */

export default {
  props: {
    walletAddress: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      shortWallet: this.getShortWallet(this.walletAddress),
      showCopyTooltip: false,
    };
  },
  methods: {
    async copyToClipboard() {
      try {
        await navigator.clipboard.writeText(this.walletAddress);
        this.showCopyTooltip = true;
        setTimeout(() => {
          this.showCopyTooltip = false;
        }, 1000); // Hide the tooltip after 1 second
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    },
    getShortWallet(address) {
      if (address.length <= 8) return address; // If the address is already short, return it as is
      const firstPart = address.substring(0, 6);
      const lastPart = address.substring(address.length - 3);
      return `${firstPart}...${lastPart}`;
    },
  },
};
</script>

<template>
  <button
    class="short-wallet"
    v-tooltip="showCopyTooltip ? 'Copied!' : 'Copy'"
    @click.prevent="copyToClipboard"
  >
    <span class="">
      {{ shortWallet }}
    </span>
    <DynamicIcon icon="copy" />
  </button>
</template>

<style scoped>
.short-wallet {
  /* Add your desired styles for the short wallet address here */
  position: relative; /* Make sure the container is relative for positioning the tooltip */
  cursor: pointer; /* Show pointer cursor when hovering */
  display: flex;
  align-items: center;
  gap: var(--space-3xs);
  padding: 0;
  color: var(--green);
}

.whisper-voice {
  padding: 0;
}

:deep(picture) {
  min-width: var(--space-s);
  width: 1em;
}
</style>
