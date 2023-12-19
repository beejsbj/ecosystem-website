import axios from "axios";
import { parseMarkdown } from "@/utils/parseMarkdown";
import { cacheInterval, queryCache } from "~/server/services/cache";

export default defineEventHandler(async (event) => {
  try {
    const repoOwner = "AamirAlam";
    const repoName = "ecosystem-articles";
    const fileListEndpoint = `https://api.github.com/repos/${repoOwner}/${repoName}/contents`;

    const { page }: any = getQuery(event);

    const _page = page || 1;

    const limit = _page * 10;
    const skips = (_page - 1) * 10;

    let articleListData: any[] | undefined = queryCache.get("article-list");

    if (articleListData === undefined) {
      const data: any = await axios.get(fileListEndpoint);
      const articleFolders: any[] = await data.data;

      articleListData = [];

      let i = 0;
      while (i < articleFolders?.length) {
        const downloadUrl = `https://raw.githubusercontent.com/AamirAlam/ecosystem-articles/master/${articleFolders[i]?.path}/index.md`;
        const articleMd = (await axios.get(downloadUrl)).data;
        const parsedMd = await parseMarkdown({ content: articleMd });

        articleListData.push({
          author: {
            name: parsedMd?.author,
            bio: parsedMd?.bio,
          },
          title: parsedMd?.title,
          slug: articleFolders[i]?.path,
          subtitle: parsedMd?.subtitle,
          description: parsedMd?.description,
          // content: parsedMd?.body,
          cover: parsedMd?.image,
          category: parsedMd?.category,
          created_at: parsedMd?.date_published,
        });
        i++;
      }

      queryCache.set("article-list", articleListData, cacheInterval);
    }

    const total = articleListData?.length;

    event.node.req.statusCode = 200;
    return { articles: articleListData?.slice(skips, limit), total };
  } catch (err: any) {
    console.log("get articles error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
