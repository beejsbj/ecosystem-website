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

    const cacheKey = `project-${projectSlug}`;
    const cachedProject: string | undefined = queryCache.get(cacheKey);
    let project;
    if (cachedProject === undefined) {
      project = await Project.findOne({
        slug: projectSlug,
        status: "active",
      });
      queryCache.set(cacheKey, JSON.stringify(project), cacheInterval);
    } else {
      project = JSON.parse(cachedProject);
    }

    if (!project) {
      event.node.res.statusCode = 404;
      return {
        code: "PROJECT_NOT_FOUND",
        message: `Project not found `,
      };
    }

    return project;
  } catch (err) {
    console.dir("get project error ", err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
