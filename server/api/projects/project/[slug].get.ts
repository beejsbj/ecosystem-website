import { Project } from "~/server/models/Project";

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
