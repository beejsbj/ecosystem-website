<script setup></script>

<template>
  <SectionColumn class="home-article-grid">
    <h2 class="loud-voice">Articles</h2>
    <LazyArticleGrid layout="0" cardCount="4" isFeaturedSort="true" />
    <NuxtLink class="text blue" to="/articles">See More</NuxtLink>
  </SectionColumn>
</template>

<style scoped lang="scss">
.home-article-grid {
  .loud-voice {
    text-align: center;
  }
  a.text {
    text-align: center;
    margin-top: var(--space-m);
  }
}
</style>
