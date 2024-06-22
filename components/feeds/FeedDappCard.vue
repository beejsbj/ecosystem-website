<script setup>
const props = defineProps(["dapp", "proxy"]);
const router = useRouter();

const formattedProxies = computed(() => {
  if (!props.dapp?.proxies) {
    return [];
  }

  const formattedProxyItems = [];
  Object.keys(props.dapp?.proxies).forEach((chain) => {
    let chainItems = props.dapp?.proxies?.[chain]?.map((el) => {
      return { ...el, chainId: chain };
    });
    formattedProxyItems.push(...chainItems);
  });

  return formattedProxyItems.filter((proxy) => {
    if (props.proxy.chainId == undefined) {
      return proxy.feedName == props.proxy.feedName;
    } else
      return (
        proxy.feedName == props.proxy.feedName &&
        proxy.chainId == props.proxy.chainId
      );
  });
});

const isOevEnabled = computed(() => {
  //   check if dapp is proxy enabled
  const isTrue = formattedProxies.value.some((proxy) => proxy.oev.enabled);
  return isTrue;
});

function handleProxyClick(currentProxy) {
  //change query params

  router.push({
    query: {
      dappSlug: props.dapp.slug,
      chainId: currentProxy.chainId,
      proxyId: currentProxy.proxyAddress,
      feedId: currentProxy.datafeedId ?? currentProxy.dapiNameHash,
      type: currentProxy.proxyType,
    },
  });

  scrollToDisplayCard();
}

function handleCardClick() {
  //   move  card to top of the list
  const isButton = event.target.closest("button");
  const card = event.target.closest(".feed-dapp-card");

  if (isButton || card.classList.contains("display-card")) {
    return;
  }

  if (formattedProxies.value.length === 1) {
    handleProxyClick(formattedProxies.value[0]);
    return;
  }

  //change query params
  router.push({
    query: {
      dappSlug: props.dapp.slug,
      chainId: props.proxy.chainId,
    },
  });

  scrollToDisplayCard();
}

function scrollToDisplayCard() {
  const displayCard = document.querySelector(".feed-icon-heading");
  displayCard.scrollIntoView({ behavior: "smooth", block: "start" });
}
</script>

<template>
  <div class="feed-dapp-card" @click="handleCardClick">
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
            <!-- <DynamicIcon :icon="category" /> -->
          </li>
        </ul>
      </div>
    </text-content>
    <ul class="proxy-list" v-auto-animate>
      <h3 class="solid-voice">Proxy Address</h3>
      <template v-for="proxy in formattedProxies">
        <li>
          <p>
            <WalletAddress :walletAddress="proxy.proxyAddress" />
          </p>
          <div>
            <p v-if="proxy.oev.enabled" class="oev-tag whisper-voice">
              OEV Enabled
            </p>
          </div>
          <button
            class="button outline whisper-voice"
            @click="handleProxyClick(proxy)"
            v-if="props.proxy.proxyId !== proxy.proxyAddress"
            :key="proxy.proxyAddress"
          >
            View Proxy
          </button>
        </li>
      </template>
    </ul>

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
  gap: var(--space-s);

  padding: var(--space-m);
  border-radius: var(--corners);
  background: var(--paper);
  border: var(--border-dark);
  min-height: 250px;

  position: relative;
  overflow: hidden;

  &.display-card {
    //  background: var(--gradient-radial-green);
    grid-template-columns: 0.2fr 0.8fr 1fr;
    grid-column: 1;
    grid-row: 1/-1;
    h2 {
      font-size: var(--step-1);
      grid-column: span 2;
    }

    picture.logo {
      max-width: 50px;
    }
  }

  &:hover {
    //  background: var(--gradient-radial-green-hover);
  }

  text-content {
    display: grid;
    grid-column: 1/-1;
    grid-template-columns: subgrid;
    gap: var(--space-2xs);
    align-items: center;

    picture.logo {
      width: 50px;
      border-radius: 50%;
      aspect-ratio: 1/1;
      // padding: 1%;
      margin-right: var(--space-2xs);

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    h2 {
      white-space: nowrap;
    }
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

  .proxy-list {
    grid-column: 1/-1;

    display: grid;
    gap: var(--space-3xs);

    li {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      align-items: center;
      gap: var(--space-xs);
      min-height: 26px;

      p {
        margin-top: unset;
      }

      .button {
        padding: 0.2em 0.75em;
      }
    }
  }

  a {
    grid-column: 1/-1;
    display: flex;
    align-items: center;

    justify-self: flex-end;
    align-self: end;
  }

  .oev-tag {
    padding: 0.25em 0.75em;
    border-radius: var(--corners);
    font-weight: 800;
    font-size: calc((var(--step--2) + var(--step--1)) / 2);
    background: var(--green-lighter);
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

.feed-dapp-card:not(.display-card) {
  min-height: unset;
  display: grid;
  grid-column: 2;
  gap: var(--space-3xs);
  align-items: center;
  padding: var(--space-s) var(--space-m);
  cursor: pointer;

  text-content {
    display: flex;
    align-items: center;

    p {
      display: none;
    }
  }

  ul,
  h3,
  a {
    display: none;
  }
}
</style>
