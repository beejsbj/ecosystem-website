<script setup>
definePageMeta({
  title: "OEV",
  layout: "footer-less",
  description:
    "The OEV Watchtower helps you understand the impact of the OEV Network on your protocol.",

  alias: ["/watchtower", "/oev-watchtower"],
});

const { data: overview } = await useFetch("/api/oev", {
  default: () => [],
});

const protocols = computed(() =>
  (overview.value || []).filter((protocol) => protocol.slug !== "total")
);

const total = computed(() =>
  (overview.value || []).find((protocol) => protocol.slug === "total")
);

const formatUsd = (value = 0) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
</script>

<template>
  <ContentsWrapper>
    <SectionColumn class="oev-showcase">
      <text-content>
        <h1 class="loud-voice">OEV Watchtower</h1>
        <p class="notice-voice">
          Deterministic showcase data for exploring how protocols can reason
          about OEV capture without live indexing jobs, MongoDB, or service
          webhooks.
        </p>
      </text-content>

      <ul class="summary-list" v-if="total">
        <li>
          <span class="whisper-voice">Liquidated collateral</span>
          <strong class="attention-voice">
            {{ formatUsd(total.totalLiquidated) }}
          </strong>
        </li>
        <li>
          <span class="whisper-voice">OEV opportunity</span>
          <strong class="attention-voice">
            {{ formatUsd(total.totalOevLostUSD) }}
          </strong>
        </li>
        <li>
          <span class="whisper-voice">Builder share</span>
          <strong class="attention-voice">
            {{ formatUsd(total.totalSentToBuilderUSD) }}
          </strong>
        </li>
      </ul>

      <div class="protocol-grid">
        <article
          v-for="protocol in protocols"
          :key="protocol.slug"
          class="protocol-card"
        >
          <div>
            <p class="whisper-voice">{{ getChainName(protocol.chainId) }}</p>
            <h2 class="solid-voice">{{ protocol.name }}</h2>
          </div>
          <dl>
            <div>
              <dt>Liquidated</dt>
              <dd>{{ formatUsd(protocol.totalLiquidated) }}</dd>
            </div>
            <div>
              <dt>OEV opportunity</dt>
              <dd>{{ formatUsd(protocol.totalOevLostUSD) }}</dd>
            </div>
          </dl>
        </article>
      </div>
    </SectionColumn>
  </ContentsWrapper>
</template>

<style scoped lang="scss">
.oev-showcase {
  :deep(inner-column) {
    display: grid;
    gap: var(--space-xl);
  }
}

.summary-list,
.protocol-grid {
  display: grid;
  gap: var(--space-s);
}

.summary-list {
  list-style: none;
  padding: 0;

  @media (min-width: 760px) {
    grid-template-columns: repeat(3, 1fr);
  }

  li {
    border: 1px solid var(--gray-dark);
    border-radius: var(--corners);
    background: var(--gray-darkest);
    padding: var(--space-m);
    display: grid;
    gap: var(--space-xs);
  }
}

.protocol-grid {
  @media (min-width: 760px) {
    grid-template-columns: repeat(2, 1fr);
  }
}

.protocol-card {
  border: 1px solid var(--gray-dark);
  border-radius: var(--corners);
  background: color-mix(in srgb, var(--gray-darkest), transparent 15%);
  padding: var(--space-m);
  display: grid;
  gap: var(--space-m);

  dl {
    display: grid;
    gap: var(--space-xs);
    margin: 0;
  }

  div {
    display: grid;
    gap: var(--space-3xs);
  }

  dt {
    color: var(--gray);
    font-size: var(--step--1);
  }

  dd {
    margin: 0;
  }
}
</style>
