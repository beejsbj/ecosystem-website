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
    <div class="oev-tag absolute solid-voice" v-if="isOevEnabled">OEV</div>
    <text-content>
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
    </text-content>

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

  text-content {
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
        object-fit: cover;
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
    margin-top: var(--space-2xs);

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
    padding: 0.25em 0.75em;
    border-radius: var(--corners);
    font-weight: 800;
    font-size: var(--step--1);
    background: linear-gradient(
        90deg,
        #1a4fde 0.02%,
        #5effd7 51.06%,
        #f3f3f3 67.57%,
        rgba(26, 79, 222, 0.5) 100.09%
      ),
      linear-gradient(
        90deg,
        #fff 7.12%,
        #000 21.04%,
        #fff 34.05%,
        #000 48.56%,
        #fff 63.56%,
        #000 82.58%,
        #fff 98.09%
      ),
      linear-gradient(
        90deg,
        #fff 7.12%,
        #000 21.04%,
        #fff 34.05%,
        #000 48.56%,
        #fff 63.56%,
        #000 82.58%,
        #fff 98.09%
      ),
      linear-gradient(
        180deg,
        #1af8e8 -105.65%,
        #9bffe6 -30.6%,
        #2e69ff 22.19%,
        #fff 64.44%,
        rgba(245, 245, 245, 0.6) 105.65%
      );

    background-blend-mode: plus-darker, screen, difference, normal;

    backdrop-filter: blur(0.75px);
    color: var(--paper);
    text-align: center;

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
</style>
