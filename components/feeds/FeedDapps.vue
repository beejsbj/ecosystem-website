<script setup>
const props = defineProps(["feedProjects", "pending", "proxy", "feedName"]);
const router = useRouter();
const ui = useInterfaceStore();

const dapps = computed(() => {
  if (!props.proxy.chainId) {
    return props.feedProjects.projects;
  }

  return props.feedProjects.projects.filter((dapp) => {
    return dapp.proxies[props.proxy.chainId];
  });
});

const displayDapp = computed(() => {
  if (!dapps.value || !props.proxy.dappSlug) {
    return null;
  }

  return dapps.value.find((dapp) => dapp.slug == props.proxy.dappSlug);
});

function handleCardClick(dapp) {
  //   move  card to top of the list

  //change query params
  router.push({
    query: {
      dappSlug: dapp.slug,
      chainId: props.proxy.chainId,
    },
  });
}
</script>

<template>
  <SectionColumn class="main">
    <template v-if="displayDapp">
      <div class="display-card-section" v-if="!ui.loadingDone">
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div class="display-card-section" v-else>
        <FeedDappCard
          :dapp="displayDapp"
          :proxy="proxy"
          :key="displayDapp.slug"
          :feedname="feedName"
          class="display-card"
        />

        <FeedChainValueCard
          :dapp="displayDapp"
          :proxy="proxy"
          :feedname="feedName"
        />
      </div>
    </template>

    <template v-if="dapps">
      <ul
        class="feed-dapp-cards"
        :class="{ 'is-display': !displayDapp }"
        v-if="!ui.loadingDone"
      >
        <SkeletonListItem v-for="i in 6" />
      </ul>

      <ul
        class="feed-dapp-cards"
        :class="{ 'is-display': !displayDapp }"
        v-auto-animate
        v-else-if="dapps.length > 1"
      >
        <h3 class="teaser-voice">dApps that are on this Feed</h3>
        <li v-for="dapp in dapps">
          <SkeletonCard v-if="pending" />
          <FeedDappCard
            :dapp="dapp"
            :proxy="proxy"
            :key="dapp.slug"
            :feedname="feedName"
            @click="handleCardClick(dapp)"
          />
        </li>
      </ul>
    </template>

    <p class="notice-voice" v-if="!dapps">
      There are no dApps on this Feed and Chain.
    </p>
  </SectionColumn>
</template>

<style scoped lang="scss">
.main :deep(inner-column) {
  display: grid;
  gap: var(--space-l);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 0.5fr;

    &:has(.feed-dapp-cards.is-display) {
      grid-template-columns: unset;
    }
  }
}

.display-card-section {
  display: grid;
  gap: var(--space-s);

  @media (min-width: 768px) {
    align-items: start;
    align-content: start;
  }
}

.feed-dapp-cards {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-s);
  position: relative;

  transition: 0.5s;

  h3 {
    grid-column: 1/-1;
  }

  @media (min-width: 768px) {
    grid-column: 2;
  }
}

.feed-dapp-cards.is-display {
  grid-column: 1;
}
</style>
