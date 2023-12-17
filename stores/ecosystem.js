import { defineStore } from "pinia";
import { useFetch } from "nuxt/app";
import { CHAINS } from "@api3/chains";
import { watchDebounced } from "@vueuse/core";

export const useEcosystemStore = defineStore("ecosystem", () => {
  // store states
  const baseServerUrl = ref("/api/projects/");
  const filterQuery = ref({
    searchKey: "",
    chains: {},
    categories: {},
    productTypes: {},
    years: {},
    page: 1,
  });
  const hasMoreItems = ref(true);
  const projectList = ref([]);
  const totalProjects = ref(0);

  const serverURL = computed(() => {
    let url = baseServerUrl.value + `?page=${filterQuery.value.page}`;

    const chainsString = Object.keys(filterQuery.value.chains)
      .filter((key) => filterQuery.value.chains[key])
      .join(",");

    const categoriesString = Object.keys(filterQuery.value.categories)
      .filter((key) => filterQuery.value.categories[key])
      .join(",");

    const productTypesString = Object.keys(filterQuery.value.productTypes)
      .filter((key) => filterQuery.value.productTypes[key])
      .join(",");

    const yearsString = Object.keys(filterQuery.value.years)
      .filter((key) => filterQuery.value.years[key])
      .join(",");

    url += filterQuery.value.searchKey
      ? `&search=${filterQuery.value.searchKey}`
      : "";

    url += chainsString ? `&chains=${chainsString}` : "";
    url += categoriesString ? `&categories=${categoriesString}` : "";
    url += productTypesString ? `&productTypes=${productTypesString}` : "";
    url += yearsString ? `&years=${yearsString}` : "";

    return url;
  });

  const debouncedSearchQuery = serverURL;

  watchDebounced(
    serverURL,
    () => {
      debouncedSearchQuery.value = serverURL.value;
    },
    { debounce: 500, maxWait: 1000 }
  );

  const { data, error: listError } = useFetch(
    () => debouncedSearchQuery.value,
    {
      // key: `ecosystem-list-${filterQuery.value.page}`,
      onRequestError({ request, options, error }) {
        console.log("fetch test error", error);
      },
      onRequest({ request, options }) {
        console.log("fetch test request");
      },
    }
  );

  watch([filterQuery, data], ([newQuery, newData], [oldQuery, prevData]) => {
    if (!newData) return;

    totalProjects.value = newData.total;
    if (newQuery.page === 1) {
      projectList.value = newData.projects;
    } else {
      projectList.value = [...projectList.value, ...newData.projects];
    }

    if (
      newData.projects?.length < 10 ||
      newData.projects?.length === totalProjects.value
    ) {
      hasMoreItems.value = false;
    } else {
      hasMoreItems.value = true;
    }
  });

  const isFilterApplied = computed(() => {
    return (
      Object.keys(filterQuery.value.chains).some(
        (key) => filterQuery.value.chains[key]
      ) ||
      Object.keys(filterQuery.value.categories).some(
        (key) => filterQuery.value.categories[key]
      ) ||
      Object.keys(filterQuery.value.productTypes).some(
        (key) => filterQuery.value.productTypes[key]
      ) ||
      Object.keys(filterQuery.value.years).some(
        (key) => filterQuery.value.years[key]
      ) ||
      filterQuery.value.searchKey
    );
  });

  //stats
  const { data: stats, error: statsError } = useFetch("/api/projects/stats/");

  //   helpers
  const productTypeToLabel = {
    qrng: "QRNG",
    datafeed: "Data Feed",
  };

  const categoryToLabel = {
    defi: "DeFi",
    dex: "Dex",
    nft: "NFT",
    gaming: "Gaming",
    dao: "DAO",
    oracle: "Oracle",
    wallet: "Wallet",
    infrastructure: "Infrastructure",
    other: "Other",
  };

  const categoryOptions = Object.keys(categoryToLabel).map((key) => {
    return {
      label: categoryToLabel[key],
      value: key,
    };
  });
  const productTypeOptions = Object.keys(productTypeToLabel).map((key) => {
    return {
      label: productTypeToLabel[key],
      value: key,
    };
  });

  const mainnetChains = CHAINS.filter((chain) => {
    if (!chain?.name?.toLocaleLowerCase().includes("testnet")) {
      return chain;
    }
  });

  const chainOptions = mainnetChains?.map((chain) => {
    return {
      label: chain.name,
      value: chain.id,
    };
  });

  // chain id to chain name mapping
  const chainNames = (chainId) => {
    const chain = CHAINS.find((chain) => chain.id == chainId);
    return chain ? chain.name : chainId;
  };

  function clearFilters() {
    filterQuery.value = {
      searchKey: "",
      chains: {},
      categories: {},
      productTypes: {},
      years: {},
      page: 1,
    };
  }

  return {
    list: projectList,
    totalProjects,
    stats,
    categoryOptions,
    productTypeOptions,
    hasMoreItems: hasMoreItems,
    chainOptions,
    categoryToLabel,
    productTypeToLabel,
    filterQuery,
    chainNames,
    clearFilters,
    isFilterApplied,
  };
});
