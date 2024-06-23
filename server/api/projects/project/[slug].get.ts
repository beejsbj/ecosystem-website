import { PROJECTS } from "@api3-ecosystem/dapp-registry";
import slug from "slug";

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

    const project = PROJECTS.find((project) => {
      return slug(project.name) === projectSlug;
    });

    if (!project) {
      event.node.res.statusCode = 404;
      return {
        code: "PROJECT_NOT_FOUND",
        message: `Project not found `,
      };
    }

    return { ...project, slug: projectSlug };
  } catch (err) {
    console.dir("get project error ", err);
    event.node.res.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
