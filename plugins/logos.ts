import * as Logos from "@api3/logos";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      chainLogo: (chainId: string) => Logos.ChainLogo(chainId),
      symbolLogo: (symbol: string) => Logos.SymbolLogo(symbol),
      apiProviderLogo: (provider: string) => Logos.ApiProviderLogo(provider),
    },
  };
});
