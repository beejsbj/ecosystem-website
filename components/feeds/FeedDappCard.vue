<script setup>
const props = defineProps(["dapp", "proxy", "dappProxy"]);
const ecosystem = useEcosystemStore();

//   check if dapp is proxy enabled
const isOevEnabled = computed(() => {
  return props.dappProxy.oev.enabled;
});
</script>

<template>
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
        <p class="whisper-voice">
          {{ dapp?.tagline }}
        </p>
      </div>
    </div>

    <!-- proxy list -->
    <div class="proxy-address" v-auto-animate>
      <h3 class="solid-voice">Proxy Address</h3>
      <p>
        <WalletAddress
          :walletAddress="dappProxy.proxyAddress"
          class="calm-voice"
        />
      </p>
    </div>
    <div v-if="isOevEnabled" class="beneficiary-address" v-auto-animate>
      <h3 class="solid-voice">Beneficiary Address</h3>
      <p>
        <WalletAddress
          :walletAddress="dappProxy.oev.beneficiary"
          class="calm-voice"
        />
      </p>
    </div>

    <NuxtLink
      :to="`/ecosystem/${dapp?.slug}`"
      :target="dapp.slug"
      class="text whisper-voice external-link green"
    >
      Go to dApp
    </NuxtLink>
  </div>
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
    white-space: nowrap;
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

  .proxy-address,
  .beneficiary-address {
    //  grid-column: 1/3;
    display: grid;
    gap: var(--space-3xs);

    p {
      margin-top: unset;
    }
  }

  a {
    grid-column: 3;
    display: flex;
    align-items: center;

    justify-self: flex-end;
    align-self: end;
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

    :deep(.dynamic-icon.oev) {
      filter: invert(1);
    }

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
</style>
