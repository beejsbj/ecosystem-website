<script setup>
// const props = defineProps(["proxy"]);
// const chainId = proxy.chainId;

const route = useRoute();
const ecosystem = useEcosystemStore();

const feedSlug = route.params.detail;
const feedName = feedSlug.replace("-", "/");

const chain = computed(() => {
  return ecosystem.chainNames(route.query.chainId);
});
</script>

<template>
  <div class="title-mast">
    <div class="feed-icon-heading">
      <FeedIcon :feed="feedName" />

      <h1 class="attention-voice">
        <strong>{{ feedName }}</strong>
      </h1>
    </div>

    <NuxtLink
      :to="`https://market.api3.org/dapis/${chain}/${feedSlug}`"
      class="button outline whisper-voice"
    >
      <span class="external-link"> View on Market </span>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.title-mast {
  display: grid;

  .feed-icon-heading {
    display: flex;
    gap: var(--space-2xs);
    align-items: center;
  }

  :deep(.feed-icon) picture {
    --width: 50px;
  }

  .button {
    display: grid;
    text-transform: uppercase;
    place-items: center;
    margin: var(--space-s) 0;
    justify-self: start;
    margin-left: var(--space-s);
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;

    .button {
      justify-self: end;
    }
  }
}
</style>
