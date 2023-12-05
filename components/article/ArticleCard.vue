<script setup>
import slug from "slug";
import { gsap } from "gsap";

const props = defineProps({
  article: {
    type: Object,
    required: true,
  },
});

onMounted(() => {
  const pageLoad = gsap.timeline();
  pageLoad.fromTo(
    "article-card",
    {
      y: "10vw",
      opacity: 0,
      duration: 0,
      delay: "0.5",
    },
    {
      y: "0vw",
      opacity: 1,
      duration: 0.5,
      stagger: {
        each: 0.15,
        from: "start",
      },
    }
  );
});
</script>

<template>
  <article-card class="background-radial-violet">
    <picture>
      <NuxtImg
        loading="lazy"
        :src="article?.cover ?? '/images/article-placeholder.jpg'"
        alt="Article Cover"
      />
    </picture>
    <text-content>
      <h3 class="solid-voice">
        {{ article?.title ?? "Article Title" }}
      </h3>
      <h4 class="whisper-voice">
        {{ article?.author.name ?? "Author Name" }}
      </h4>
    </text-content>
    <NuxtLink :to="`/articles/${slug(article?.title ?? '#')}`" class="text">
      Read more
    </NuxtLink>
  </article-card>
</template>

<style scoped lang="scss">
article-card {
  display: grid;
  border-radius: var(--corners);
  overflow: hidden;
  position: relative;

  --decoration-size: 100px;

  text-content {
    padding: var(--space-2xs) var(--space-s);
    padding-top: var(--space-s);

    .solid-voice {
      margin-bottom: var(--space-2xs);
    }

    .calm-voice {
      margin-top: var(--space-2xs);
    }
  }

  a.text {
    color: transparent !important;
    position: absolute;
    inset: 0;
    z-index: 1;
  }

  &.card {
    grid-column: 1/-1;

    @media (min-width: 768px) {
      grid-column: span 4;
    }

    picture {
      height: 100%;
      aspect-ratio: 16/9;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    }
  }

  &.slide {
    grid-template-columns: 1fr 0.5fr;
    gap: 1rem;

    align-items: center;
    min-height: 150px;

    grid-column: 1/-1;

    @media (min-width: 768px) {
      grid-column: span 6;
    }

    picture {
      order: 2;
      height: 100%;
      aspect-ratio: 16/9;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        object-position: center center;
      }
    }
  }
  &.text {
    //  aspect-ratio: 1/1;
    grid-column: span 2;

    @media (min-width: 768px) {
      grid-column: span 3;
      .firm-voice {
        //   font-size: var(--step-0);
      }
    }

    min-height: 150px;

    text-content {
      display: grid;
      grid-template-rows: 1fr auto;
    }

    picture {
      display: none;
    }
  }

  &.big-card {
    grid-column: 1/-1;

    .solid-voice {
      font-size: var(--step-1);
    }

    picture {
      height: 100%;
      aspect-ratio: 16/9;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    @media (min-width: 768px) {
      grid-column: span 6;
      grid-row: span 3;
    }

    text-content {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      // z-index: 2;
      background: linear-gradient(
        0deg,
        hsla(0, 0%, 1%, 0.7) 80%,
        hsla(0, 0%, 1%, 0) 100%
      );
    }

    a.text {
      // background: linear-gradient(
      //   0deg,
      //   hsla(0, 0%, 1%, 0.7) 20%,
      //   hsla(0, 0%, 1%, 0) 50%
      // );
    }
  }
}
</style>
