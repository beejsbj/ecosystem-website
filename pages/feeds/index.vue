<script setup>
const { data, pending } = await useFetch("/api/projects/stats/", {
  pick: ["feeds"],
});

const getSlug = (feedName) => feedName.replace("/", "-");

//
definePageMeta({
  layout: "feed-layout",
  //   title: feedSlug,
  //   description: "dApps using the " + feedSlug,
});
</script>

<template>
  <article>
    <PageTitle heading="Feeds">
      <p>
        Discover the feeds that power the dApps in our ecosystem and provide
        them with reliable data.
      </p>

      <ul class="feed-list">
        <li v-for="feed in data.feeds">
          <NuxtLink :to="`${getSlug(feed.feedName)}`">
            <BoxCard :teaser="feed.feedName" class="border-gradient-blue">
              <FeedIcon :feed="feed.feedName" />
            </BoxCard>
          </NuxtLink>
        </li>
      </ul>
    </PageTitle>
  </article>
</template>

<style scoped lang="scss">
ul {
  margin-top: var(--space-l);
  display: grid;
  gap: var(--space-l);
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
}

:deep(picture) {
  --width: 50px;
}
</style>
