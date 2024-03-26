<script setup>
const props = defineProps(["dapp", "proxy"]);
</script>

<template>
  <li class="feed-dapp-card">
    <header>
      <!-- <ul class="chain-list">
        <li
          class="chain"
          v-for="chain in dapp?.chains"
          :data-chain="chain"
          @click="filterBy"
        >
          <ChainIcon :id="chain" fill="none" stroke="var(--green)" />
        </li>
      </ul> -->

      <!-- <div class="productType" :data-productType="dapp?.productType">
        <DynamicIcon :icon="dapp?.productType" @click="filterBy" />
      </div> #todo-->
    </header>

    <text-content>
      <picture class="logo">
        <NuxtImg
          loading="lazy"
          :src="dapp?.images?.logo"
          src="/images/square.jpg"
          :alt="`Logo of ${dapp?.name}`"
        />
      </picture>
      <h2
        :class="dapp?.name.length <= 16 ? 'firm-voice' : 'firm-voice-smaller'"
      >
        {{ dapp?.name ?? "Dapp Name" }}
      </h2>

      <p v-if="proxy.proxyId">
        <strong>Proxy Address:</strong>
        <WalletAddress :walletAddress="proxy.proxyId" />
      </p>
    </text-content>

    <footer>
      <NuxtLink
        :to="`/ecosystem/${dapp?.slug}`"
        :target="dapp.slug"
        class="text external-link"
      >
        Go to Dapp
      </NuxtLink>
    </footer>
  </li>
</template>

<style scoped lang="scss">
.feed-dapp-card {
  display: grid;
  grid-template-rows: 0.1fr 1fr 0.1fr;
  gap: var(--space-s);

  padding: var(--space-l);
  border-radius: var(--corners);
  background: var(--paper);
  border: var(--border-dark);
  min-height: 250px;

  position: relative;
  overflow: hidden;

  grid-column: 1/-1;
  grid-row: 1/2;

  &:hover {
    background: var(--gradient-radial-green-hover);
  }

  text-content {
    display: grid;
    column-gap: var(--space-2xs);

    grid-template-columns: 0.1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;

    picture.logo {
      max-width: 40px;
      border-radius: 50%;
      aspect-ratio: 1/1;
      padding: 1%;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    h2 {
      text-wrap: balance;
      // z-index: 2;
    }

    p {
      grid-column: 2/-1;
      display: flex;
      align-items: center;
    }
  }

  footer {
    display: flex;
    justify-content: flex-end;
  }
}

.category,
.productType,
.chain {
  cursor: pointer;
}
:is(.category, .productType, .chain):hover {
  filter: brightness(1.2);
}

li:not(.text-card) {
  h2 {
    font-size: var(--step-2);
  }

  picture.logo {
    max-width: 60px;
  }
}

.text-card {
  min-height: unset;
  display: block;
  padding: var(--space-s) var(--space-m);
  grid-column: unset;
  grid-row: unset;

  text-content {
    display: flex;

    p {
      display: none;
    }
  }

  footer {
    a {
      content: "";
      padding-left: 0;
      position: absolute;
      inset: 0;
      z-index: 1;
      cursor: pointer;
      color: transparent;
      font-size: 0;
      border: unset;
    }
  }
}
</style>
