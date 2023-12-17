<script setup>
import { useEcosystemStore } from "~/stores/ecosystem";
import { gsap } from "gsap";

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
      label: ecosystem.chainNames(chain.chainId),
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

onMounted(() => {
  const pageLoad = gsap.timeline();

  //   pageLoad.fromTo(
  //     "dapp-filter",
  //     {
  //       delay: "0.5",
  //       y: "10vw",
  //       opacity: 0,
  //       duration: 0,
  //     },
  //     {
  //       y: "0vw",
  //       opacity: 1,
  //       duration: 0.5,
  //       stagger: {
  //         each: 0.15,
  //         from: "start",
  //       },
  //     }
  //   );
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
          prefix-icon="search"
        />
      </search-bar>
    </header>

    <!-- chain filter -->
    <div class="chain filter">
      <div class="filter-header">
        <h4 class="calm-voice">Network</h4>
        <button
          class="icon caret"
          @click="showAll.chains = !showAll.chains"
          v-if="ecosystem.stats?.chains?.length > defaultPillCount"
        >
          <img
            loading="lazy"
            class="caret"
            :class="{ down: showAll.chains }"
            src="@/assets/images/interface/caret.svg"
            alt="caret icon"
          />
        </button>
      </div>
      <ul class="pills" v-auto-animate>
        <template v-for="(chain, index) in chains">
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
            />
          </li>
        </template>
      </ul>
    </div>

    <!-- product type -->
    <div class="productType filter">
      <div class="filter-header">
        <h4 class="calm-voice">Product</h4>

        <button
          class="icon caret"
          @click="showAll.productTypes = !showAll.productTypes"
          v-if="productTypes?.length > defaultPillCount"
        >
          <img
            loading="lazy"
            class="caret"
            :class="{ down: showAll.productTypes }"
            src="@/assets/images/interface/caret.svg"
            alt="caret icon"
          />
        </button>
      </div>
      <ul class="pills" v-auto-animate>
        <template v-for="(productType, index) in productTypes">
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
            />
          </li>
        </template>
      </ul>
    </div>

    <!-- category filter -->
    <div class="category filter">
      <div class="filter-header">
        <h4 class="calm-voice">Category</h4>

        <button
          class="icon caret"
          @click="showAll.categories = !showAll.categories"
          v-if="categories?.length > defaultPillCount"
        >
          <img
            loading="lazy"
            class="caret"
            :class="{ down: showAll.categories }"
            src="@/assets/images/interface/caret.svg"
            alt="caret icon"
          />
        </button>
      </div>

      <ul class="pills" v-auto-animate>
        <template v-for="(category, index) in categories">
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
            />
          </li>
        </template>
      </ul>
    </div>

    <!-- year filter -->
    <div class="year filter">
      <div class="filter-header">
        <h4 class="calm-voice">Year</h4>
        <button
          class="icon caret"
          @click="showAll.years = !showAll.years"
          v-if="years?.length > defaultPillCount"
        >
          <img
            loading="lazy"
            class="caret"
            :class="{ down: showAll.years }"
            src="@/assets/images/interface/caret.svg"
            alt="caret icon"
          />
        </button>
      </div>
      <ul class="pills" v-auto-animate>
        <template v-for="(year, index) in years">
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
    search-bar {
    }
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
    gap: calc((var(--space-s) + var(--space-m)) / 2);

    //  gap: calc(var(--space-m));
    padding: 0 var(--space-m);
  }
}

button.icon.caret {
  max-width: var(--space-l);
}
</style>
