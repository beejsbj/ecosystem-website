<script setup>
const props = defineProps(["article"]);

const datePublished = computed(() => {
  const date = new Date(props.article?.created_at);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
});
</script>

<template>
  <header>
    <h1 class="loud-voice article-heading" :id="article?.title">
      {{ article?.title }}
    </h1>
    <h2 class="notice-voice">
      {{ article?.subtitle }}
    </h2>
    <article-meta>
      <div class="author">
        <picture>
          <img
            loading="lazy"
            src="@/assets/images/icons/author.svg"
            alt="author icon"
          />
        </picture>
        <p class="solid-voice">
          {{ article?.author?.name }}
        </p>
      </div>
      <div class="date">
        <picture>
          <img
            loading="lazy"
            src="@/assets/images/icons/calendar-icon.svg"
            alt="calendar icon"
          />
        </picture>
        <p class="solid-voice">
          {{ datePublished }}
        </p>
      </div>
      <div class="tag">
        <picture>
          <img
            loading="lazy"
            src="@/assets/images/icons/bookmark-icon.svg"
            alt="bookmark icon"
          />
        </picture>
        <p class="solid-voice">
          {{ article?.category }}
        </p>
      </div>
    </article-meta>
  </header>
</template>

<style scoped lang="scss">
header {
  grid-column: 1 / -1;
  @media (min-width: 768px) {
    grid-column: 3 / -1;
  }
  display: grid;
  align-items: start;
  justify-content: start;
  position: relative;
  margin-bottom: var(--space-2xl);

  h1.loud-voice {
    position: relative;
    text-wrap: balance;

    font-size: var(--step-2);

    padding: var(--space-3xs) 0;

    @media (min-width: 768px) {
      font-size: var(--step-3);
    }

    &::before {
      content: "";
      position: absolute;
      top: -1rem;
      left: 0;

      width: var(--before-width);
      height: 1px;
      background: var(--gradient-light);

      @media (min-width: 768px) {
        top: 50%;
        left: calc(-1 * var(--before-width) - 2rem);
        transform: translateY(-50%);
      }
    }
  }

  article-meta {
    display: grid;
    gap: var(--space-s);
    grid-template-columns: repeat(3, 1fr);
    margin-top: var(--space-2xs);
    justify-self: start;
    .solid-voice {
      font-size: var(--step--1);
    }
    div {
      display: flex;
      gap: var(--space-2xs);
      align-items: center;
      picture {
        max-width: 15px;
      }
    }
  }
}
</style>
