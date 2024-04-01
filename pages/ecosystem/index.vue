<script setup>
import { useInterfaceStore } from "@/stores/interface";

const ui = useInterfaceStore();

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
</script>

<template>
  <ContentsWrapper>
    <PageTitle heading="API3 Partners" class="loud-voice ecosystem-header">
      <NuxtLink to="/add-dapp" class="button solid-voice">
        <span class=""> Join the Ecosystem </span>
      </NuxtLink>
    </PageTitle>

    <SectionColumn innerClass="ecosystem-main-grid">
      <!-- <ClientOnly> -->
      <LazyDappFilter v-if="!ui.isMobile" />
      <div v-else>
        <FilterButtons />

        <ModalSlot>
          <LazyDappFilter />
        </ModalSlot>
      </div>
      <!-- </ClientOnly> -->

      <LazyDappGrid />
    </SectionColumn>
  </ContentsWrapper>
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
