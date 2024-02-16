import { parseOevSnapshot } from "~/server/services/oev-parser/oev";

export default defineEventHandler(async (event) => {
  try {
    const parsed = await parseOevSnapshot();

    event.node.req.statusCode = 200;
    return parsed;
  } catch (err: any) {
    console.log("fetch articles error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
