import { CHAINS } from "@api3/chains";

export const getChainName = (chainId) => {
  const chain = CHAINS.find((chain) => chain.id == chainId);
  return chain ? chain.name : chainId;
};
