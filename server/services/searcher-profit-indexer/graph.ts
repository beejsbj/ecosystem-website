import { GraphQLClient, gql } from "graphql-request";
import config from "./config.json";

async function querySubgraph(subgraphUrl: string, query: any) {
  try {
    const client = new GraphQLClient(subgraphUrl, { headers: {} });

    const response = await client.request(query);

    return response;
  } catch (error) {
    console.log("fetch error ", error);
    return null;
  }
}

async function extractLiquidations(
  graphUrl: string,
  startTime: number,
  lastDocId: string | null
) {
  let query = "";

  if (!lastDocId) {
    query = gql`
      query {
        liquidates(first:20  where: { timestamp_gte: "${startTime}" }  orderBy: blockNumber) {
          id
          amount
          amountUSD
          blockNumber
          hash
          timestamp
          liquidator{id}
    			liquidatee{id}
          asset {
            decimals
            id
            name
            symbol
            lastPriceUSD
            lastPriceBlockNumber
          }
          profitUSD
        }
      }
    `;
  } else {
    query = gql`
    query {
      liquidates(
        first: 20
        where: { id_gt: "${lastDocId}",  timestamp_gt: "${startTime}"}  orderBy: blockNumber
      ) {
        id
          amount
          amountUSD
          blockNumber
          hash
          timestamp
          liquidator{id}
    			liquidatee{id}
          asset {
            decimals
            id
            name
            symbol
            lastPriceUSD
            lastPriceBlockNumber
          }
          profitUSD
      }
    }
  `;
  }

  try {
    const result: any = await querySubgraph(graphUrl, query);
    console.log("fetched ", result?.liquidates?.length);

    // console.log("trades");
    return result?.liquidates;
  } catch (error) {
    console.log("something went wrong ", error);
    return [];
  }
}

export async function fetchLiquidationDataFromGraph(
  startTime: number,
  lastDocId: string | null | undefined,
  currentProtocolIndex: number
) {
  // get last fetched doc id from db

  const subgraphUrl = config.protocols?.[currentProtocolIndex]?.subgraph;
  let results;
  let nextLastDocId;
  if (!lastDocId) {
    results = await extractLiquidations(subgraphUrl, startTime, null);
    nextLastDocId = results?.[results?.length - 1]?.id;
  } else {
    results = await extractLiquidations(subgraphUrl, startTime, lastDocId);
    nextLastDocId = results?.[results?.length - 1]?.id;
  }

  return { liquidations: results, nextLastDocId };
}
