<script setup>
/**
 * DappFilter Component
 * 
 * A comprehensive filter component for the dApp ecosystem, allowing users to filter dApps by various criteria.
 *
 * @component
 *
 * @example
 * <DappFilter />
 *
 * @features
 * - Search functionality for dApps
 * - Filters for networks (chains), product types, categories, and years
 * - Expandable filter sections with show more/less functionality
 * - Responsive design with mobile-specific actions
 * - Integration with ecosystem store for state management
 * - Skeleton loading states for better UX
 *
 * @computed
 * - chains, categories, productTypes, years: Processed filter options from ecosystem stats
 *
 * @methods
 * - handleFilter: Updates the filter query and resets pagination
 *
 * @dependencies
 * - useEcosystemStore, useInterfaceStore: For state management
 * - getChainName: Utility function for chain name resolution
 * - FormKit: For form inputs
 * - ChainIcon, DynamicIcon: For visual representations
 * - FilterButtons, SkeletonListItem: Custom components for UI elements
 *
 * @notes
 * - The component is tightly coupled with the ecosystem and interface stores
 * - Mobile version includes apply and cancel buttons in a modal context
 * - Utilizes v-auto-animate for smooth transitions when showing/hiding elements
 */


import { useEcosystemStore } from "~/stores/ecosystem";
import { getChainName } from "~/utils/getChainName";

const ecosystem = useEcosystemStore();
const ui = useInterfaceStore();

const showAll = ref({
  chains: false,
  categories: false,
  productTypes: false,
  years: false,
});

const defaultPillCount = 5;

const chains = computed(() => {
  const chains = ecosystem.stats?.chains?.map((chain) => {
    return {
      label: getChainName(chain.chainId),
      value: chain.chainId,
    };
  });
  return chains;
});

const categories = computed(() => {
  if (ecosystem.stats) {
    return [...ecosystem.stats.categories];
  }
});

const productTypes = computed(() => {
  if (ecosystem.stats) {
    return [...ecosystem.stats.productTypes];
  }
});

const years = computed(() => {
  if (ecosystem.stats) {
    return [...ecosystem.stats.years];
  }
});


const handleFilter = (event) => {
  ecosystem.filterQuery.page = 1;
};
</script>

