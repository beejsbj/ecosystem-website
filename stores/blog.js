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
      console.log("fetch articles");
    },
  });

  console.log("blog data  ", data);

  watch([filterQuery, data], ([newQuery, newData], [oldQuery, prevData]) => {
    console.log("blog store ", { newQuery, newData });
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
