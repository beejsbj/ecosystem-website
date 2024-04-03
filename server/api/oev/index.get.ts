import { OevTotal } from "~/server/models/OevTotal";

export default defineEventHandler(async (event) => {
  try {
    const protocols = await OevTotal.find({});

    const filtered = protocols.filter(
      (protocol) => protocol.totalProfitUSD !== 0
    );
    event.node.req.statusCode = 200;
    return filtered;
  } catch (err: any) {
    console.log("fetch oev data error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Something went wrong.",
    };
  }
});
