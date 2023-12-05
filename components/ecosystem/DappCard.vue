<script setup>
import { useEcosystemStore } from "@/stores/ecosystem";
import slug from "slug";

const props = defineProps(["dapp"]);
const ecosystem = useEcosystemStore();

function filterBy(event) {
  if (event.target.classList.contains("category")) {
    console.log("category");
    ecosystem.filterQuery.categories[event.target.dataset.category] =
      !ecosystem.filterQuery.categories[event.target.dataset.category];
  }

  if (event.target.closest("li.chain")) {
    console.log("chain");
    ecosystem.filterQuery.chains[event.target.closest("li").dataset.chain] =
      !ecosystem.filterQuery.chains[event.target.closest("li").dataset.chain];
  }

  if (event.target.closest("div.productType")) {
    console.log("productType");
    ecosystem.filterQuery.productTypes[
      event.target.closest("div.productType").dataset.producttype
    ] =
      !ecosystem.filterQuery.productTypes[
        event.target.closest("div.productType").dataset.producttype
      ];
  }
}
</script>

<template>
  <dapp-card class="list-move">
    <header>
      <ul class="chain-list">
        <li
          class="chain"
          v-for="chain in dapp?.chains"
          :data-chain="chain"
          @click="filterBy"
        >
          <ChainIcon
            :chain="ecosystem.chainNames(chain)"
            fill="none"
            stroke="var(--green)"
          />
        </li>
      </ul>

      <div class="productType" :data-productType="dapp?.productType">
        <DynamicIcon :icon="dapp?.productType" @click="filterBy" />
      </div>
    </header>

    <text-content>
      <picture class="logo">
        <NuxtImg
          loading="lazy"
          :src="dapp?.images?.logo"
          src="/images/square.jpg"
          :alt="`Logo of ${dapp?.name}`"
        />
      </picture>
      <h2
        :class="dapp?.name.length <= 16 ? 'firm-voice' : 'firm-voice-smaller'"
      >
        {{ dapp?.name ?? "Dapp Name" }}
      </h2>

      <p class="whisper-voice">
        {{ dapp?.tagline ?? "This is the Dapp Tagline" }}
      </p>
    </text-content>

    <footer>
      <ul class="categories-list">
        <li
          class="micro-voice category"
          v-for="category in dapp?.categories ?? [1, 2]"
          @click="filterBy"
          :data-category="category"
        >
          {{ ecosystem?.categoryToLabel?.[category] ?? "Category" }}
          <!-- <DynamicIcon :icon="category" /> -->
        </li>
      </ul>
      <NuxtLink
        :to="`/ecosystem/${slug(dapp?.name ?? '#')}`"
        class="card-link"
      />
    </footer>
  </dapp-card>
</template>

<style lang="scss" scoped>
dapp-card {
  display: grid;
  grid-template-rows: 0.1fr 1fr 0.1fr;
  gap: var(--space-s);

  padding: var(--space-l);
  border-radius: var(--corners);
  background: var(--paper);
  border: var(--border-dark);
  min-height: 250px;

  position: relative;
  overflow: hidden;

  &:hover {
    background: var(--gradient-radial-green-hover);
  }

  header {
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 0.1fr;
    //  z-index: 2;

    .chain-list {
      display: flex;
      flex-wrap: wrap;
      gap: var(--space-2xs);
    }

    picture.chain-icon {
      width: 20px;
    }

    .productType {
      display: flex;
      justify-content: flex-end;
    }
  }

  text-content {
    display: grid;
    column-gap: var(--space-2xs);

    grid-template-columns: 0.1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;

    picture.logo {
      max-width: 40px;
      border-radius: 50%;
    }

    h2 {
      text-wrap: balance;
      // z-index: 2;
    }

    p {
      grid-column: 1/-1;
    }
  }
  footer {
    display: grid;
    gap: var(--space-2xs);
    .card-link {
      content: "";
      padding-left: 0;
      position: absolute;
      inset: 0;
      z-index: 1;
      cursor: pointer;
    }

    ul {
      display: flex;
      gap: var(--space-2xs);
      justify-content: start;

      li {
        z-index: 2;

        display: flex;
        align-items: center;
        gap: var(--space-3xs);
        white-space: nowrap;
        padding: calc(var(--space-2xs) / 5) var(--space-2xs);

        border-radius: var(--corners);
        background: var(--gray-darker);

        :deep(picture) {
          max-width: var(--step-0);
        }
      }
    }
  }
}

.category,
.productType,
.chain {
  cursor: pointer;
}
:is(.category, .productType, .chain):hover {
  filter: brightness(1.2);
}
</style>
