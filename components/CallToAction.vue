<script setup>
import { useInterfaceStore } from "~/stores/interface";
import { gsap } from "gsap";

const ui = useInterfaceStore();

function onMouseover(event) {
  //   change axis x to 90% and reverse it back to 50% on mouseout
  gsap.to(event.target, {
    "--axis-x": "90%",
    duration: 3,
    ease: "back.out",
  });
}
</script>

<template>
  <SectionColumn class="cta-module">
    <!-- <span class="line"></span> -->

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
    padding: calc(var(--space-m) * 4) calc(var(--space-m) * 7);
  }
}
</style>
