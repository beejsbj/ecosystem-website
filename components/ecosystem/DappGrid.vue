<script setup>
import { useEcosystemStore } from "~/stores/ecosystem";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const ecosystem = useEcosystemStore();
const ui = useInterfaceStore();

const listRef = ref(null);

const handleLoadMore = () => {
  if (
    ecosystem.list.length < ecosystem.totalProjects &&
    ecosystem.list.length >= 10
  ) {
    ecosystem.filterQuery.page += 1;
  }
};

let gsapContext = null;

onMounted(() => {
  setTimeout(() => {
    if (!ecosystem.hasMoreItems) return;
    gsapContext = gsap.context(() => {
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
    });
  }, 3000);
});

onUnmounted(() => {
  if (gsapContext) {
    gsapContext.kill();
  }
});
</script>

<template>
  <div class="dapp-grid" ref="listRef" v-auto-animate>
    <DappCard
      v-if="ui.loadingDone && ecosystem.list.length > 0"
      v-for="(dapp, index) in ecosystem.list"
      :dapp="dapp"
      :key="dapp?.name"
      :data-index="index"
    />
    <SkeletonCard v-else v-for="index in 10" />
    <!-- <button
      class="text show-more"
      @click="handleLoadMore"
      v-if="ecosystem.hasMoreItems"
    >
      how More
    </button> -->
  </div>
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
