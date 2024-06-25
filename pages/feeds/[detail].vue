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

const showMarket = computed(() => {
  return route.query.chainId;
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
          :to="`https://market.api3.org/dapis/${chainSlug}/${feedSlug}`"
          class="button market-button"
          :target="`${chainSlug}-${feedSlug}`"
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

<style>
html {
  /* --paper: var(--gradient-radial-green); */
}
</style>

<style scoped lang="scss">
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
