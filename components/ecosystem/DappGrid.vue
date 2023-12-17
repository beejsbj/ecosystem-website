<script setup>
import { useEcosystemStore } from "~/stores/ecosystem";
import { useInfiniteScroll } from "@vueuse/core";
import { gsap } from "gsap";

const ecosystem = useEcosystemStore();

const listRef = ref(null);

// useInfiniteScroll(
//   listRef,
//   () => {
//     console.log("scroll");
//     if (
//       ecosystem.list.length < ecosystem.totalProjects ||
//       ecosystem.list.length >= 10
//     ) {
//       ecosystem.filterQuery.page += 1;
//     }
//   },
//   { distance: 20 }
// );

const handleLoadMore = () => {
  if (
    ecosystem.list.length < ecosystem.totalProjects ||
    ecosystem.list.length >= 10
  ) {
    ecosystem.filterQuery.page += 1;
  }
};

onMounted(() => {
  const pageLoad = gsap.timeline();

  pageLoad.to(".dapp-grid", {
    opacity: 1,
    duration: 0,
  });

  if (document.querySelector("dapp-card")) {
    pageLoad.fromTo(
      "dapp-card",
      {
        y: "10vw",
        duration: 0,
        delay: "0.5",
      },
      {
        y: "0vw",
        opacity: 1,
        duration: 0.5,
        stagger: {
          each: 0.15,
          from: "start",
        },
      }
    );
  }
});
</script>

<template>
  <div class="dapp-grid" ref="listRef" v-auto-animate>
    <DappCard
      v-for="(dapp, index) in ecosystem.list"
      :dapp="dapp"
      :key="dapp?.name"
      :data-index="index"
    />
    <button
      class="text show-more"
      @click="handleLoadMore"
      v-if="ecosystem.hasMoreItems"
    >
      {{ "Show More" }}
    </button>
  </div>
</template>

<style scoped>
.dapp-grid {
  display: grid;
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
