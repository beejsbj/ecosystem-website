<script setup>
/**
 * ArticleGrid Component
 * 
 * A dynamic grid component for displaying a collection of articles with various layout options.
 *
 * @component
 *
 * @example
 * <ArticleGrid layout="0" cardCount="4" isRecentSort />
 *
 * @props
 * @prop {String|Number} layout - Index of the layout to use from predefined layouts
 * @prop {String|Number} cardCount - Maximum number of cards to display
 * @prop {Boolean} isRecentSort - Sort articles by most recent
 * @prop {Boolean} isPopularSort - Sort articles by popularity
 * @prop {Boolean} isTrendingSort - Sort articles by trending status
 * @prop {Boolean} isFeaturedSort - Sort articles by featured status
 *
 * @features
 * - Displays articles in a responsive grid layout
 * - Supports multiple predefined layout options
 * - Implements various sorting options for articles
 * - Lazy loading of additional articles
 * - Skeleton loading state for better UX
 * - Responsive design adapting to different screen sizes
 *
 * @computed
 * - sorted: Applies the selected sorting method to the article list
 *
 * @notes
 * - The component dynamically adjusts card types based on layout and device type
 * - Implements "Show More" functionality for pagination
 */

import { useBlogStore } from "~/stores/blog";
const props = defineProps([
  "layout",
  "cardCount",
  "isRecentSort",
  "isPopularSort",
  "isTrendingSort",
  "isFeaturedSort",
]);

const blog = useBlogStore();
const ui = useInterfaceStore();

const sorted = computed(() => {
  if (blog.list && props.isRecentSort) {
    return blog.list.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }
  if (blog.list && props.isPopularSort) {
    return blog.list.sort((a, b) => {
      return b.views ?? 0 - a?.views ?? 0;
    });
  }
  if (blog.list && props.isTrendingSort) {
    return blog.list.sort((a, b) => {
      return b.upvotes ?? 0 - a.upvotes ?? 0;
    });
  }
  if (blog.list && props.isFeaturedSort) {
    return blog.list.sort((a, b) => {
      return b.isFeatured ?? false - a.isFeatured ?? false;
    });
  }

  return blog.list.filter((article) => !article.hidden);
});

const layouts = [
  ["big-card"],
  ["card"],
  ["slide"],
  ["text"],
  ["card", "card", "card", "big-card", "slide", "text", "text", "text", "text"],
  ["big-card", "big-card", "card", "card", "card"],
  ["big-card", "slide", "big-card", "slide", "slide"],
  ["big-card", "slide", "text", "text", "text"],
  ["big-card", "big-card", "slide", "slide", "slide"],
  ["big-card", "card", "text", "text"],
];

const layoutIndex = ref(props.layout ?? 0);

function cardType(index, layout = layoutIndex.value, article) {
  if (!article.cover) return "text";
  const cardType = layout[index % layout.length];

  if (cardType === "slide" && ui.isMobile) return "big-card";
  return cardType;
}

function handleLoadMore() {
  if (blog.list.length < blog.totalArticles) {
    blog.filterQuery.page += 1;
  }
}
</script>

<template>
  <ul class="article-grid" v-auto-animate>
    <template
      v-if="ui.loadingDone && blog.list.length > 0"
      v-for="(article, index) in sorted"
    >
      <ArticleCard
        :article="article"
        :class="cardType(index, layouts[layoutIndex], article)"
        v-if="index < (props.cardCount ?? sorted.length)"
      />
    </template>

    <SkeletonCard
      class="article-skeleton"
      v-else
      v-for="index in props.cardCount ? props.cardCount + 1 : 10"
    />
    <button
      class="text show-more"
      @click="handleLoadMore"
      v-if="blog.hasMoreItems && !cardCount"
    >
      {{ blog.hasMoreItems }}
      Show More
    </button>
  </ul>
</template>

<style scoped lang="scss">
.article-grid {
  display: grid;

  gap: var(--space-l);
  align-items: start;
  position: relative;

  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 768px) {
    grid-template-columns: repeat(12, 1fr);
  }
}

.article-skeleton {
  grid-column: span 2;

  @media (min-width: 768px) {
    grid-column: span 6;
  }
}
</style>
