import { Project } from "~/server/models/Project";
import { cacheInterval, queryCache } from "~/server/services/cache";

export default defineEventHandler(async (event) => {
  const projectSlug = event.context?.params?.slug;

  try {
    if (!projectSlug) {
      event.node.res.statusCode = 400;
      return {
        code: "INVALID_ID",
        message: "Invalid project name slug",
      };
    }

    const cacheKey = "project-" + projectSlug + "-details";
    const cachedData: any = queryCache.get(cacheKey);

    if (cachedData !== undefined) {
      console.log("getting from cache");

      event.node.res.statusCode = 200;
      return JSON.parse(cachedData);
    }

    const project = await Project.findOne({
      slug: projectSlug,
      status: "active",
    });

    if (!project) {
      event.node.res.statusCode = 404;
      return {
        code: "PROJECT_NOT_FOUND",
        message: `Project not found `,
      };
    }

    // cache result with new queries
    queryCache.set(cacheKey, JSON.stringify(project), cacheInterval);

    return project;
  } catch (err) {
    console.dir(err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
