<script setup>
import { gsap } from "gsap";
import { useInterfaceStore } from "@/stores/interface";
import { useEcosystemStore } from "@/stores/ecosystem";

const ui = useInterfaceStore();
const ecosystem = useEcosystemStore();

useSeoMeta({
  title: "Ecosystems",
  ogTitle: "Ecosystems",
  twitterTitle: "Ecosystems",

  description:
    "Welcome to the API3 ecosystem. Easily list your dApp or service and join our thriving community",

  ogDescription:
    "Welcome to the API3 ecosystem. Easily list your dApp or service and join our thriving community",

  twitterDescription:
    "Welcome to the API3 ecosystem. Easily list your dApp or service and join our thriving community",
});

onMounted(() => {
  const pageLoad = gsap.timeline();

  pageLoad.fromTo(
    ".ecosystem-header",
    {
      y: 50,
      duration: 0,
      delay: "0.5",
    },
    {
      y: 0,
      opacity: 1,
      duration: 0.5,
      ease: "power4.out",
    }
  );
});
</script>

<template>
  <main>
    <PageTitle
      heading="API3 Ecosystem Partners"
      class="loud-voice ecosystem-header"
    >
      <NuxtLink to="/add-dapp" class="button solid-voice">
        <span class=""> Join the Ecosystem </span>
      </NuxtLink>
    </PageTitle>

    <SectionColumn innerClass="ecosystem-main-grid">
      <!-- <ClientOnly> -->
      <DappFilter v-if="!ui.isMobile" />
      <div v-else>
        <FilterButtons />

        <ModalSlot>
          <DappFilter />
        </ModalSlot>
      </div>
      <!-- </ClientOnly> -->

      <DappGrid />
    </SectionColumn>
  </main>
</template>

<style lang="scss">
.ecosystem-header {
  //   opacity: 0;

  inner-column {
    display: grid;
    gap: var(--space-s);

    align-items: center;
    justify-content: space-between;
    justify-items: start;

    .button {
      justify-self: center;
    }

    @media (min-width: 768px) {
      display: flex;
    }
  }
}

.ecosystem-main-grid {
  position: relative;
  display: grid;
  grid-gap: var(--space-l);

  align-items: start;

  @media (min-width: 768px) {
    grid-template-columns: 0.7fr 1fr;
  }
  @media (min-width: 1166px) {
    grid-template-columns: 0.4fr 1fr;
  }
}
</style>
