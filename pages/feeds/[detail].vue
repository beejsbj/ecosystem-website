<script setup>
const route = useRoute();

const feedSlug = route.params.detail;
const feedName = feedSlug.replace("-", "/");
const proxy = computed(() => {
  return route.query;
});

const fetchString = computed(() => {
  let fetchString = `/api/projects?&ticker=${feedName}`;
  if (proxy.value.chainId) {
    fetchString += `&chains=${proxy.value.chainId}`;
  }
  return fetchString;
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
