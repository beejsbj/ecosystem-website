<script setup>
import { CHAINS } from "@api3/chains";
import { useStorage } from "@vueuse/core";

const route = useRoute();
const ecosystem = useEcosystemStore();

const feedSlug = route.params.detail;
const feedName = feedSlug.replace("-", "/");
const proxy = route.query;
// fetch dapps related to the feed #todo

//
// console.clear();

// const chainId = proxy.chainId;

const selectedChain = ref(proxy.chainId);

const chain = computed(() => {
  return ecosystem.chainNames(selectedChain);
});

const chains = CHAINS.map((chain) => {
  return {
    label: chain.name,
    value: chain.id,
  };
});

function handleChainChange() {
  console.log(selectedChain);
}
</script>

<template>
  <article>
    <pre>
		{{ proxy }}
	</pre
    >
    <SectionColumn class="header">
      <div class="title-mast">
        <div class="feed-icon-heading">
          <FeedIcon feed="metis/bsc" />

          <h1 class="loud-voice">{{ feedName }}</h1>
        </div>

        <NuxtLink
          :to="`https://market.api3.org/dapis/${chain}/${feedSlug}`"
          class="button outline whisper-voice"
        >
          <span class="external-link"> View on Market </span>
        </NuxtLink>
      </div>

      <div class="feed-info">
        <FormKit
          type="dropdown"
          v-model="selectedChain"
          @change="handleChainChange"
          :options="chains"
          v-auto-animate
          select-icon="down"
          popover
        >
          <template #option="{ option }">
            <div class="chain-option">
              <ChainIcon :chain="option.label" />
              <span class="whisper-voice">
                {{ option.label }}
              </span>
            </div>
          </template>
        </FormKit>
        <div class="feed-id">
          <p class="whisper-voice">Data Feed ID:</p>
          <WalletAddress :walletAddress="proxy.datafeedId ?? proxy.dapiId" />
        </div>
      </div>
    </SectionColumn>

    <SectionColumn class="main">
      <ul class="feed-dapp-cards">
        <FeedDappCard
          v-for="dapp in ecosystem.list"
          :dapp="dapp"
          :proxy="proxy"
          :class="{ 'text-card': dapp.slug != proxy.dappSlug }"
        />
      </ul>

      <div class="chain-value-card">
        <text-content>
          <h2 class="teaser-voice">Chain Value</h2>
          <p class="value attention-voice">$176.2</p>
        </text-content>

        <div class="source-card">
          <h2 class="teaser-voice">Source</h2>
          <div>
            <picture>
              <NuxtImg loading="lazy" src="/images/chains/bsc.svg" alt="bsc" />
            </picture>
            <p class="solid-voice">Chainlink</p>
          </div>
        </div>
      </div>
    </SectionColumn>
  </article>
</template>

<style scoped lang="scss">
.header :deep(inner-column) {
  .title-mast {
    display: grid;

    .feed-icon-heading {
      display: grid;
      align-items: center;
      grid-template-columns: 100px 1fr;
    }

    .feed-icon picture {
      --width: 100px;
    }

    .button {
      display: grid;
      text-transform: uppercase;
      place-items: center;
      margin: var(--space-s) 0;
      justify-self: start;
      margin-left: var(--space-s);
    }

    @media (min-width: 768px) {
      grid-template-columns: 1fr 1fr;

      .button {
        justify-self: end;
      }
    }
  }

  .feed-info {
    display: grid;

    gap: var(--space-s);
    align-items: center;
    justify-content: start;

    padding-left: var(--space-s);
    grid-template-columns: 200px 200px;

    .formkit-outer {
      margin: 0 !important;
      grid-column: 1 / -1;

      @media (min-width: 500px) {
        grid-column: unset;
      }
    }
    .formkit-inner {
      box-shadow: unset !important;
    }

    @media (min-width: 500px) {
      grid-template-columns: 200px 1fr;
    }

    .feed-id {
      background-color: var(--paper);
      display: flex;
    }
  }
}

.main :deep(inner-column) {
  display: grid;
  gap: var(--space-l);

  ul {
    order: 2;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 0.4fr;

    ul {
      order: unset;
    }
  }
}

.chain-value-card {
  display: grid;
  gap: var(--space-m);
  padding: var(--space-l);
  align-self: start;

  background: var(--gradient-dark);

  border: var(--border-dark);
  border-radius: var(--corners);

  p.value {
    //  text-align: center;
    margin-top: var(--space-2xs);
  }
}

.source-card {
  div {
    margin-top: var(--space-2xs);
    display: flex;
    gap: var(--space-s);
    align-items: center;
  }

  picture {
    aspect-ratio: 1/1;
    border-radius: 50%;
    width: 100%;
    max-width: 42px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

.chain-option {
  padding-left: var(--space-s);
  display: grid;
  align-items: center;

  grid-template-columns: 24px 1fr;
  gap: var(--space-3xs);
  padding: var(--space-2xs) 0;
}

ul.feed-dapp-cards {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-l);
  position: relative;
}
</style>
