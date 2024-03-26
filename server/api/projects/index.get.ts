import { isNumber } from "../../services/helper";
import { Project } from "~/server/models/Project";
import { cacheInterval, queryCache } from "~/server/services/cache";

export default defineEventHandler(async (event) => {
  try {
    const {
      page,
      searchKey,
      categories,
      chains,
      productTypes,
      years,
      ticker,
      orderBy,
      orderDirection,
    }: any = getQuery(event);

    const _page = page || 1;

    const limit = _page * 10;
    const skips = (_page - 1) * 10;

    // input text key will seach in
    // key string in
    // . name
    //.  key text includes in any category
    // . key inludes in any chain name
    // . key includes in any product types
    // . key name includes in any year string
    // .

    // +and+

    // option selection search in :
    // . filter by project categories in
    // . filter by project chains in
    // . filter by product types in
    // . filter by years in

    // +and+

    // order by keys
    // name
    // release date

    let searchFilters: any = {};
    let selectionFilters: any = {};

    // search key query:
    if (searchKey) {
      const searchFields: Array<any> = [
        { name: { $regex: searchKey, $options: "i" } },
        {
          chains: { $regex: searchKey, $options: "i" },
        },
        { categories: { $regex: searchKey, $options: "i" } },
        { productType: { $regex: searchKey, $options: "i" } },
      ];

      if (isNumber(searchKey)) {
        searchFields.push({
          year: parseInt(searchKey),
        });
      }

      searchFilters = {
        $or: searchFields,
      };
    }

    selectionFilters.status = "active";

    if (categories?.split(",")?.length > 0) {
      const categoriesArray = categories?.split(",");
      selectionFilters.categories = { $in: categoriesArray };
    }

    // filter all selected product types
    if (productTypes?.split(",")?.length > 0) {
      const productTypesArray = productTypes?.split(",");
      selectionFilters.productType = { $in: productTypesArray };
    }

    // filter all selected years
    if (years?.split(",")?.length > 0) {
      const yearsArray = years?.split(",")?.map((ele: string) => parseInt(ele));
      selectionFilters.year = { $in: yearsArray };
    }

    if (chains?.split(",")?.length > 0) {
      const chainsArray = chains
        ?.split(",")
        ?.map((ele: string) => parseInt(ele));
      selectionFilters.chains = { $in: chainsArray };
    }

    const finalFilter = { $and: [searchFilters, selectionFilters] };

    let cacheKey = `${JSON.stringify(finalFilter)}-${limit}-${skips}`;
    if (ticker !== undefined) {
      cacheKey = `${cacheKey}-${ticker}`;
    }

    const cachedData: any = queryCache.get(cacheKey);

    if (cachedData !== undefined) {
      console.log("getting from cache");
      return JSON.parse(cachedData);
    }

    let projects = await Project.find(finalFilter).sort({ year: -1 });

    let filteredList: any[] = projects;

    // apply proxyAddress filter if any
    if (ticker !== undefined) {
      filteredList = projects?.filter((project: any) => {
        const proxies = project.proxies;
        if (!proxies) return false;
        const proxyKeys = Object.keys(proxies);
        for (let i = 0; i < proxyKeys.length; i++) {
          const chainId = proxyKeys[i];
          const proxyList = proxies[chainId];
          for (let j = 0; j < proxyList.length; j++) {
            const proxy = proxyList[j];

            if (proxy.feedName === ticker) {
              return true;
            }
          }
        }
        return false;
      });
    }
    const totalProjects = filteredList.length;

    const results = filteredList?.slice(skips, limit);

    // cache result with new queries
    queryCache.set(
      cacheKey,
      JSON.stringify({ projects: results, total: totalProjects }),
      cacheInterval
    );

    return { projects: results, total: totalProjects };
  } catch (err: any) {
    console.log("get projects error", err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
