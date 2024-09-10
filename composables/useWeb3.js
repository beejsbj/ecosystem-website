/**
 * useWeb3 Composable
 *
 * A composable function that sets up and manages Web3 functionality for the application.
 *
 * @function
 *
 * @returns {Object} An object containing Web3 related properties and methods
 * @property {ComputedRef<string|undefined>} account - The current connected account address
 * @property {ComputedRef<boolean>} isConnected - Whether a wallet is currently connected
 * @property {ComputedRef<number|undefined>} chainId - The ID of the currently connected chain
 * @property {Function} sign - Async function to sign a message
 * @property {Function} switchChain - Async function to switch to a different blockchain network
 *
 * @example
 * const { account, isConnected, chainId, sign, switchChain } = useWeb3();
 *
 * @notes
 * - Supports multiple blockchain networks
 * - Automatically connects to previously connected wallets
 * - Updates Pinia store with current Web3 state
 * - Provides methods for signing messages and switching networks
 * - Handles errors for signing and network switching operations
 */

import {
  EthereumClient,
  w3mConnectors,
  w3mProvider,
} from "@web3modal/ethereum";
import { Web3Modal } from "@web3modal/html";
import {
  configureChains,
  createConfig,
  watchAccount,
  signMessage,
  getNetwork,
  watchNetwork,
} from "@wagmi/core";
import {
  arbitrum,
  mainnet,
  polygon,
  polygonZkEvm,
  avalanche,
  avalancheFuji,
  boba,
  bsc,
  canto,
  celo,
  dogechain,
  fantom,
  moonbeam,
  moonriver,
  aurora,
  gnosis,
  metis,
  optimism,
  zkSync,
  skaleExorde,
  mantle,
} from "@wagmi/core/chains";
import { switchNetwork } from "@wagmi/core";
import { useWeb3Store } from "@/stores/web3Store";

export const useWeb3 = () => {
  //get env variable for project id
  const web3Store = useWeb3Store();
  const config = useRuntimeConfig();
  const projectId = config.public.walletConnectProjectId;

  //configure chains
  const chains = [
    arbitrum,
    mainnet,
    polygon,
    polygonZkEvm,
    aurora,
    avalanche,
    avalancheFuji,
    boba,
    bsc,
    canto,
    celo,
    dogechain,
    fantom,
    moonbeam,
    moonriver,
    gnosis,
    metis,
    optimism,
    zkSync,
    skaleExorde,
    mantle,
  ];
  const { publicClient } = configureChains(chains, [
    w3mProvider({ projectId }),
  ]);

  //create wagmi config
  const wagmiConfig = createConfig({
    autoConnect: true,
    connectors: w3mConnectors({ projectId, version: 1, chains }),
    publicClient,
  });

  // //create ethereum client and web3modal
  const ethereumClient = new EthereumClient(wagmiConfig, chains);
  const web3modal = computed(
    () => new Web3Modal({ projectId }, ethereumClient)
  );

  ////////////////////////////////////

  const wallet = ref({});
  const router = useRouter();
  const currentUrl = router.currentRoute.value.path;

  const unwatchAccount = watchAccount((acc) => {
    wallet.value = { ...acc };

    web3Store.state.account = acc?.address;
    web3Store.state.isConnected = acc?.isConnected;
  });

  watchNetwork((network) => {
    web3Store.state.chainId = network?.chain?.id;
  });

  const chainId = computed(() => getNetwork()?.chain?.id);

  const account = computed(() => wallet.value.address);
  const isConnected = computed(() => wallet.value.isConnected);

  const sign = async (message) => {
    try {
      const result = await signMessage(message);
      return result;
    } catch (error) {
      console.log("sign error", error);
      return null;
    }
  };

  const switchChain = async (targetChain) => {
    try {
      await switchNetwork({
        chainId: targetChain,
      });
    } catch (error) {
      console.log("chain switch error ", error);
    }
  };

  web3Store.func.sign = sign;
  web3Store.func.openModal = web3modal.value.openModal;
  web3Store.func.switchChain = switchChain;

  return {
    account,
    isConnected,
    chainId,
    sign,
    switchChain,
  };
};
