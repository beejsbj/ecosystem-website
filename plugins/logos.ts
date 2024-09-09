/**
 * Logos Plugin
 *
 * Provides easy access to various logo retrieval functions from the @api3/logos package
 * throughout the Nuxt application.
 *
 * @plugin
 *
 * @features
 * - Exposes functions to retrieve logos for chains, symbols, and API providers
 * - Integrates the @api3/logos package into the Nuxt ecosystem
 *
 * @dependencies
 * - @api3/logos
 *
 * @provides
 * - $chainLogo: (chainId: string) => string
 * - $symbolLogo: (symbol: string) => string
 * - $apiProviderLogo: (provider: string) => string
 *
 */

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
