<script setup>
/**
 * DappGrid Component
 *
 * A responsive grid component for displaying dApp cards in the ecosystem.
 *
 * @component
 *
 * @example
 * <DappGrid layout="grid" />
 *
 * @props
 * @prop {String} layout - Specifies the layout style for the grid
 *
 * @features
 * - Displays a grid of DappCard components
 * - Implements infinite scrolling with GSAP ScrollTrigger
 * - Shows skeleton cards during loading state
 * - Responsive grid layout adapting to screen sizes
 * - Smooth animations for card transitions
 *
 * @dependencies
 * - useEcosystemStore, useInterfaceStore: For state management
 * - DappCard: Component for individual dApp display
 * - SkeletonCard: Component for loading state
 * - GSAP and ScrollTrigger: For infinite scrolling functionality
 * - v-auto-animate: For smooth list transitions
 *
 */

const ecosystem = useEcosystemStore();
const ui = useInterfaceStore();

const listRef = ref(null);
const props = defineProps(["layout"]);

const handleLoadMore = () => {
  if (
    ecosystem.list.length < ecosystem.totalProjects &&
    ecosystem.list.length >= 10
  ) {
    ecosystem.filterQuery.page += 1;
  }
};

useGsap((gsap, ScrollTrigger) => {
  setTimeout(() => {
    if (!ecosystem.hasMoreItems) return;
    //   scroll trigger, when the bottom of dapp grid comes into view call handleloadmore
    ScrollTrigger.create({
      trigger: ".dapp-grid",
      start: "80% 50%",
      end: "85% 45%",
      onEnter: () => {
        handleLoadMore();
      },
      onLeaveBack: () => {
        ScrollTrigger.refresh();
      },
    });
  }, 3000);
});
</script>

<template>
  <ul class="dapp-grid" :class="layout" ref="listRef" v-auto-animate>
    <DappCard
      v-if="ui.loadingDone && ecosystem.list.length > 0"
      v-for="(dapp, index) in ecosystem.list"
      :dapp="dapp"
      :key="dapp?.name"
      :data-index="index"
      :class="layout"
    />
    <SkeletonCard v-else v-for="index in 10" />
    <!-- <button
      class="text show-more"
      @click="handleLoadMore"
      v-if="ecosystem.hasMoreItems"
    >
      how More
    </button> -->
  </ul>
</template>

<style scoped>
.dapp-grid {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-l);
  position: relative;
}

.show-more {
  align-self: flex-end;
}

.list-move {
  transition: transform 0.5s;
}
</style>
