import axios from "axios";
import { parseMarkdown } from "@/utils/parseMarkdown";
import { cacheInterval, queryCache } from "~/server/services/cache";

export default defineEventHandler(async (event) => {
  try {
    const repoOwner = "api3-ecosystem";
    const repoName = "ecosystem-markdown-articles";
    const fileListEndpoint = `https://api.github.com/repos/${repoOwner}/${repoName}/contents`;

    const { page }: any = getQuery(event);

    const _page = page || 1;

    const limit = _page * 10;
    const skips = (_page - 1) * 10;

    let articleListData: any[] | undefined = queryCache.get("article-list");

    if (articleListData === undefined) {
      const data: any = await axios.get(fileListEndpoint);
      const repoItems: any[] = await data.data;
      const articleFolders = repoItems?.filter((el) => el?.type === "dir");

      articleListData = [];

      // Batch processing
      const batchSize = 20;
      for (let i = 0; i < articleFolders.length; i += batchSize) {
        const batch = articleFolders.slice(i, i + batchSize);
        const batchPromises = batch.map(async (folder) => {
          const downloadUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/master/${folder?.path}/index.md`;
          const articleMd = (await axios.get(downloadUrl)).data;
          const parsedMd = await parseMarkdown({ content: articleMd });

          return {
            author: {
              name: parsedMd?.author,
              bio: parsedMd?.bio,
            },
            title: parsedMd?.title,
            slug: folder?.path,
            subtitle: parsedMd?.subtitle,
            description: parsedMd?.description,
            cover: parsedMd?.image,
            category: parsedMd?.category,
            created_at: parsedMd?.date_published,
          };
        });

        const batchResults = await Promise.all(batchPromises);
        articleListData.push(...batchResults);
      }

      queryCache.set("article-list", articleListData, cacheInterval);
    }

    const total = articleListData?.length;

    event.node.req.statusCode = 200;
    return { articles: articleListData?.slice(skips, limit), total };
  } catch (err: any) {
    console.log("fetch articles error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
