<script setup>
import { FormKitIcon } from "@formkit/vue";
const props = defineProps(["feedProjects", "pending", "proxy"]);
const router = useRouter();
const ui = useInterfaceStore();

// #todo get more dapps on scroll
const dapps = computed(() => {
  if (!props.proxy.chainId) {
    return props.feedProjects.projects;
  }

  return props.feedProjects.projects.filter((dapp) => {
    if (dapp.proxies[props.proxy.chainId]) {
      return true;
    }
  });
});

console.log(dapps.value);

const displayDapp = computed(() => {
  if (!dapps.value || !props.proxy.dappSlug) {
    return null;
  }

  return dapps.value.find((dapp) => dapp.slug == props.proxy.dappSlug);
});

const filteredDapps = computed(() => {
  if (!dapps.value) {
    return [];
  }

  if (!displayDapp.value) {
    return dapps.value;
  }

  return dapps.value.filter((dapp) => dapp.slug !== displayDapp.value.slug);
});
</script>

<template>
  <SectionColumn class="main">
    <template v-if="displayDapp">
      <div class="display-card-section" v-if="!ui.loadingDone">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
      <div class="display-card-section" v-else v-auto-animate>
        <FeedDappCard
          :dapp="displayDapp"
          :proxy="proxy"
          :key="displayDapp.slug"
          class="display-card"
        />

        <FeedDisplayProxyDetails :dapp="displayDapp" :proxy="proxy" />
      </div>
    </template>

    <template v-if="filteredDapps">
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
        v-else-if="filteredDapps.length > 0"
      >
        <button class="calm-voice text green export-button">
          <picture>
            <FormKitIcon icon="download-csv-alt" />
          </picture>

          Export CSV
        </button>
        <template v-for="dapp in filteredDapps">
          <li v-if="displayDapp !== dapp" :key="dapp.slug">
            <SkeletonCard v-if="pending" />
            <FeedDappCard
              :dapp="dapp"
              :proxy="proxy"
              :key="dapp.slug"
              :class="{ 'display-card': !displayDapp }"
            />
          </li>
        </template>
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
  align-content: start;
  gap: var(--space-s);
  position: relative;

  transition: 0.5s;

  button.export-button {
    grid-column: 1/-1;
    justify-self: end;

    display: flex;
    align-items: center;
    gap: var(--space-3xs);
    picture {
      max-width: 32px;
    }
  }

  @media (min-width: 768px) {
    grid-column: 2;
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}

.feed-dapp-cards.is-display {
  grid-column: 1;
}
</style>
