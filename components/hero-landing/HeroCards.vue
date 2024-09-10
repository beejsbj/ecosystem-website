<script setup>
/**
 * HeroCards Component
 *
 * This component displays a grid of cards highlighting different sections
 * or features of the API3 ecosystem.
 *
 * @vue-component
 *
 * @example
 * <HeroCards />
 *
 * @features
 * - Displays a set of cards with information about different API3 ecosystem areas
 * - Each card includes an icon, heading, description, and a call-to-action link
 * - Responsive grid layout adapting to different screen sizes
 * - Uses custom styling for a cohesive look with the rest of the application
 *
 * @note
 * This component doesn't accept any props, as it uses internal data.
 */

const ui = useInterfaceStore();

const showcaseCards = ref([
  {
    heading: "API3 Ecosystem",
    paragraph: "Discover and explore API3's Ecosystem partners.",
    cta: "Explore Ecosystem",
    link: "/ecosystem",
    image: "docs",
  },
  {
    heading: "Developers",
    paragraph: "Learn to use oracles for your blockchain applications.",
    cta: "Get Started",
    link: "http://docs.api3.org",
    image: "developers",
  },

  {
    heading: "Updates",
    paragraph: "Stay up to date with the API3 Ecosystem and our partners",
    cta: "Discover Updates",
    link: "/articles",
    image: "article",
  },
]);
</script>
<template>
  <div class="items">
    <hero-card
      class="item border-gradient-green background-radial-green"
      v-for="card in showcaseCards"
    >
      <picture class="">
        <DynamicIcon :icon="card.image" />
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
  padding: var(--space-xl) var(--space-l);
  text-align: center;

  picture {
    max-width: 80px;
    aspect-ratio: 1;
  }

  text-content {
    display: grid;
  }
}
</style>
