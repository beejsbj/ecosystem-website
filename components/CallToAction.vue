<script setup>
/**
 * CallToAction Component
 *
 * A visually appealing call-to-action component with an interactive background effect.
 *
 * @component
 *
 * @example
 * <CallToAction />
 *
 * @features
 * - Displays a headline encouraging users to join the Web3 API ecosystem
 * - Includes a button linking to the ecosystem page
 * - Background gradient that shifts on mouseover
 * - Responsive design for various screen sizes

 */

import { useInterfaceStore } from "~/stores/interface";

const ui = useInterfaceStore();

let onMouseover;
useGsap((gsap) => {
  onMouseover = (event) => {
    //   change axis x to 90% and reverse it back to 50% on mouseout

    const randomX = Math.random() * 100; // Generates a random number between 0 and 100
    gsap.to(event.target, {
      "--axis-x": `${randomX}%`,
      duration: 3,
      ease: "back.out",
    });
  };
});
</script>

<template>
  <SectionColumn class="cta-module">
    <cta-module @mouseover="onMouseover">
      <text-content>
        <h2 class="loud-voice">
          Join the Web3 API revolution and publish your dapp on our site today!
        </h2>
        <NuxtLink class="button" to="/ecosystem"> Join the Ecosystem </NuxtLink>
      </text-content>
    </cta-module>
  </SectionColumn>
</template>

<style scoped lang="scss">
cta-module {
  padding: calc(var(--space-xl)) calc(var(--space-m));

  --axis-x: 50%;
  background: radial-gradient(
      208.44% 148.88% at var(--axis-x) 0%,
      rgba(26, 248, 232, 0.25) 0%,
      rgba(0, 0, 0, 0) 45.83%,
      rgba(245, 245, 245, 0.15) 100%
    ),
    #040606;

  transition: all 0.3s ease-in-out;

  border-radius: var(--corners);

  text-content {
    display: grid;
    gap: var(--space-2xl);
    place-items: center;
    text-align: center;

    h2 {
      @media (max-width: 768px) {
        --font-size: var(--step-2);
      }
    }
  }
  @media (min-width: 768px) {
    padding: var(--space-2xl) var(--space-xl);
  }

  @media (min-width: 1300px) {
    padding: calc(var(--space-m) * 4) calc(var(--space-m) * 7);
  }
}
</style>
