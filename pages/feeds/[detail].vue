<script setup>
const route = useRoute();
const ecosystem = useEcosystemStore();

const feedSlug = route.params.detail;
const feedName = feedSlug.replace("-", "/");
const proxy = route.query;

// /api/projects?page=1&&ticker=WBTC/USD

const { data: feedProjects } = await useFetch(
  `/api/projects?&ticker=${feedName}`
);
</script>

<template>
  <article>
    <SectionColumn class="header">
      <FeedDetailHeader />
      <FeedHeaderInfo :proxy="proxy" />
    </SectionColumn>

    <SectionColumn class="main">
      <ul class="feed-dapp-cards">
        <FeedDappCard
          v-for="dapp in feedProjects.projects"
          :dapp="dapp"
          :proxy="proxy"
          :class="{ 'text-card': dapp.slug != proxy.dappSlug }"
        />
      </ul>

      <div class="chain-value-card">
        <text-content>
          <h2 class="teaser-voice">Chain Value</h2>
          <p class="value attention-voice">$176.2</p>
        </text-content>

        <div class="source-card">
          <h2 class="teaser-voice">Source</h2>
          <div>
            <picture>
              <NuxtImg loading="lazy" src="/images/chains/bsc.svg" alt="bsc" />
            </picture>
            <p class="solid-voice">Chainlink</p>
          </div>
        </div>
      </div>
    </SectionColumn>
  </article>
</template>

<style scoped lang="scss">
.main :deep(inner-column) {
  display: grid;
  gap: var(--space-l);

  ul {
    order: 2;
  }

  @media (min-width: 768px) {
    grid-template-columns: 1fr 0.4fr;

    ul {
      order: unset;
    }
  }
}

.chain-value-card {
  display: grid;
  gap: var(--space-m);
  padding: var(--space-l);
  align-self: start;

  background: var(--gradient-dark);

  border: var(--border-dark);
  border-radius: var(--corners);

  p.value {
    //  text-align: center;
    margin-top: var(--space-2xs);
  }
}

.source-card {
  div {
    margin-top: var(--space-2xs);
    display: flex;
    gap: var(--space-s);
    align-items: center;
  }

  picture {
    aspect-ratio: 1/1;
    border-radius: 50%;
    width: 100%;
    max-width: 42px;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}

ul.feed-dapp-cards {
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-l);
  position: relative;
}
</style>
