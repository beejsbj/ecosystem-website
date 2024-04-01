<script setup>
const props = defineProps(["feedProjects", "pending", "proxy", "feedName"]);

const displayDapp = computed(() => {
  return props.feedProjects.projects.find(
    (dapp) => dapp.slug == props.proxy.dappSlug
  );
});
</script>

<template>
  <SectionColumn class="main">
    <div class="display-card" v-if="displayDapp">
      <SkeletonCard v-if="pending" />
      <FeedDappCard
        v-else
        :dapp="displayDapp"
        :proxy="proxy"
        :key="displayDapp.slug"
        :feedname="feedName"
        class="display-card"
      />

      <FeedChainValueCard
        :dapp="displayDapp"
        :proxy="proxy"
        :feedname="feedName"
      />
    </div>
    <h2 class="solid-voice" v-else>Select a Dapp to View more</h2>
    <ul
      class="feed-dapp-cards"
      :class="{ 'is-display': !displayDapp }"
      v-auto-animate
    >
      <li v-for="dapp in feedProjects.projects">
        <SkeletonCard v-if="pending" />
        <FeedDappCard
          v-else
          :dapp="dapp"
          :proxy="proxy"
          :key="dapp.slug"
          :feedname="feedName"
        />
      </li>
    </ul>
  </SectionColumn>
</template>

<style scoped lang="scss">
.main :deep(inner-column) {
  display: grid;
  gap: var(--space-l);

  @media (min-width: 768px) {
    grid-template-columns: 1fr 0.5fr;
  }
}

.display-card {
  display: grid;
  gap: var(--space-s);

  @media (min-width: 768px) {
    align-items: start;
    align-content: start;
  }
}

.feed-dapp-cards {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-s);
  position: relative;

  transition: 0.5s;

  @media (min-width: 768px) {
    grid-column: 2;
  }
}

.feed-dapp-cards.is-display {
  grid-column: 1;
}
</style>
