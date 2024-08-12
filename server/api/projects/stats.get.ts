import { PROJECTS } from "@api3-ecosystem/dapp-registry";
import type { ProjectType } from "~/server/types";

interface Stats {
  chains: { chainId: string; count: number }[];
  categories: { name: string; count: number }[];
  productTypes: { name: string; count: number }[];
  years: { name: number; count: number }[];
  feeds: Array<any>;
}

function computeStats(projects: ProjectType[]): Stats {
  const chainCount: Record<string, number> = {};
  const categoryCount: Record<string, number> = {};
  const productTypeCount: Record<string, number> = {};
  const yearCount: Record<number, number> = {};

  projects.forEach((project) => {
    // Count chains
    project.chains.forEach((chain) => {
      chainCount[chain] = (chainCount[chain] || 0) + 1;
    });

    // Count categories
    project.categories.forEach((category) => {
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    // Count product types
    const productType = project.productType;
    productTypeCount[productType] = (productTypeCount[productType] || 0) + 1;

    // Count years
    const year = project.year;
    yearCount[year] = (yearCount[year] || 0) + 1;
  });

  const chains = Object.keys(chainCount).map((chainId) => ({
    chainId,
    count: chainCount[chainId],
  }));

  const categories = Object.keys(categoryCount).map((name) => ({
    name,
    count: categoryCount[name],
  }));

  const productTypes = Object.keys(productTypeCount).map((name) => ({
    name,
    count: productTypeCount[name],
  }));

  const years = Object.keys(yearCount).map((name: any) => ({
    name: parseInt(name),
    count: yearCount[name],
  }));

  // prepare feed stats
  const allProjects: ProjectType[] = PROJECTS;

  // get preare a list with feedNames as keys and list of chainIds as values
  const feedStats: any[] = [];
  allProjects.forEach((project: any) => {
    if (!project.proxies) {
      return;
    }
    const chainIds = Object.keys(project.proxies);

    chainIds.forEach((chainId) => {
      const proxies = project.proxies[chainId];

      proxies.forEach((proxy: any) => {
        const existingFeedStat = feedStats.find(
          (feedStat) => feedStat.feedName === proxy.feedName
        );
        if (existingFeedStat) {
          if (!existingFeedStat.chainIds.includes(chainId)) {
            existingFeedStat.chainIds.push(chainId);
          }
        } else {
          feedStats.push({
            feedName: proxy.feedName,
            chainIds: [chainId],
          });
        }
      });
    });
  });

  return { chains, categories, productTypes, years, feeds: feedStats };
}

export default checkConnection(
  defineEventHandler(async (event) => {
    try {
      const stats = computeStats(PROJECTS);
      event.node.res.statusCode = 200;
      return stats;
    } catch (err) {
      console.log("get stats error ", err);
      event.node.res.statusCode = 500;
      return {
        code: "ERROR",
        message: "Something went wrong.",
      };
    }
  })
);
