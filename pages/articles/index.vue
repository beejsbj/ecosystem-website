<script setup>
//random number between 0 and 5

useSeoMeta({
  ogUrl: "https://ecosystem.api3.org/articles",

  title: "Blog",
  ogTitle: "Blog",
  twitterTitle: "Blog",

  description:
    "Unlock the potential of blockchain oracles. Learn more about oracles, understand how to leverage real-world data feeds, and create smarter, more responsive dApps.",
  ogDescription:
    "Unlock the potential of blockchain oracles. Learn more about oracles, understand how to leverage real-world data feeds, and create smarter, more responsive dApps.",
  twitterDescription:
    "Unlock the potential of blockchain oracles. Learn more about oracles, understand how to leverage real-world data feeds, and create smarter, more responsive dApps.",
});
</script>

<template>
  <PageTitle heading="Articles" />
  <SectionColumn>
    <h2 class="attention-voice">Featured</h2>
    <LazyArticleGrid layout="0" cardCount="2" isFeaturedSort="true" />
  </SectionColumn>

  <SectionColumn>
    <h2 class="attention-voice">Popular</h2>
    <LazyArticleGrid layout="1" cardCount="3" isPopularSort="true" />
  </SectionColumn>

  <SectionColumn>
    <h2 class="attention-voice">Trending</h2>
    <LazyArticleGrid layout="2" cardCount="4" isTrendingSort="true" />
  </SectionColumn>

  <SectionColumn>
    <h2 class="attention-voice">All</h2>
    <LazyArticleGrid layout="3" isRecentSort="true" />
  </SectionColumn>
</template>

<style lang="scss" scoped>
h2 {
  margin-bottom: var(--space-l);
}
</style>
