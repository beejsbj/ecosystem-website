<script setup>
const props = defineProps(["dapp", "proxy", "feedname"]);
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
    if (props.proxy.chainId == undefined)
      return proxy.feedName == props.feedname;
    else
      return (
        proxy.feedName == props.feedname && proxy.chainId == props.proxy.chainId
      );
  });
});

function handleCardClick() {
  //   move  card to top of the list

  //change query params
  router.push({
    query: {
      dappSlug: props.dapp.slug,
      chainId: props.proxy.chainId,
    },
  });

  console.log(useRoute().query);
}

function handleProxyClick(proxy) {
  //change query params
  console.log("proxy", proxy);
  router.push({
    query: {
      dappSlug: props.dapp.slug,
      chainId: proxy.chainId,
      proxyId: proxy.proxyAddress,
      feedId: proxy.datafeedId ?? proxy.dapiNameHash,
      type: proxy.proxyType,
    },
  });
}

const isOevEnabled = computed(() => {
  //   check if dapp is proxy enabled
  const isTrue = formattedProxies.value.some((proxy) => proxy.oev.enabled);
  return isTrue;
});
</script>

<template>
  <div class="feed-dapp-card" @click="handleCardClick()" v-auto-animate>
    <div class="oev-tag whisper-voice" v-if="isOevEnabled">OEV Enabled</div>
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

      <ul class="proxy-list" v-auto-animate>
        <h3 class="solid-voice">Proxy Address</h3>
        <template v-for="proxy in formattedProxies">
          <li>
            <p>
              <WalletAddress :walletAddress="proxy.proxyAddress" />
            </p>
            <p class="whisper-voice">
              {{ proxy.oev.enabled ? "OEV Enabled" : "" }}
            </p>
            <button
              class="button outline whisper-voice"
              @click="handleProxyClick(proxy)"
            >
              View Proxy
            </button>
          </li>
        </template>
      </ul>
    </text-content>

    <NuxtLink
      :to="`/ecosystem/${dapp?.slug}`"
      :target="dapp.slug"
      class="text whisper-voice external-link green"
    >
      Go to Dapp
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
    background: var(--gradient-radial-green);
    grid-column: 1;
    grid-row: 1/-1;
    h2 {
      font-size: var(--step-2);
      grid-column: span 2;
    }

    picture.logo {
      max-width: 60px;
    }
  }

  &:hover {
    background: var(--gradient-radial-green-hover);
  }

  text-content {
    display: grid;
    grid-template-columns: 0.1fr 0.9fr 1fr;
    gap: var(--space-2xs);

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
      // white-space: nowrap;
    }

    ul {
      grid-column: 2/-1;

      display: grid;
      gap: var(--space-2xs);

      li {
        display: flex;
        align-items: center;
        gap: var(--space-xs);

        p {
          margin-top: unset;
        }
      }
    }
  }

  a {
    display: flex;
    align-items: center;
    //  white-space: nowrap;

    justify-self: flex-end;
  }

  .oev-tag {
    position: absolute;
    top: 0;
    right: 0;
    padding: var(--space-3xs) var(--space-2xs);
    border-bottom-left-radius: var(--corners);
    font-weight: var(--weight-heavy);
    background: var(--ink);
    color: var(--paper);
  }
}

.feed-dapp-card:not(.display-card) {
  min-height: unset;
  display: grid;
  grid-column: 2;
  gap: var(--space-3xs);
  align-items: center;
  padding: var(--space-s) var(--space-m);

  text-content {
    display: flex;

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
