<script setup>
definePageMeta({
  title: "Add Your dApp",
  layout: "footer-less",
});

useSeoMeta({
  title: "Add Your dApp",
  description:
    "Join the API3 ecosystem. Easily list your dApp or service and join our thriving community",
  ogDescription:
    "join the API3 ecosystem. Easily list your dApp or service and join our thriving community",
});
</script>

<template>
  <ContentsWrapper>
    <PageTitle heading="Join the Ecosystem" innerClass="add-dapp-title">
      <p>
        This frontend showcase keeps the ecosystem listing experience visible
        while live submissions are paused.
      </p>
    </PageTitle>
    <SectionColumn>
      <text-content class="showcase-notice">
        <h2 class="attention-voice">Submissions are disabled in showcase mode</h2>
        <p>
          The original workflow connected a wallet, verified a SIWE signature,
          uploaded images, checked proxy data, and opened a registry PR. Those
          backend services have been turned off so this site can run without
          private environment variables.
        </p>
        <p>
          Browse the live frontend catalogue instead, or use this page as the
          preserved entry point for a future submission flow.
        </p>
        <NuxtLink class="button" to="/ecosystem">Explore ecosystem</NuxtLink>
      </text-content>
    </SectionColumn>
  </ContentsWrapper>
</template>

<style scoped>
.showcase-notice {
  max-width: 720px;
  margin-inline: auto;
  padding-block: var(--space-xl);
}
</style>
