<script setup>
const route = useRoute();
const router = useRouter();

const feedSlug = route.params.detail;
const feedName = feedSlug.replace("-", "/");

const proxy = computed(() => {
  let proxy = { ...route.query };
  proxy.feedName = feedName;
  return proxy;
});

const params = computed(() => {
  return {
    ticker: feedName,
    chains: proxy.value.chainId ? [proxy.value.chainId] : [],
  };
});

const showReset = computed(() => {
  const hasQuery = Object.keys(route.query).length > 0;
  return hasQuery;
});

const marketLinkSlug = computed(() => {
  if (!proxy.value.chainId) {
    return false;
  }

  const chainSlug = getChainName(proxy.value.chainId);

  return `${chainSlug}/${feedSlug}`.toLowerCase();
});

const showMarket = computed(() => {
  return marketLinkSlug.value;
});

//
const { data: feedProjects, status } = await useFetch("/api/projects", {
  params,
});

//

const pending = computed(() => {
  return status.value != "success";
});

function handleReset() {
  router.push({
    query: {},
  });
}
//
definePageMeta({
  layout: "feed-layout",
  //   title: feedSlug,
  //   description: "dApps using the " + feedSlug,
});
</script>

<template>
  <article>
    <!--  -->
    <SectionColumn class="header">
      <button
        @click="handleReset"
        class="button text whisper-voice reset-button"
        v-if="showReset"
        key="reset-button"
      >
        <DynamicIcon icon="arrow-left" /> Reset To dApp List
      </button>
      <div class="actions">
        <h1 class="loud-voice">dApps using</h1>
        <NuxtLink
          v-if="showMarket"
          :to="`https://market.api3.org/${marketLinkSlug}`"
          class="button market-button"
          :target="marketLinkSlug"
        >
          <span class="external-link"> View on Market </span>
        </NuxtLink>
      </div>
      <div class="feed-icon-heading">
        <FeedIcon :feed="feedName" />

        <h2 class="firm-voice">
          <strong>{{ feedName }}</strong>
        </h2>
      </div>
      <FeedHeaderInfo :proxy="proxy" />
    </SectionColumn>

    <!--  -->
    <FeedDapps
      :feedProjects="feedProjects"
      :pending="pending"
      :proxy="proxy"
      :feedName="feedName"
    />
  </article>
</template>

<style scoped lang="scss">
.header > :deep(inner-column) {
  padding-top: calc(var(--space-s) * 9);
  padding-bottom: 0;
}

h1.loud-voice {
  --font-size: calc(var(--step-0) + var(--step-3) / 2);
}

.feed-icon-heading {
  display: flex;
  align-items: center;
  margin-top: var(--space-s);

  :deep(.feed-icon) picture {
    --width: 40px;
  }
}

.reset-button {
  display: flex;
  align-items: center;
  gap: var(--space-3xs);
  padding-left: 0;
}

.actions {
  justify-content: space-between;
  align-items: center;
}
</style>
