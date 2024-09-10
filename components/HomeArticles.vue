<script setup>
/**
 * HomeArticles Component
 *
 * Displays a section of featured articles on the home page.
 *
 * @component
 *
 * @example
 * <HomeArticles />
 *
 * @features
 * - Shows a "Articles" heading
 * - Displays a grid of 4 featured articles using LazyArticleGrid
 * - Includes a "See More" link to the full articles page
 * - Responsive design with centered text elements
 */
</script>

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
    margin-bottom: var(--space-l);
  }
  a.text {
    text-align: center;
    margin-top: var(--space-m);
  }
}
</style>
