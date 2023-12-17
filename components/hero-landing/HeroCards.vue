<script setup>
import { useInterfaceStore } from "~/stores/interface";
const ui = useInterfaceStore();

const showcaseCards = ref([
  {
    heading: "API3 Ecosystem",
    paragraph: "Discover and explore API3's Ecosystem partners.",
    cta: "Explore Ecosystem",
    link: "/ecosystem",
    image: "/images/icons/docs.svg",
  },
  {
    heading: "Developers",
    paragraph: "Learn to use oracles for your blockchain applications.",
    cta: "Get Started",
    link: "http://docs.api3.org",
    image: "/images/icons/developers.svg",
  },

  {
    heading: "Updates",
    paragraph: "Stay up to date with the API3 Ecosystem and our partners",
    cta: "Discover Updates",
    link: "/articles",
    image: "/images/icons/article.svg",
  },
]);
</script>
<template>
  <div class="items">
    <hero-card
      class="item border-gradient-green background-radial-green"
      v-for="card in showcaseCards"
    >
      <!-- @mouseover="ui.changeHeroImage(card)" -->
      <picture class="">
        <NuxtImg loading="lazy" :src="card.image" :alt="card.heading" />
      </picture>
      <text-content>
        <h2 class="firm-voice">
          {{ card.heading }}
        </h2>
        <p>
          {{ card.paragraph }}
        </p>
      </text-content>
      <NuxtLink class="text" :to="card.link">
        {{ card.cta }}
      </NuxtLink>
    </hero-card>
  </div>
</template>

<style scoped lang="scss">
div.items {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(300px, 100%), 1fr));
  gap: var(--space-2xl);
}

hero-card {
  display: grid;
  gap: var(--space-m);
  justify-items: center;
  //   align-content: space-between;
  padding: var(--space-xl) var(--space-l);
  text-align: center;

  picture {
    max-width: 80px;
    aspect-ratio: 1;
    //  gap: var(--space-m);
  }

  text-content {
    //  max-width: 80%;
    display: grid;
  }
}
</style>
