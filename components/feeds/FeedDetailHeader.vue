<script setup>
import slug from "slug";
// const props = defineProps(["proxy"]);
// const chainId = proxy.chainId;

const route = useRoute();
const router = useRouter();
const ecosystem = useEcosystemStore();

const feedSlug = route.params.detail;
const feedName = feedSlug.replace("-", "/");

const chainSlug = computed(() => {
  return slug(ecosystem.chainNames(route.query.chainId));
});

const showReset = computed(() => {
  return Object.keys(route.query).length > 0;
});

const showMarket = computed(() => {
  return route.query.chainId;
});

function handleReset() {
  router.push({
    query: {},
  });
}
</script>

<template>
  <div class="title-mast">
    <div class="feed-icon-heading">
      <FeedIcon :feed="feedName" />

      <h1 class="attention-voice">
        <strong>{{ feedName }}</strong>
      </h1>
    </div>

    <div class="actions" v-auto-animate v-if="showReset">
      <button
        @click="handleReset"
        class="button whisper-voice"
        v-if="showReset"
        key="reset-button"
      >
        Reset To Feed List
      </button>

      <NuxtLink
        v-if="showMarket"
        :to="`https://market.api3.org/dapis/${chainSlug}/${feedSlug}`"
        class="button outline whisper-voice"
        :target="`${chainSlug}-${feedSlug}`"
        key="market-button"
      >
        <span class="external-link"> View on Market </span>
      </NuxtLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.title-mast {
  display: grid;

  gap: var(--space-xs);

  .feed-icon-heading {
    display: flex;
    gap: var(--space-2xs);
    align-items: center;
  }

  :deep(.feed-icon) picture {
    --width: 50px;
  }

  .button {
    //  display: grid;
    //  text-transform: uppercase;
    //  place-items: center;
    //  margin: var(--space-s) 0;
    //  justify-self: start;
    //  margin-left: var(--space-s);
  }

  .actions {
    align-items: center;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;

    .actions {
      justify-self: end;
    }
  }
}
</style>
