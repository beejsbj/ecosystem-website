<script setup>
/**
 * OEVExplainerCarousel Component
 * 
 * A carousel component that explains the OEV (Optimistic Ethereum Validation) process step by step.
 *
 * @component
 *
 * @example
 * <OEVExplainerCarousel />
 *
 * @features
 * - Displays a series of steps explaining the OEV process
 * - Includes interactive carousel functionality for mobile devices
 * - Responsive design with different layouts for mobile and desktop
 * - Custom styling for each step, including arrows between steps
 * - Background decoration with curves
 *
 */
const ui = useInterfaceStore();

const scrollPosition = ref(0);
const carouselWidth = ref(0);

const steps = [
  {
    count: 1,
    text: "Oracle updates",
  },
  {
    arrow: true,
  },
  {
    count: 2,
    text: "Health Factor",
  },
  {
    arrow: true,
  },
  {
    count: 3,
    text: "Searchers see the liquidable position",
  },
  {
    arrow: true,
  },
  {
    count: 4,
    text: "Competition in block space auctions",
  },
  {
    arrow: true,
  },
  {
    heading: "User liquidated",
    count: 5,
    text: "Profits",
    list: ["Searchers", "Validators"],
  },
];
///
let handleButton;
useGsap((gsap) => {
  handleButton = (direction) => {
    const carousel = document.querySelector(".explainer-carousel");
    scrollPosition.value = carousel.clientWidth;
    const currentScroll = carousel.scrollLeft;
    const newScroll =
      direction > 0
        ? currentScroll + scrollPosition.value
        : currentScroll - scrollPosition.value;

    gsap.to(carousel, {
      scrollTo: {
        x: newScroll,
      },
    });
  };
});
</script>

<template>
  <SectionColumn>
    <h2
      :class="{
        'firm-voice': ui.isMobile,
        'attention-voice': !ui.isMobile,
      }"
    >
      How does it all work together?
    </h2>

    <ul class="explainer-carousel">
      <li v-for="step in steps">
        <!--  -->
        <template v-if="step.arrow">
          <picture class="arrow">
            <img src="/images/oev/explainer-steps/arrow.svg" alt="" />
          </picture>
        </template>

        <!--  -->
        <template v-else>
          <picture :class="`step-${step.count}`">
            <h3 class="whisper-voice" v-if="step.heading">
              {{ step.heading }}
            </h3>
            <img :src="`/images/oev/explainer-steps/step-${step.count}.svg`" />
          </picture>
          <p class="solid-voice">
            {{ step.text }}
          </p>
          <ul class="step-list" v-if="step.list">
            <li v-for="item in step.list">
              <p class="whisper-voice">
                {{ item }}
              </p>
            </li>
          </ul></template
        >
      </li>
    </ul>
    <div class="actions">
      <button class="icon prev" @click="handleButton(-1)">
        <picture>
          <DynamicIcon icon="left" />
        </picture>
      </button>
      <button class="icon next" @click="handleButton(1)">
        <picture>
          <DynamicIcon icon="right" />
        </picture>
      </button>
    </div>
    <picture class="explain-bg-curves">
      <img
        src="/images/oev/explainer-steps/explainer-bg.svg"
        alt="BG Curve Image"
      />
    </picture>
  </SectionColumn>
</template>

<style scoped lang="scss">
h2 {
  text-align: center;
  margin-top: 20px;
}

h3 {
  position: absolute;
  top: calc(var(--space-s) * -2);
}

h3,
p {
  text-align: center;
  text-wrap: balance;
}

section {
  position: relative;
  overflow: hidden;
}

.explain-bg-curves {
  position: absolute;
  top: 0vw;
  left: -40vw;
  width: 250vw;
  height: 80vw;
  z-index: -1;
}

ul.explainer-carousel {
  display: grid;
  grid-template-columns: 96px 25px 96px 25px 96px 25px 96px 25px 96px;
  gap: var(--space-l);
  //   align-items: center;
  //   justify-content: center;
  margin-top: var(--space-2xl);
  max-width: 91cqw;
  overflow-x: scroll;

  @media (min-width: 1000px) {
    grid-template-columns: repeat(9, 1fr);
    max-width: unset;
    overflow-x: unset;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  picture {
    max-width: 100px;
  }

  & > li {
    display: grid;
    gap: var(--space-s);
    justify-items: center;
    align-content: start;
    position: relative;
  }
}
.actions {
  justify-content: center;
  margin-top: var(--space-m);
  gap: var(--space-xl);

  picture {
    max-width: 10px;
    :deep(svg) {
      color: var(--green);
    }
  }

  @media (min-width: 1000px) {
    display: none;
  }
}

.step-list li {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    font-size: inherit;
    top: 50%;
    transform: translateY(-50%);
    left: -20px;
    width: 0.5em;
    height: 0.5em;
    background-color: var(--green-darker);
    border-radius: 50%;
  }

  & + li {
    margin-top: var(--space-3xs);
  }
}

li:has(picture.arrow) {
  align-self: center;
}

picture.arrow {
  position: relative;
  top: -550%;

  @media (min-width: 1000px) {
    top: -800%;
  }
}
</style>