<template>
  <dapp-filter>
    <!-- search bar -->
    <header>
      <FilterButtons />
      <search-bar>
        <FormKit
          type="search"
          placeholder="Search"
          v-model="ecosystem.filterQuery.searchKey"
        />
      </search-bar>
    </header>

    <!-- chain filter -->
    <div class="chain filter">
      <div class="filter-header">
        <h4 class="calm-voice">Network</h4>
        <button
          class="icon"
          @click="showAll.chains = !showAll.chains"
          v-if="ecosystem.stats?.chains?.length > defaultPillCount"
        >
          <DynamicIcon
            :icon="showAll.chains ? 'caret-up' : 'caret-down'"
            width="32px"
          />
        </button>
      </div>
      <ul class="pills" v-auto-animate>
        <template
          v-if="ui.loadingDone && chains"
          v-for="(chain, index) in chains"
        >
          <li
            class="pill"
            :key="chain.value"
            v-if="index < defaultPillCount || showAll.chains"
          >
            <FormKit
              type="checkbox"
              name="chains"
              :label="chain.label"
              label-class="$reset whisper-voice"
              prefix-icon="ethereum"
              :value="chain.value"
              v-model="ecosystem.filterQuery.chains[chain.value]"
              @change="handleFilter"
              v-auto-animate
            >
              <template #label="context">
                <div class="icon-option">
                  <ChainIcon :id="chain.value" />
                  <span class="whisper-voice">
                    {{ context.label }}
                  </span>
                </div>
              </template>
            </FormKit>
          </li>
        </template>
        <SkeletonListItem v-else v-for="i in 5" />
      </ul>
    </div>

    <!-- product type -->
    <div class="productType filter">
      <div class="filter-header">
        <h4 class="calm-voice">Product</h4>

        <button
          class="icon"
          @click="showAll.productTypes = !showAll.productTypes"
          v-if="productTypes?.length > defaultPillCount"
        >
          <DynamicIcon
            :icon="showAll.productTypes ? 'caret-up' : 'caret-down'"
            width="32px"
          />
        </button>
      </div>
      <ul class="pills" v-auto-animate>
        <template
          v-if="ui.loadingDone && productTypes"
          v-for="(productType, index) in productTypes"
        >
          <li
            class="pill"
            :key="productType.name"
            v-if="index < defaultPillCount || showAll.productTypes"
          >
            <FormKit
              type="checkbox"
              name="productTypes"
              :label="ecosystem?.productTypeToLabel?.[productType.name]"
              label-class="$reset whisper-voice"
              :value="productType.name"
              v-model="ecosystem.filterQuery.productTypes[productType.name]"
              @change="handleFilter"
              v-auto-animate
            >
              <template #label="context">
                <div class="icon-option">
                  <DynamicIcon :icon="productType.name" />
                  <span class="whisper-voice">
                    {{ context.label }}
                  </span>
                </div>
              </template>
            </FormKit>
          </li>
        </template>
        <SkeletonListItem v-else v-for="i in 5" />
      </ul>
    </div>

    <!-- category filter -->
    <div class="category filter">
      <div class="filter-header">
        <h4 class="calm-voice">Category</h4>

        <button
          class="icon"
          @click="showAll.categories = !showAll.categories"
          v-if="categories?.length > defaultPillCount"
        >
          <DynamicIcon
            :icon="showAll.categories ? 'caret-up' : 'caret-down'"
            width="32px"
          />
        </button>
      </div>

      <ul class="pills" v-auto-animate>
        <template
          v-if="ui.loadingDone && categories"
          v-for="(category, index) in categories"
        >
          <li
            class="pill"
            :key="category.name"
            v-if="index < defaultPillCount || showAll.categories"
          >
            <FormKit
              type="checkbox"
              name="categories"
              :label="ecosystem?.categoryToLabel?.[category.name]"
              label-class="$reset whisper-voice"
              :value="category.name"
              v-model="ecosystem.filterQuery.categories[category.name]"
              @change="handleFilter"
              v-auto-animate
            >
     
            </FormKit>
          </li>
        </template>
        <SkeletonListItem v-else v-for="i in 5" />
      </ul>
    </div>

    <!-- year filter -->
    <div class="year filter">
      <div class="filter-header">
        <h4 class="calm-voice">Year</h4>
        <button
          class="icon"
          @click="showAll.years = !showAll.years"
          v-if="years?.length > defaultPillCount"
        >
          <DynamicIcon
            :icon="showAll.years ? 'caret-up' : 'caret-down'"
            width="32px"
          />
        </button>
      </div>
      <ul class="pills" v-auto-animate>
        <template v-if="ui.loadingDone && years" v-for="(year, index) in years">
          <li
            class="pill"
            :key="year.name"
            v-if="index < defaultPillCount || showAll.years"
          >
            <FormKit
              type="checkbox"
              name="years"
              :label="year.name"
              label-class="$reset whisper-voice"
              :value="year.name"
              v-model="ecosystem.filterQuery.years[year.name]"
              @change="handleFilter"
              v-auto-animate
            />
          </li>
        </template>
        <SkeletonListItem v-else v-for="i in 5" />
      </ul>
    </div>

    <div class="actions" v-if="ui.isMobile">
      <button class="button" @click="ui.toggleModal">Apply</button>
      <button class="button outline" @click="ui.toggleModal">Cancel</button>
    </div>
  </dapp-filter>
</template>

<style lang="scss" scoped>
dapp-filter {
  display: grid;
  grid-template-columns: 1fr;
  position: sticky;
  top: 2rem;

  border-right: var(--line-width) solid var(--gray-darker);

  padding-bottom: var(--space-l);

  max-height: 100vh;
  overflow-y: auto;

  header {
    display: grid;
    gap: var(--space-m);
    padding: var(--space-s);

    text-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  & > div.actions {
    padding: var(--space-xl) var(--space-s);
    justify-content: space-between;
  }
}

.filter {
  display: grid;
  gap: var(--space-xs);
  padding: var(--space-2xs) var(--space-m);

  .filter-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-2xs);

    border-top: var(--border-dark);
  }

  .pills {
    display: flex;
    flex-direction: column;
    gap: var(--space-s);

    padding: 0 var(--space-m);
  }
}

button.icon.caret {
  max-width: var(--space-l);
}

.icon-option {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
