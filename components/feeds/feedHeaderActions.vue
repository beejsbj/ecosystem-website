<script setup>
import slug from "slug";
const route = useRoute();
const router = useRouter();
const ecosystem = useEcosystemStore();

const chainSlug = computed(() => {
  return slug(ecosystem.chainNames(route.query.chainId));
});

const showReset = computed(() => {
  const hasQuery = Object.keys(route.query).length > 0;
  return hasQuery;
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
</template>

<style scoped lang="scss">
.actions {
  align-items: center;

  & > * {
    @media (max-width: 500px) {
      flex-basis: 50%;
    }
  }

  @media (min-width: 900px) {
    justify-self: end;
  }
}
</style>
