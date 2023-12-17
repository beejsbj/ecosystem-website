import { Project } from "~/server/models/Project";
import { imageUploadHandler } from "../../utils/imageUpload";
import { authenticated } from "../../utils/authenticated";
import { checkBuildStatus } from "~/server/services/build";
import { type ProjectType } from "~/server/types";
import slug from "slug";

export default authenticated(
  imageUploadHandler(
    defineEventHandler(async (event: any) => {
      try {
        const {
          name,
          tagline,
          categories,
          productType,
          description,
          chains,
          links,
          proxies,
          year,
        } = await (event.node?.req?.body || readBody(event));

        if (!event.node.req?.files?.logo?.[0]?.location) {
          event.node.res.statusCode = 400;
          return {
            code: "REQ_FAILED",
            message: "Failed to upload logo",
          };
        }
        if (!event.node.req?.files?.cover?.[0]?.location) {
          event.node.res.statusCode = 400;
          return {
            code: "REQ_FAILED",
            message: "Failed to upload cover image",
          };
        }

        const screenshots = [];
        if (event.node.req?.files?.screenshot1?.[0]?.location) {
          screenshots.push(event.node.req?.files?.screenshot1?.[0]?.location);
        }
        if (event.node.req?.files?.screenshot2?.[0]?.location) {
          screenshots.push(event.node.req?.files?.screenshot2?.[0]?.location);
        }
        if (event.node.req?.files?.screenshot3?.[0]?.location) {
          screenshots.push(event.node.req?.files?.screenshot3?.[0]?.location);
        }
        if (event.node.req?.files?.screenshot4?.[0]?.location) {
          screenshots.push(event.node.req?.files?.screenshot4?.[0]?.location);
        }

        if (screenshots.length < 2) {
          event.node.res.statusCode = 400;
          return {
            code: "REQ_FAILED",
            message: "Please upload atleast 2 screenshots",
          };
        }

        const uploadedImages = {
          logo: event.node.req?.files?.logo?.[0]?.location,
          cover: event.node.req?.files?.cover?.[0]?.location,
          screenshots: screenshots,
        };

        if (
          productType === "datafeed" &&
          Object.keys(JSON.parse(proxies)).length === 0
        ) {
          event.node.res.statusCode = 400;
          return {
            code: "REQ_FAILED",
            message: "Please add valid proxy information!",
          };
        }

        const payload: ProjectType =
          productType === "qrng"
            ? {
                name,
                tagline,
                description,
                status: "inactive",
                images: uploadedImages,
                categories: JSON.parse(categories),
                productType: productType,
                chains: JSON.parse(chains),
                links: JSON.parse(links),
                year: parseInt(year),
              }
            : {
                name,
                tagline,
                description,
                status: "inactive",
                images: uploadedImages,
                categories: JSON.parse(categories),
                productType: productType,
                chains: JSON.parse(chains),
                proxies: JSON.parse(proxies),
                links: JSON.parse(links),
                year: parseInt(year),
              };

        // check if project with same name already active
        const existingProject = await Project.findOne({
          name: payload.name,
        });

        if (existingProject) {
          event.node.res.statusCode = 400;
          return {
            code: "REQ_FAILED",
            message: `Project with name ${payload.name} already submitted`,
          };
        }

        // add slug field in  mongodb project collection to implement find by name slug
        const createdProject = await new Project({
          ...payload,
          slug: slug(payload.name),
        }).save();

        // project json will be stored with active status in pull request for review
        payload.status = "active";
        // verify build and create pr
        const buildResult = await checkBuildStatus(payload, createdProject.id);

        if (!buildResult.success) {
          // remove project data from db when build failed
          await Project.findByIdAndDelete(createdProject.id);

          event.res.statusCode = 400;
          return {
            code: "BUILD_FAILED",
            message: "Failed to build project!",
          };
        }

        event.node.res.statusCode = 201;
        return {
          code: "OK",
          message: "Project submitted successfully!",
          // data: buildResult?.data,
          data: "",
        };
      } catch (err: any) {
        console.log("create project error ", err);
        event.node.res.statusCode = 500;
        return {
          code: "ERROR",
          message: "Something went wrong.",
        };
      }
    })
  )
);
