import { Project } from "~/server/models/Project";
import { handleWebhookAuth } from "../../utils/handleWebhookAuth";

export default handleWebhookAuth(
  defineEventHandler(async (event: any) => {
    try {
      const payload = await (event.node?.req?.body || readBody(event));

      if (
        payload?.action === "closed" &&
        payload?.pull_request?.merged === true
      ) {
        // extract project mongo id from branch name
        // reg ex to extract correct mongoId from branch name
        const branchRef = payload?.pull_request?.head?.ref;
        const regex = /.*-([a-f0-9]{24})/;
        const match = branchRef.match(regex);
        const projectId = match ? match[1] : null;

        if (!projectId) {
          event.node.res.statusCode = 400;
          return {
            code: "ERROR",
            message: "Failed to extract project id from branch name",
          };
        }

        // update project status to active
        await Project.findOneAndUpdate(
          { _id: projectId },
          { status: "active" },
          { new: true }
        );

        // The pull request was merged
        console.log("Pull request was merged!");
        event.node.res.statusCode = 201;
        return { code: "OK", message: "Project published to live" };
      } else if (
        payload?.action === "closed" &&
        payload?.pull_request?.merged === false
      ) {
        // The pull request was merged
        event.node.res.statusCode = 201;
        return { code: "OK", message: "Project rejected" };
      }

      event.node.res.statusCode = 201;
      return { code: "OK", message: "This event has no action yet" };
    } catch (err: any) {
      console.log("webhook req ", err);
      event.node.res.statusCode = 500;
      return {
        code: "ERROR",
        message: "Failed to update project status!",
      };
    }
  })
);
