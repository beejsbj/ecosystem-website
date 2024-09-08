<!--
 Feed dApps Component

 This component displays a list of dApps filtered based on the current feed and chain.
 It also provides functionality to export the filtered dApps as a JSON file.

 Props:
 @prop {Object} feedProjects - Contains the projects data for the feed
 @prop {boolean} pending - Indicates if data is still being loaded
 @prop {Object} proxy - The current proxy object used for filtering
-->

<script setup>
const props = defineProps(["feedProjects", "pending", "proxy"]);
const ui = useInterfaceStore();

// Computed property for filtered and formatted dapps
const filteredDapps = computed(() => {
  const result = props.feedProjects.projects.flatMap((dapp) => {
    if (!dapp.proxies) {
      return [];
    }

    return Object.entries(dapp.proxies).flatMap(([chain, proxies]) => {
      const chainProxies = proxies
        .map((proxy) => {
          const formattedProxy = {
            ...proxy,
            chainId: chain,
            dapp: dapp,
          };
          return formattedProxy;
        })
        .filter((proxy) => {
          const match =
            proxy.feedName.toLowerCase() === props.proxy.feedName.toLowerCase();

          return match;
        });

      return chainProxies;
    });
  });

  return result;
});

function exportJSON() {
  const json = JSON.stringify(filteredDapps.value);

  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "dapps.json");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
</script>

<template>
  <SectionColumn class="main">
    <ul class="feed-dapp-cards" v-auto-animate>
      <SkeletonListItem v-for="i in 6" v-if="!ui.loadingDone" :key="i" />

      <template v-else-if="filteredDapps.length > 0">
        <button class="calm-voice text export-button" @click="exportJSON">
          <DynamicIcon icon="download-csv-alt" />
          Export JSON
        </button>
        <li v-for="item in filteredDapps" :key="item.id">
          <SkeletonCard v-if="pending" />
          <FeedDappCard
            v-else
            :dapp="item.dapp"
            :proxy="props.proxy"
            :dappProxy="item"
          />
        </li>
      </template>
    </ul>

    <p class="notice-voice" v-if="filteredDapps.length === 0">
      There are no dApps on this Feed and Chain.
    </p>
  </SectionColumn>
</template>

<style scoped lang="scss">
.main :deep(inner-column) {
  display: grid;
  gap: var(--space-l);
  padding-top: 0;
}

.display-card-section {
  display: grid;
  gap: var(--space-s);

  @media (min-width: 768px) {
    align-items: start;
    align-content: start;
  }
}

.feed-dapp-cards {
  display: grid;
  align-content: start;
  gap: var(--space-s);
  position: relative;

  transition: 0.5s;

  button.export-button {
    grid-column: 1/-1;
    justify-self: end;

    display: flex;
    align-items: center;
    gap: var(--space-3xs);
    picture {
      max-width: 32px;
    }

    &:hover {
      stroke: currentColor;
    }
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
  }
}
</style>
