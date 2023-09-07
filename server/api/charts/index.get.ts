import axios from "axios";
import { kv } from "@vercel/kv";

const STATS_ENDPOINTS: { [name: string]: string } = {
  qrngTotals:
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/115/card/120?parameters=%5B%5D",
  qrngFullfillments7Days:
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/114/card/121?parameters=%5B%5D",
  qrngFullfillments30Days:
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/117/card/123?parameters=%5B%5D",
  qrngFullfillments45Days:
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/122/card/124?parameters=%5B%5D",
  qrngFullfillments52Weeks:
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/123/card/125?parameters=%5B%5D",
  qrngFullfillments12Months:
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/124/card/126?parameters=%5B%5D",
  qrngLast2000Requests:
    "https://metabase.api3.org/api/public/dashboard/416e2a82-e22d-4091-a127-7b06150a4ca3/dashcard/116/card/122?parameters=%5B%5D",
  dapiOpenOrders:
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/154/card/155?parameters=%5B%5D",
  dapiFulfilledOrders:
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/155/card/156?parameters=%5B%5D",
  dapiFulfilledOrdersPerChain:
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/156/card/157?parameters=%5B%5D",
  dapiManagedPerChain:
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/162/card/159?parameters=%5B%5D",
  dapiActiveManaged:
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/157/card/158?parameters=%5B%5D",
  dapiActiveSelfFunded:
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/160/card/161?parameters=%5B%5D",
  dapiTransactionsPerChain:
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/159/card/160?parameters=%5B%5D",
  dapiSelfFundedPerChain:
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/161/card/162?parameters=%5B%5D",
  dapiUpdatesPerDayPerChain:
    "https://metabase.api3.org/api/public/dashboard/d0f00529-e482-4682-b840-6956222e581e/dashcard/165/card/133?parameters=%5B%5D",
};
const CACHE_EXPIRY_SECONDS: number = 30 * 60;
export default defineEventHandler(async (event) => {
  try {
    const endPoints = Object.keys(STATS_ENDPOINTS).map(
      (key) => STATS_ENDPOINTS[key]
    );

    const keys = Object.keys(STATS_ENDPOINTS);

    let finalResult: {
      [name: string]: any;
    };

    const cachedData = await kv.get("charts");

    if (!cachedData) {
      const requests = endPoints.map((endPoint) => axios.get(endPoint));

      const results = await Promise.all(requests);
      const data = results?.map((el) => el?.data);
      finalResult = {};
      keys.forEach((chartFields, index) => {
        finalResult[chartFields] = data?.[index];
      });
      await kv.set("charts", finalResult, {
        ex: CACHE_EXPIRY_SECONDS,
        nx: true,
      });
    } else {
      finalResult = cachedData;
    }

    event.node.req.statusCode = 200;
    return finalResult;
  } catch (err: any) {
    console.log("get charts data: error  ", err);
    event.node.req.statusCode = 500;
    return {
      code: "ERROR",
      message: "Failed to fetch charts!",
    };
  }
});
