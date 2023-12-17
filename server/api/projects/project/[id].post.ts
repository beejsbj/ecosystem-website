import { Project } from "~/server/models/Project";
import { authenticated } from "../../../utils/authenticated";
import mongoose from "mongoose";
import { Upvote } from "~/server/models/Upvote";

export default authenticated(
  defineEventHandler(async (event: any) => {
    try {
      const projectId = event.context?.params?.id;

      if (!mongoose.isValidObjectId(projectId)) {
        event.node.res.statusCode = 400;
        return {
          code: "INVALID_ID",
          message: "Invalid project Id",
        };
      }
      const user = event.context.auth.user;

      const existingUpvote = await Upvote.findOne({
        user: user?.id,
        project: projectId,
      });

      if (existingUpvote?.id) {
        event.node.res.statusCode = 400;
        return {
          code: "INVALID_REQ",
          message: "Already upvoted",
        };
      }

      await new Upvote({ user: user?.id, project: projectId }).save();

      const update = await Project.findByIdAndUpdate(projectId, {
        $inc: { upvotes: 1 },
      });

      if (!update?.id) {
        event.node.res.statusCode = 400;
        return {
          code: "ERROR",
          message: "Failed to update upvote!",
        };
      }
      event.node.res.statusCode = 201;
      return {
        code: "OK",
        message: "Upvote success!",
      };
    } catch (err: any) {
      console.log("upvote error ", err);
      event.node.res.statusCode = 500;
      return {
        code: "ERROR",
        message: "Failed to perform upvote",
      };
    }
  })
);
