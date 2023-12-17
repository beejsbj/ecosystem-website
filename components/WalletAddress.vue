<script>
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
      const lastPart = address.substring(address.length - 2);
      return `${firstPart}...${lastPart}`;
    },
  },
};
</script>

<template>
  <button
    class="short-wallet"
    v-tooltip="showCopyTooltip ? 'Copied!' : 'Copy'"
    @click="copyToClipboard"
  >
    <p class="whisper-voice">
      {{ shortWallet }}
    </p>
    <div class="icon copy">
      <picture>
        <img
          loading="lazy"
          src="@/assets/images/interface/copy.svg"
          alt="Copy icon"
        />
      </picture>
    </div>
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
}

.whisper-voice {
  padding: 0;
  color: var(--green);
}

.copy picture {
  max-width: var(--space-s);
}
</style>
