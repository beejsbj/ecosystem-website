import { imageUploadHandler } from "../../utils/imageUpload";
import { authenticated } from "../../utils/authenticated";
import { type ProjectType } from "~/server/types";
import { createPR, isProjectExists } from "~/server/services/github";
import {
  alertMailMarkup,
  validateProjectSchema,
} from "~/server/services/helper";
import { sendEmail } from "~/server/services/email";

export default authenticated(
  imageUploadHandler(
    checkConnection(
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

          const errors = [];

          if (!event.node.req?.files?.logo?.[0]?.location) {
            event.node.res.statusCode = 400;

            errors.push("Failed to upload logo");
          }
          if (!event.node.req?.files?.cover?.[0]?.location) {
            event.node.res.statusCode = 400;

            errors.push("Failed to upload cover image");
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
            errors.push("Please upload atleast 2 screenshots");
          }

          const uploadedImages = {
            logo: event.node.req?.files?.logo?.[0]?.location,
            cover: event.node.req?.files?.cover?.[0]?.location,
            screenshots: screenshots,
          };

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

          const isExists = await isProjectExists(payload);

          if (isExists) {
            event.node.res.statusCode = 400;
            errors.push(`Project with name ${payload.name} already submitted`);
          }

          if (errors.length > 0) {
            const mail = {
              subject: "Failed to create pr during project submission",
              html: alertMailMarkup(JSON.stringify(errors)),
            };
            await sendEmail(mail);

            return {
              code: "REQ_FAILED",
              message: errors,
            };
          }

          payload.status = "active";
          // verify schema

          const verification = await validateProjectSchema(payload);

          if (!verification.success) {
            event.res.statusCode = 400;
            return {
              code: "REQ_FAILED",
              message: verification.result,
            };
          }

          // Create pull request
          const prStatus = await createPR(payload);

          if (!prStatus.success) {
            // send alert email whan failed to add project
            const mail = {
              subject: "Failed to create pr during project submission",
              html: alertMailMarkup(JSON.stringify(prStatus.message)),
            };
            await sendEmail(mail);
            event.res.statusCode = 400;
            return {
              code: "BUILD_FAILED",
              message: prStatus.message,
            };
          }

          event.node.res.statusCode = 201;
          return {
            code: "OK",
            message: "Project submitted successfully!",
            data: prStatus.data,
          };
        } catch (err: any) {
          console.log("create project error ", err);
          // send alert email whan failed to add project
          const mail = {
            subject: "Server error while submitting project",
            html: alertMailMarkup(JSON.stringify(err)),
          };
          await sendEmail(mail);

          event.node.res.statusCode = 500;
          return {
            code: "ERROR",
            message: "Something went while adding your project!.",
          };
        }
      })
    )
  )
);
