import { isNumber } from "../../services/helper";
import { PROJECTS } from "@api3-ecosystem/dapp-registry";
import slug from "slug";
import type { ProjectType } from "~/server/types";

function isItemsIncludes<T>(array1: T[], array2: T[]): boolean {
  return array1.every((element) => array2.includes(element));
}

function applySearchFilter(
  jsonList: ProjectType[],
  searchKey?: string
): ProjectType[] {
  if (!searchKey) {
    return jsonList;
  }

  const searchFields: ((item: ProjectType) => boolean)[] = [
    (item) => new RegExp(searchKey, "i").test(item.name),
    (item) =>
      item.chains.some((chain) => new RegExp(searchKey, "i").test(chain)),
    (item) =>
      item.categories.some((category) =>
        new RegExp(searchKey, "i").test(category)
      ),
    (item) => new RegExp(searchKey, "i").test(item.productType),
  ];

  if (isNumber(searchKey)) {
    searchFields.push((item) => item.year === parseInt(searchKey));
  }

  const filteredList = jsonList.filter((item) =>
    searchFields.some((filter) => filter(item))
  );

  return filteredList;
}

function applyFilters(
  jsonList: ProjectType[],
  categories?: string,
  productTypes?: string,
  years?: string,
  chains?: string
): ProjectType[] {
  let searchFilters: ((item: ProjectType) => boolean)[] = [];
  let selectionFilters: {
    [key: string]: ((item: ProjectType) => boolean) | string;
  } = { status: "active" };

  if (categories && categories?.split(",")?.length > 0) {
    const categoriesArray = categories
      .split(",")
      ?.map((el) => el?.toLowerCase());
    selectionFilters.categories = (item) =>
      isItemsIncludes(categoriesArray, item?.categories);
  }

  if (productTypes && productTypes?.split(",")?.length > 0) {
    const productTypesArray = productTypes.split(",");
    selectionFilters.productType = (item) =>
      isItemsIncludes([item?.productType], productTypesArray);
  }

  if (years && years?.split(",")?.length > 0) {
    const yearsArray = years.split(",").map((ele) => ele);
    selectionFilters.year = (item) =>
      isItemsIncludes([item.year?.toString()], yearsArray);
  }

  if (chains && chains?.split(",")?.length > 0) {
    const chainsArray = chains.split(",").map((ele) => ele);

    selectionFilters.chains = (item) =>
      isItemsIncludes(chainsArray, item.chains);
  }

  const combinedFilters = (item: any): boolean => {
    const searchFilterPass =
      searchFilters.length === 0 ||
      searchFilters.some((filter) => filter(item));
    const selectionFilterPass = Object.keys(selectionFilters).every((key) =>
      typeof selectionFilters[key] === "function"
        ? (selectionFilters[key] as (item: any) => boolean)(item)
        : item[key] === selectionFilters[key]
    );
    return searchFilterPass && selectionFilterPass;
  };

  return jsonList.filter(combinedFilters);
}

export default defineEventHandler(async (event) => {
  try {
    const {
      page,
      searchKey,
      categories,
      chains,
      productTypes,
      years,
      orderBy,
      orderDirection,
    }: any = getQuery(event);

    const _page = page || 1;

    const limit = _page * 10;
    const skips = (_page - 1) * 10;

    let projects = PROJECTS;

    if (searchKey) {
      projects = applySearchFilter(projects, searchKey);
    }
    projects = applyFilters(projects, categories, productTypes, years, chains);

    projects = projects.sort((a, b) => b.year - a.year);

    projects = projects.map((el) => {
      return { ...el, slug: slug(el.name) };
    });

    const filteredList = projects?.slice(skips, limit);

    return { projects: filteredList, total: projects.length };
  } catch (err: any) {
    console.log("get projects  error ", err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
