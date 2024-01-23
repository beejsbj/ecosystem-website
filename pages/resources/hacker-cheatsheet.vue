<script setup>
const content = await queryContent("resources/cheatsheet").findOne();

definePageMeta({
  layout: "footer-less",
  //   alias: "qrng-cheatsheet",
});

useSeoMeta({
  title: content.meta.title,
  ogTitle: content.meta.title,
  twitterTitle: content.meta.title,

  description: content.meta.description,
  ogDescription: content.meta.description,
  twitterDescription: content.meta.description,

  //   image: content.meta.image,
  //   ogImage: content.meta.image,
  //   twitterImage: content.meta.image,

  ogUrl: content.meta.url,
  twitterUrl: content.meta.url,

  ogType: content.meta.type,
  twitterType: content.meta.type,
});
</script>

<template>
  <main>
    <SectionColumn>
      <article class="infographic">
        <header>
          <h1 class="loud-voice gradient-text-color">
            {{ content.header.title }}
          </h1>

          <div>
            <div class="card">
              <p class="solid-voice gradient-text">
                {{ content.header.subtitle }}
              </p>
            </div>
            <div class="card">
              <p class="solid-voice gradient-text">
                {{ content.header.tag }}
              </p>
            </div>
          </div>
          <p class="notice-voice intro">
            {{ content.introPara }}
          </p>
        </header>

        <div class="left">
          <template v-for="card in content.left.qrCards">
            <div class="qr-card" :class="{ reverse: card.reverse }">
              <text-content>
                <h3 class="teaser-voice">{{ card.title }}</h3>
                <p class="notice-voice">
                  {{ card.description }}
                </p>
              </text-content>

              <picture class="qr-code" :class="{ reverse: card.reverse }">
                <img :src="card.image" />
                <NuxtLink
                  class="text whisper-voice"
                  :target="card.link"
                  :to="card.link"
                >
                  {{ card.title }}
                </NuxtLink>
              </picture>
            </div>
          </template>

          <ol>
            <h3 class="firm-voice">
              {{ content.left.gettingStarted.heading }}
            </h3>
            <li
              v-for="(item, index) in content.left.gettingStarted.list"
              :data-list-number="index + 1"
              :key="index"
            >
              {{ item }}
            </li>
          </ol>
        </div>
      </article>
    </SectionColumn>
  </main>
</template>

<style scoped lang="scss">
article {
  display: grid;
  row-gap: var(--space-2xl);
  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 1fr;
  }

  & > div {
    display: grid;
    gap: var(--space-2xl);
  }

  p.notice-voice.intro {
    color: var(--ink);
  }
}

text-content {
  display: grid;
  //   gap: var(--space-xs);
}

header {
  display: grid;
  gap: var(--space-2xs);

  & > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: start;
    gap: var(--space-2xs);
    align-items: center;

    .card {
      padding: var(--space-s);
      border-radius: var(--corners);
      border: var(--border-dark);
      min-width: 100px;
      color: transparent;
      background: var(--paper);
    }
  }
}

.qr-card {
  display: flex;

  gap: var(--space-s);
  align-items: flex-start;
  justify-content: space-between;

  &.reverse {
    //  grid-template-columns: 0.4fr 0.8fr;
    flex-direction: row-reverse;

    text-content * {
      text-align: right;
    }

    a {
      text-align: left;
    }
  }

  & > *:nth-of-type(1) {
    flex-basis: 60%;
  }

  & > *:nth-of-type(2) {
    flex-basis: 40%;
  }

  h3 + p {
    margin-top: 0;
  }

  h3 {
    text-transform: uppercase;
    font-weight: var(--weight-heavy);
  }
}

picture.qr-code {
  //   aspect-ratio: 1;
  max-width: 100px;

  position: relative;
  transition: 0.2s ease-in-out;

  @media (min-width: 768px) {
    max-width: 250px;
  }

  &:has(a:hover) {
    //  scale: 1.1;
  }

  a {
    //  position: absolute;
    //  inset: 0;
    //  z-index: 1;
    padding-left: 0;
    text-align: right;
  }
}

:deep(blockquote) {
  max-width: unset;
}

ol {
  display: grid;
  gap: var(--space-s);
  background: var(--gradient-dark);
  padding: var(--space-m);
  border-bottom-left-radius: calc(var(--corners) * 4);
  overflow-x: hidden;

  @media (min-width: 768px) {
    padding: var(--space-xl);
  }

  li {
    position: relative;
    left: var(--left, 50px);
    max-width: calc(100% - var(--left));
    color: var(--ink);

    @media (min-width: 768px) {
      font-size: var(--step-1);

      --left: 60px;
    }

    &::before {
      content: attr(data-list-number);
      position: absolute;
      clip-path: polygon(50% 0%, 0 80%, 100% 80%);
      background: var(--green);
      padding: var(--space-s);
      // border-radius: 50%;
      aspect-ratio: 1;
      text-align: center;
      color: var(--paper);
      font-size: 16px;
      left: calc(-1 * var(--left, 50px));

      top: 50%;
      transform: translateY(-50%);
      font-weight: var(--weight-heavy);
      line-height: 0.8;
    }
  }
}
</style>
