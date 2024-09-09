/**
 * getChainName
 * 
 * Retrieves the human-readable name of a blockchain network based on its chain ID.
 *
 * @function
 * 
 * @param {number|string} chainId - The chain ID of the blockchain network
 * @returns {string} The human-readable name of the blockchain network
 *
 * @example
 * getChainName(1);     // Returns "Ethereum"
 * getChainName("56");  // Returns "BNB Smart Chain"
 * getChainName(137);   // Returns "Polygon"
 * getChainName(999);   // Returns "Unknown Chain (ID: 999)"
 
 */

import { CHAINS } from "@api3/chains";

export const getChainName = (chainId) => {
  const chain = CHAINS.find((chain) => chain.id == chainId);
  return chain ? chain.name : chainId;
};
