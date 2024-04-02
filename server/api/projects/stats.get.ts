import { Project } from "~/server/models/Project";
import { cacheInterval, queryCache } from "~/server/services/cache";

export default defineEventHandler(async (event) => {
  try {
    const cacheKey = "stats";
    const cachedData: any = queryCache.get(cacheKey);

    if (cachedData !== undefined) {
      console.log("getting from cache");

      event.node.res.statusCode = 200;
      return JSON.parse(cachedData);
    }

    const stats = await Project.aggregate([
      {
        $match: {
          status: "active",
        },
      },
      {
        $facet: {
          chains: [
            { $unwind: "$chains" },
            {
              $group: {
                _id: "$chains",
                count: { $sum: 1 },
              },
            },
          ],
          categories: [
            { $unwind: "$categories" },
            {
              $group: {
                _id: "$categories",
                count: { $sum: 1 },
              },
            },
          ],
          productTypes: [
            { $unwind: "$productType" },
            {
              $group: {
                _id: "$productType",
                count: { $sum: 1 },
              },
            },
          ],
          years: [
            { $unwind: "$year" },
            {
              $group: {
                _id: "$year",
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    const statsObject = stats?.[0];

    if (!statsObject) {
      event.node.res.statusCode = 400;
      return {
        code: "REQ_FAILED",
        message: "Failed to fetch stats",
      };
    }
    const chains = statsObject?.chains?.map((el: any) => {
      return {
        chainId: el?._id,
        count: el?.count,
      };
    });
    const categories = statsObject.categories.map((el: any) => {
      return {
        name: el?._id,
        count: el?.count,
      };
    });
    const productTypes = statsObject.productTypes.map((el: any) => {
      return {
        name: el?._id,
        count: el?.count,
      };
    });
    const years = statsObject.years.map((el: any) => {
      return {
        name: el?._id,
        count: el?.count,
      };
    });

    // prepare feed stats
    const allProjects = await Project.find({ status: "active" });

    // get preare a list with feedNames as keys and list of chainIds as values
    const feedStats: any[] = [];
    allProjects.forEach((project) => {
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

    const finalPayload = {
      chains,
      categories,
      productTypes,
      years,
      feeds: feedStats,
    };
    // cache result
    queryCache.set(cacheKey, JSON.stringify(finalPayload), cacheInterval);

    event.node.res.statusCode = 200;
    return finalPayload;
  } catch (err) {
    console.log(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
