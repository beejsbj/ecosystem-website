<script setup>
/**
 * Feed dApp Card Component
 *
 * Displays a card with information about a single dApp, including its logo,
 * name, categories, tagline, and proxy addresses. Shows an OEV (Off-chain
 * Event Validation) tag when applicable.
 *
 * @vue-component
 *
 * @prop {Object} dapp - The dApp object containing general information
 * @prop {Object} proxy - The proxy object
 * @prop {Object} dappProxy - Contains proxy information including OEV status and addresses
 *
 * @example
 * <FeedDappCard :dapp="dappObject" :proxy="proxyObject" :dappProxy="dappProxyObject" />
 *
 * @features
 * - Displays dApp logo, name, categories, and tagline
 * - Lists proxy addresses associated with the dApp
 * - Indicates OEV status with a special tag
 * - Provides a link to more details about the dApp
 *
 */

const props = defineProps(["dapp", "proxy", "dappProxy"]);
const ecosystem = useEcosystemStore();

//   check if dapp is proxy enabled
const isOevEnabled = computed(() => {
  return props.dappProxy.oev.enabled;
});
</script>

<template>
  <NuxtLink
    :to="`/ecosystem/${dapp?.slug}`"
    :target="dapp.slug"
    class="link-wrap"
  >
    <div class="feed-dapp-card">
      <div class="oev-tag absolute solid-voice" v-if="isOevEnabled">
        <DynamicIcon icon="oev" width="75px" />
      </div>
      <div class="dapp-header">
        <picture class="logo">
          <NuxtImg
            loading="lazy"
            :src="dapp?.images?.logo"
            src="/images/square.jpg"
            :alt="`Logo of ${dapp?.name}`"
          />
        </picture>
        <div class="text-content">
          <h2 class="firm-voice-smaller">
            {{ dapp?.name ?? "dApp Name" }}
          </h2>

          <ul class="categories-list">
            <li
              class="micro-voice category"
              v-for="category in dapp?.categories ?? [1, 2]"
              :data-category="category"
            >
              {{ ecosystem?.categoryToLabel?.[category] ?? "Category" }}
            </li>
          </ul>
        </div>
      </div>

      <p class="span-all whisper-voice">
        {{ dapp?.tagline }}
      </p>

      <!-- proxy list -->
      <div class="address">
        <div class="proxy-address" v-auto-animate>
          <h3 class="whisper-voice">Proxy Address</h3>
          <p>
            <WalletAddress
              :walletAddress="dappProxy.proxyAddress"
              class="whisper-voice"
            />
          </p>
        </div>
        <div v-if="isOevEnabled" class="beneficiary-address" v-auto-animate>
          <h3 class="whisper-voice">Beneficiary Address</h3>
          <p>
            <WalletAddress
              :walletAddress="dappProxy.oev.beneficiary"
              class="whisper-voice"
            />
          </p>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="scss">
.feed-dapp-card {
  display: grid;
  gap: var(--space-l);
  grid-template-columns: 1fr 1fr 1fr;

  padding: var(--space-m);
  border-radius: var(--corners);
  background: var(--paper);
  border: var(--line-width) solid var(--green-darker);

  position: relative;
  overflow: hidden;

  &:hover {
    background: var(--gradient-radial-green-hover);
  }

  &:has(.oev) {
    border: var(--line-width) solid var(--indigo-darkest);
  }

  .dapp-header {
    display: flex;
    align-items: center;
    grid-column: 1/-1;
    gap: var(--space-2xs);

    picture.logo {
      width: 50px;
      border-radius: 50%;
      aspect-ratio: 1/1;
      margin-right: var(--space-2xs);

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
  }

  h2,
  h3 {
    //  white-space: nowrap;
  }

  .categories-list {
    display: flex;
    gap: var(--space-2xs);
    justify-content: start;

    li {
      z-index: 2;

      display: flex;
      align-items: center;
      gap: var(--space-3xs);
      white-space: nowrap;
      padding: calc(var(--space-2xs) / 5) var(--space-2xs);

      border: var(--border-dark);
      border-radius: var(--corners);
      background: var(--gradient-dark);

      :deep(picture) {
        max-width: var(--step-0);
      }
    }
  }

  .address {
    grid-column: 1/-1;
    display: flex;
    align-items: end;
    justify-content: space-between;
    gap: var(--space-3xs);

    & > * {
      flex: 1;
    }

    p {
      margin-top: unset;
    }
  }

  .oev-tag {
    //  padding: 0.25em 0.75em;
    border-radius: var(--corners);
    font-weight: 800;
    font-size: var(--step--1);
    color: var(--paper);
    text-align: center;

    border: 1px solid hsla(238, 73%, 22%, 1);

    background-color: hsla(235, 68%, 7%, 1);

    &:is(p) {
      background: unset;
      color: var(--green-lighter);
    }

    &.absolute {
      border-radius: unset;
      border-bottom-left-radius: var(--corners);

      position: absolute;
      top: 0;
      right: 0;
    }
  }
}

.text-content {
  display: grid;
  gap: var(--space-2xs);

  p {
    margin-top: var(--space-2xs);
  }
}

a {
}
</style>
