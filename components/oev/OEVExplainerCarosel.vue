<script setup>
import { FormKitIcon } from "@formkit/vue";
const ui = useInterfaceStore();

const { gsap } = useGsap();

const scrollPosition = ref(0);


const steps = [
  {
    count: 1,
    text: 'Oracle updates'
  },
  {
    count: 2,
    text: 'Health Factor'
  },
  {
    count: 3,
    text: 'Searchers see the liquidable position'
  },
  {
    count: 4,
    text: 'Competition in block space auctions'
  },
  {
    heading: 'User liquidated',
    count: 5,
    text: 'Profits',
    list: [
      'Searchers',
      'Validators'
      ]
  }


] 

useGsap((gsap) => {
  //scroll ul as we scroll

  if (ui.isDesktop) {
    return;
  }

  setTimeout(() => {
    gsap.to(".explainer-carousel", {
      scrollTrigger: {
        trigger: "ul.explainer-carousel",
        start: "top 60%",
        end: "80% 40%",
        scrub: true,
      },

      scrollTo: {
        x: "max",
      },
    });
  }, 3000);
});

function handleButton(direction) {
  scrollPosition.value += direction;
  let distance = ui.isMobile ? 350 : 250;
  let x = scrollPosition.value * distance;

  if (direction) {
    gsap.to(".explainer-carousel", {
      scrollTo: {
        x,
      },
    });
  } else {
    gsap.to(".explainer-carousel", {
      scrollTo: {
        x,
      },
    });
  }
}
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
        <h3 class='whisper-voice'>
          {{step.heading}}
        </h3>
        <picture :class="`step-${step.count}`">
          <img :src="`/images/oev/explainer-steps/step-${step.count}.svg`" />
        </picture>
        <p class="solid-voice">
          {{step.text}}
        </p>
      </li>
    </ul>
    <div class="actions">
      <button
        class="icon prev"
        @click="handleButton(-1)"
        :disabled="scrollPosition === 0"
      >
        <picture>
          <FormKitIcon icon="left" />
        </picture>
      </button>
      <button
        class="icon next"
        @click="handleButton(1)"
        :disabled="scrollPosition === 2"
      >
        <picture>
          <FormKitIcon icon="right" />
        </picture>
      </button>
    </div>
    <picture class="explain-bg-curves">
      <img src="/images/oev/explainer-steps/explainer-bg.svg" alt="BG Curve Image">
    </picture>
  </SectionColumn>
</template>

<style scoped lang="scss">
h2 {
  text-align: center;
  margin-top: 20px;
}

section {
  position: relative;
  overflow: hidden;


}

.explain-bg-curves {
  position: absolute;
  top: 0vw; left: -40vw;
  width: 250vw;
  height: 80vw;
  z-index: -1;

}




ul {
  display: grid;
  grid-template-columns: repeat(5, 175px);
  margin-top: var(--space-xl);
  max-width: 91cqw;
  overflow-x: scroll;

  @media (min-width: 768px) {
    grid-template-columns: repeat(5, 250px);
  }

  @media (min-width: 1000px) {
    grid-template-columns: repeat(5, 1fr);
    max-width: unset;
    overflow-x: unset;
  }

  &::-webkit-scrollbar {
    display: none;
  }

  picture{
    max-width: 100px;

  }

}


li:has(+ li) {
  --arrow-size: 1.5rem;
  padding-right: var(--arrow-size);
  background-image: url("/images/oev/explainer-steps/arrow.svg");
  background-repeat: no-repeat;
  background-position: right 30%;
  background-size: var(--arrow-size);
}

.actions {
  justify-content: center;
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
</style>
