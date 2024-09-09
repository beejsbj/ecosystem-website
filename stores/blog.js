/**
 * Blog Store
 *
 * Manages the state and operations related to blog articles in the application.
 *
 * @store
 *
 * @example
 * // Usage in a component:
 * import { useBlogStore } from '@/stores/blog';
 *
 * const blogStore = useBlogStore();
 * const articles = computed(() => blogStore.list);
 *
 *
 * @features
 * - Fetches and stores blog articles with pagination
 * - Manages filter queries for article search and categorization
 * - Tracks total article count and whether more articles are available
 * - Automatically updates article list based on filter changes
 *
 * @state
 * - list: Array of fetched articles
 * - totalArticles: Total number of articles available
 * - hasMoreItems: Boolean indicating if more articles can be loaded
 * - filterQuery: Object containing current filter parameters
 *
 * @computed
 * - serverURL: Generates the API URL based on current filter query
 *
 * @dependencies
 * - pinia
 * - slug
 * - vue-router (for useRoute)
 * - nuxt/composition-api (for useFetch)
 *
 */

import { defineStore } from "pinia";
import slug from "slug";

export const useBlogStore = defineStore("blog", () => {
  const route = useRoute();

  //get articles, with dynamic pagination
  const baseServerUrl = ref("/api/articles/");
  const filterQuery = ref({
    searchKey: "",
    categories: [],
    authors: [],
    years: [],
    page: 1,
  });
  const hasMoreItems = ref(true);
  const articlesList = ref([]);
  const totalArticles = ref(0);

  const serverURL = computed(() => {
    let url = baseServerUrl.value + `?page=${filterQuery.value.page}`;

    return url;
  });

  const { data, error: listError } = useFetch(() => serverURL.value, {
    // key: `ecosystem-list-${filterQuery.value.page}`,
    onRequestError({ request, options, error }) {
      console.log("fetch articles error", error);
    },
    onRequest({ request, options }) {
      // console.log("fetch articles");
    },
  });

  watch([filterQuery, data], ([newQuery, newData], [oldQuery, prevData]) => {
    if (!newData) return;
    totalArticles.value = newData.total;
    if (newQuery.page === 1) {
      articlesList.value = newData.articles;
    } else {
      articlesList.value = [...articlesList.value, ...newData.articles];
    }

    if (
      newData.articles?.length < 10 ||
      newData.articles?.length === totalArticles.value
    ) {
      hasMoreItems.value = false;
    } else {
      hasMoreItems.value = true;
    }
  });

  return {
    list: articlesList,
    totalArticles,
    hasMoreItems: hasMoreItems,
    filterQuery,
  };
});
