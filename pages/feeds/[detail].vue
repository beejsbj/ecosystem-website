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
      <FeedDetailHeader />
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
