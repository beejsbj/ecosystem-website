<script setup>
const route = useRoute();

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
  };
});

const { data: feedProjects, pending } = await useFetch("/api/projects", {
  params,
});
</script>

<template>
  <article>
    <!--  -->

    <SectionColumn class="header">
      <div class="feed-icon-heading">
        <FeedIcon :feed="feedName" />

        <h1 class="loud-voice">
          <strong>{{ feedName }}</strong>
        </h1>
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
.feed-icon-heading {
  display: flex;
  align-items: center;

  :deep(.feed-icon) picture {
    --width: 60px;
  }
}
</style>
