<script setup>
import { FormKitIcon } from "@formkit/vue";
const props = defineProps(["feedProjects", "pending", "proxy"]);
const ui = useInterfaceStore();

//  get more dapps on scroll
const dapps = computed(() => {
  return props.feedProjects.projects;
});

function formattedProxies(dapp) {
  if (!dapp?.proxies) {
    return [];
  }

  const formattedProxyItems = [];
  Object.keys(dapp?.proxies).forEach((chain) => {
    let chainItems = dapp?.proxies?.[chain]?.map((el) => {
      return { ...el, chainId: chain };
    });
    formattedProxyItems.push(...chainItems);
  });

  return formattedProxyItems.filter((proxy) => {
    if (props.proxy.chainId == undefined) {
      return proxy.feedName == props.proxy.feedName;
    } else
      return (
        proxy.feedName == props.proxy.feedName &&
        proxy.chainId == props.proxy.chainId
      );
  });
}

//

function exportCSV() {
  console.log("export csv");
  console.log(dapps.value);
}
</script>

<template>
  <SectionColumn class="main">
    <ul class="feed-dapp-cards" v-auto-animate>
      <SkeletonListItem v-for="i in 6" v-if="!ui.loadingDone" />

      <template v-else-if="dapps.length > 0">
        <button class="calm-voice text green export-button" @click="exportCSV">
          <picture>
            <FormKitIcon icon="download-csv-alt" />
          </picture>

          Export CSV
        </button>
        <template v-for="dapp in dapps">
          <li v-for="dAppProxy in formattedProxies(dapp)" :key="dAppProxy">
            <SkeletonCard v-if="pending" />
            <FeedDappCard
              v-else
              :dapp="dapp"
              :proxy="proxy"
              :dappProxy="dAppProxy"
            />
          </li>
        </template>
      </template>
    </ul>

    <p class="notice-voice" v-if="!dapps">
      There are no dApps on this Feed and Chain.
    </p>
  </SectionColumn>
</template>

<style scoped lang="scss">
.main :deep(inner-column) {
  display: grid;
  gap: var(--space-l);
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
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}
</style>
