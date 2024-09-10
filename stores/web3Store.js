/**
 * useWeb3Store
 *
 * A Pinia store for managing Web3-related state and functions across the application.
 *
 * @function
 *
 * @returns {Object} An object containing the Web3 store state and functions
 * @property {Ref<Object>} state - Reactive object containing Web3 state
 * @property {string|null} state.account - The current connected account address
 * @property {boolean} state.isConnected - Whether a wallet is currently connected
 * @property {number|null} state.chainId - The ID of the currently connected chain
 * @property {Ref<Object>} func - Reactive object containing Web3-related functions
 * @property {Function|null} func.sign - Function to sign messages
 * @property {Function|null} func.openModal - Function to open the Web3 connection modal
 * @property {Function|null} func.switchChain - Function to switch blockchain networks
 * @property {Function|null} func.mintNft - Function to mint an NFT
 * @property {Function|null} func.isAlreadyMinted - Function to check if an NFT is already minted
 *
 * @example
 * const web3Store = useWeb3Store();
 * const { account, isConnected, chainId } = web3Store.state;
 * const { sign, openModal, switchChain } = web3Store.func;
 *
 * @notes
 * - Uses the 'web3Store' namespace
 * - State and functions are stored in separate reactive objects for organization
 * - Functions are initially set to null and should be populated by the application logic
 * - Provides a centralized location for managing Web3 state and functionality
 * - Can be easily extended with additional state properties or functions as needed
 */



import { defineStore } from "pinia";

export const useWeb3Store = defineStore("web3Store", () => {
  const state = ref({ account: null, isConnected: false, chainId: null });

  const func = ref({
    sign: null,
    openModal: null,
    switchChain: null,
    mintNft: null,
    isAlreadyMinted: null,
  });

  return {
    state,
    func,
  };
});
