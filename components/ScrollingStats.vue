<script setup>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ui = useInterfaceStore();
const graph = ref(null);

const cards = [
  {
    triggerClass: "stats-card.first",
    imagePath: "/images/hero-ecosystem-articles.svg",
  },
  {
    triggerClass: "stats-card.second",
    imagePath: "/images/hero-ecosystem-gears.svg",
  },
  {
    triggerClass: "stats-card.third",
    imagePath: "/images/hero-graphic-ecosystem.svg",
  },
];

const changeImage = (card, index) => {
  const triggerElement = ref(document.querySelector(card.triggerClass));
};

onMounted(() => {
  cards.forEach(changeImage);
});
</script>

<template>
  <SectionColumn class="scrolling-stats">
    <scrolling-stats>
      <stats-card class="first">
        <h2 class="loud-voice">Why Statistics?</h2>
        <p class="notice-voice">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
          praesentium explicabo provident error tempora. Tenetur, facilis
          eligendi exercitationem nihil voluptates omnis enim magnam ducimus
          alias nam sint mollitia quisquam totam.
        </p>
      </stats-card>
      <stats-card class="second">
        <p class="notice-voice">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
          praesentium explicabo provident error tempora. Tenetur, facilis
          eligendi exercitationem nihil voluptates omnis enim magnam ducimus
          alias nam sint mollitia quisquam totam.
        </p>
      </stats-card>
      <stats-card class="third">
        <p class="notice-voice">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
          praesentium explicabo provident error tempora. Tenetur, facilis
          eligendi exercitationem nihil voluptates omnis enim magnam ducimus
          alias nam sint mollitia quisquam totam.
        </p>
      </stats-card>
      <picture class="graph">
        <NuxtImg loading="lazy" :src="graph" alt="stats" />
        <!-- #todo -->
      </picture>
    </scrolling-stats>
  </SectionColumn>
</template>

<style lang="scss"></style>
<style scoped lang="scss">
scrolling-stats {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-s);
  position: relative;
  align-items: center;
  justify-items: center;

  @media (min-width: 768px) {
    gap: var(--space-2xl);
  }

  stats-card {
    scroll-snap-align: center;
    grid-column: 1;
    height: 100vmin;
    display: grid;
    align-items: center;
    align-content: center;

    .notice-voice {
      @media (max-width: 768px) {
        font-size: var(--step-0);
      }
    }
  }
  .graph {
    position: sticky;
    top: 50%;
    transform: translatey(-50%);
    grid-row: 1;
    grid-column: 2;
  }

  &::after {
    content: "";
    background: var(--gradient-color);
    position: absolute;
    top: 0;
    right: 0;

    width: var(--line-width);
    height: var(--after-height);
  }
}
</style>
