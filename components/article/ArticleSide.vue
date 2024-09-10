<script setup>
/**
 * ArticleSide Component
 *
 * A sidebar component displaying the table of contents (TOC) for an article.
 *
 * @component
 *
 * @example
 * <ArticleSide :toc="tableOfContents" :title="articleTitle" />
 *
 * @props
 * @prop {Object} toc - Table of contents object containing links
 * @prop {String} title - Title of the article
 *
 * @features
 * - Displays a list of links to article sections
 * - Includes the article title as the first link
 * - Sticky positioning on larger screens for easy navigation
 * - Responsive design adapting to different screen sizes
 */

const props = defineProps(["toc", "title"]);
</script>

<template>
  <aside>
    <h3 class="notice-voice">TOC</h3>

    <ul class="toc-list">
      <li>
        <a class="text solid-voice" :href="'#' + title">
          {{ title }}
        </a>
      </li>
      <li v-for="link in toc?.links" :key="link.id">
        <a class="text solid-voice" :href="`#${link.id}`">
          {{ link.text }}
        </a>
      </li>
    </ul>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  grid-row: 2 / 10;
  grid-column: 1 / -1;
  margin-bottom: var(--space-2xl);

  @media (min-width: 768px) {
    grid-column: 1 / 3;
    position: sticky;
    top: 5rem;
  }
}

h3 {
  margin-bottom: var(--space-m);
}

.toc-list {
  display: grid;
  gap: var(--space-s);
  justify-content: start;

  a {
    padding-left: 0;
    font-size: var(--step--1);
    display: block;
    // white-space: nowrap;
  }
}
</style>
