<script setup>
const route = useRoute();
const articleSlug = route.params.detail;

const { data: article } = await useFetch(
  `/api/articles/article/${articleSlug}`
);

useSeoMeta({
  //title
  title: () => article.value.title,
  ogTitle: () => article.value.title,
  twitterTitle: () => article.value.title,

  //website
  ogType: () => "article",
  ogUrl: () => `https://ecosystem.api3.org/articles/${articleSlug}`,

  //author
  author: () => article.value.author,
  articleAuthor: () => article.value.author,

  //description
  description: () => article.value.description,
  ogDescription: () => article.value.description,
  twitterDescription: () => article.value.description,

  //image
  image: () => article.value.cover,
  ogImage: () => article.value.cover,
  twitterImage: () => article.value.cover,

  articlePublishedTime: () => new Date(article.value.created_at).toISOString(),

  twitterCard: "summary_large_image",
});

// navigate article.body with up down keys, settings the hover state

onMounted(() => {
  const article = document.querySelector("article.body");

  const children = article.querySelectorAll("article.body > *");

  let index = 0;

  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      if (e.key === "ArrowDown") {
        index++;
      }
      if (e.key === "ArrowUp") {
        index--;
      }

      if (index < 0) {
        index = 0;
      }
      if (index > children.length - 1) {
        index = children.length - 1;
      }

      children.forEach((child, i) => {
        if (i === index) {
          child.style.setProperty("--height", "100%");
          child.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          child.style.removeProperty("--height");
        }
      });
    }
  });
});
</script>

<template>
    <SectionColumn innerClass="article">
      <div class="article-wrapper">
        <ArticleSide :toc="article?.content?.toc" :title="article?.title" />
        <ArticleHeader :article="article" />

        <picture class="cover" v-if="article?.cover">
          <NuxtImg
            loading="lazy"
            :src="article?.cover"
            :alt="`Cover of ${article?.title}`"
          />
        </picture>

        <ContentRendererMarkdown
          v-if="article?.content"
          :value="article?.content"
          tag="article"
          class="body"
        />
      </div>
    </SectionColumn>
</template>

<style lang="scss">
inner-column.article {
  display: grid;
  gap: var(--space-s);
  padding: var(--space-2xl) var(--space-l);
  align-items: start;
  position: relative;

  & > .article-wrapper {
    display: grid;
    column-gap: var(--space-s);
    grid-template-columns: repeat(12, 1fr);
    align-items: start;

    & > :not(aside, header) {
      grid-column: 1 / -1;
      @media (min-width: 768px) {
        grid-column: 4 / 12;
        //     padding: var(--space-l);
        //     gap: var(--space-l);
      }

      &.cover {
        aspect-ratio: 16/10;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        @media (min-width: 768px) {
          grid-column: 3 / -1;
        }
      }
    }
  }

  article.body {
    h2 {
      margin-top: var(--space-2xl);
      margin-bottom: var(--space-m);
    }

    h3 {
      margin-top: var(--space-l);
      margin-bottom: var(--space-m);
    }
    ul {
      margin-top: var(--space-s);
      display: grid;
      gap: var(--space-2xs);

      li {
        position: relative;
        letter-spacing: 0.02em;

        &::before {
          content: "";
          display: inline-block;
          width: 8px;
          height: 8px;

          position: relative;
          margin-right: var(--space-xs);

          background-size: cover;
          background-position: center;
          background: var(--gradient-color);
          border-radius: 50%;
        }
      }
    }

    p {
      margin-top: var(--space-s);
      letter-spacing: 0.02em;

      &:has(> :is(a, code)) {
        //   overflow: auto;
      }
    }

    & > * {
      position: relative;
      --height: 0;

      &::before {
        content: "";
        height: var(--height);
        width: 2px;

        position: absolute;
        left: -2rem;
        top: 50%;
        transform: translateY(-50%);

        background: var(--gradient-color);
        border-radius: var(--corners);

        transition: 0.1s;
      }

      &:is(:hover, :focus-visible)::before {
        --height: 100%;
      }
    }
  }
}
</style>
