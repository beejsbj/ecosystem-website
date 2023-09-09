<script setup>
import { gsap } from "gsap";

const content = ref({
  heading:
    "API3 DAO serves data on-chain with first-party oracles that provide a decentralized API layer for Web 3.0 applications.",
  paragraph:
    "Through our expansive and robust network of trusted first-party oracles, API3 serves verified data directly onto the blockchain, employing a secure, dependable, and foolproof solution that guarantees end-to-end transparency throughout the entire process.",

  cards: [
    {
      title: "First-Party Oracle Services",
      description:
        "API3 provides secure and reliable first-party data feeds that establish seamless connections between API providers and oracle smart contracts, thereby eliminating the need for third-party intermediaries and bolstering the overall integrity of the data.",

      image: "square",
    },
    {
      title: "DAO Governed",
      description:
        "API3 strongly values decentralization, a foundational principle in the Web3 ecosystem. Its governance relies on a decentralized autonomous organization (DAO), which gives token holders the authority to make decisions and actively shape the platform's future.",
      image: "triangle",
    },
    {
      title: "Developer Experience",
      description:
        "API3 is committed to an open-source, democratized web that empowers individuals from all walks of life. We foster this through a comprehensive ecosystem, designed to equip developers with the tools, resources, and support they need to build exceptional dApps.",
      image: "circle",
    },
  ],
});
const cardIndex = ref(false);

function animateBackground() {
  gsap.fromTo(
    "mission-section .background-graphic path",
    {
      strokeDashoffset: "1500",
      strokeDasharray: "1500",
    },
    {
      duration: 0.35,
      strokeDashoffset: 0,
      ease: "power2.in",
      stagger: 0.1,
    }
  );
}

function animateParagraph() {
  gsap.fromTo(
    "mission-section .teaser-voice",
    {
      y: 50,
      opacity: 0,
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power4.out",
    }
  );
}

function onMouseEnter(index) {
  cardIndex.value = index;
  const cards = document.querySelectorAll("mission-section .mission-card");

  cards.forEach((card, i) => {
    if (i !== index) {
      card.style.setProperty("--underline-width", 0);
    }
  });

  event.target.style.setProperty("--underline-width", "100%");

  animateParagraph();
}
</script>

<template>
  <SectionColumn class="mission-stats">
    <mission-section v-auto-animate>
      <!-- static circle -->
      <picture class="shape-graphic">
        <CircleDecoration />
      </picture>

      <heading-text v-auto-animate>
        <h2 class="attention-voice">
          API3 DAO serves data on-chain with first-party oracles that provide a
          secure and reliable solution, with end-to-end transparency.
        </h2>
        <h3 class="teaser-voice">
          {{
            typeof cardIndex == "number"
              ? content.cards[cardIndex].description
              : content.paragraph
          }}
        </h3>
      </heading-text>
      <ul>
        <template v-for="(card, index) in content.cards">
          <li
            class="mission-card hover-underline"
            @mouseenter="onMouseEnter(index)"
          >
            <h4 class="notice-voice">{{ card.title }}</h4>
          </li>
        </template>
      </ul>

      <!-- background animating graphic -->
      <picture class="background-graphic">
        <Transition @enter="animateBackground">
          <DatafeedIcon v-if="cardIndex == 0" />
          <DaoIcon v-else-if="cardIndex == 1" />
          <DeveloperToolIcon v-else-if="cardIndex == 2" />
        </Transition>
      </picture>
    </mission-section>
  </SectionColumn>
</template>

<style scoped lang="scss">
span.highlight {
  color: var(--highlight);
}

h3.teaser-voice {
  text-transform: unset;
}

mission-section {
  display: grid;
  align-content: center;
  height: 100%;
  position: relative;
  gap: 20px;

  @media (min-width: 768px) {
    gap: 100px;
  }

  heading-text {
    max-width: 100ch;

    @media (min-width: 768px) {
      grid-column: 2 / span 6;
    }

    h2 {
      margin-bottom: 1rem;
    }
  }

  ul {
    display: grid;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1.5rem;
    grid-column: 1/-1;
    @media (min-width: 768px) {
      grid-column: 2 / span 5;
      gap: 2rem;
      margin-top: unset;
    }
  }

  picture.shape-graphic {
    width: 50px;

    @media (min-width: 768px) {
      width: 320px;
      opacity: 0.5;

      position: absolute;
      z-index: -1;
      top: 50px;
    }
  }

  picture.background-graphic {
    position: absolute;

    grid-row: 3/4;
    right: 0%;
    width: 40vmin;
    height: 40vmin;
    z-index: -1;
    opacity: 0.5;

    @media (min-width: 768px) {
      grid-row: 2/3;

      top: -100px;
    }
  }

  .mission-card {
    border-radius: var(--corners);
    transition: 0.2s;

    h4 {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
