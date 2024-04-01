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

const params = {
  ticker: feedName,
  chainId: proxy.value.chainId,
};

const { data: feedProjects, pending } = await useLazyFetch("/api/projects", {
  params,
});

// const { data: feedProjects, pending } = await useAsyncData(
//   "test",
//   () =>
//     $fetch(`/api/projects`, {
//       params: {
//         ticker: feedName,
//         chainId: proxy.value.chainId,
//       },
//     }),
//   {
//     watch: [proxy],
//   }
// );

// watch(proxy, (oldQuery, newQuery) => {
//   console.log("before", feedProjects.value.projects.length);
//   console.log("route.query changed", newQuery);
//   //   refresh();
//   console.log("after", feedProjects.value.projects.length);
// });
</script>

<template>
  <article>
    <!-- <p>project count {{ feedProjects.projects.length }}</p> -->

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

<style scoped lang="scss"></style>
