import * as Logos from "@phase21/logos";

export default defineNuxtPlugin(() => {
  return {
    provide: {
      chainLogo: (chainId: string) => Logos.ChainLogo(chainId),
      symbolLogo: (symbol: string) => Logos.SymbolLogo(symbol),
      apiProviderLogo: (provider: string) => Logos.ApiProviderLogo(provider),
    },
  };
});
