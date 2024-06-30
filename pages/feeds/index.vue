<script setup>
const { data, pending } = await useFetch("/api/projects/stats/", {
  pick: ["feeds"],
});

console.log(data.value);

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
        <li v-for="feed in data.feeds" class="border-gradient-green">
          <NuxtLink :to="`${getSlug(feed.feedName)}`">
            <FeedIcon :feed="feed.feedName" />
            <h2 class="whisper-voice">
              {{ feed.feedName }}
            </h2>
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
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
}

li > a {
  display: block;
  background: var(--gradient-radial-green);
  border-radius: var(--corners);
  padding: 2rem 1rem;
  padding-top: 1.25rem;
  text-align: center;
  transition: 0.2s ease;

  h2 {
    margin-top: var(--space-xs);
  }

  &:hover {
  }
}

:deep(picture) {
  --width: 70px;
}
</style>
