/**
 * useSiwe Composable
 *
 * A composable function that provides Sign-In with Ethereum (SIWE) functionality.
 *
 * @function
 *
 * @returns {Object} An object containing SIWE-related functions
 * @property {Function} verifyWallet - Async function to verify a wallet using SIWE
 *
 * @uses
 * - useWeb3Store - Pinia store for managing Web3 state
 *
 * @example
 * const { verifyWallet } = useSiwe();
 *
 * @function verifyWallet
 * @async
 * @returns {Promise<Object>} Result of the wallet verification process
 * @property {boolean} success - Indicates if the verification was successful
 * @property {string} [message] - Error message if verification failed
 * @property {Object} [data] - Verification payload if successful
 * @property {string} data.signature - The signed message
 * @property {string} data.address - The wallet address
 * @property {string} data.message - The stringified message that was signed
 * @property {string} data.nonce - The nonce used in the verification process
 *
 * @notes
 * - Requires a connected wallet and valid chainId from the Web3 store
 * - Makes API calls to '/api/auth/nonce' and '/api/auth/sign-message'
 * - Uses the Web3 store's sign function to sign the message
 * - Implements error handling for various scenarios (no nonce, invalid account/chainId, signing failure)
 * - The signed message includes domain, chainId, address, statement, URI, version, and nonce
 * - Assumes the existence of a global `$fetch` function for making API requests
 */

export const useSiwe = () => {
  const web3Store = useWeb3Store();
  async function verifyWallet() {
    try {
      const nonce = await $fetch("/api/auth/nonce", {
        method: "GET",
      });

      if (!nonce)
        return {
          success: false,
          message: "Failed to get nonce from service!",
        };

      if (!web3Store.state?.account)
        return {
          success: false,
          message: "Invalid account!",
        };

      if (!web3Store.state?.chainId)
        return {
          success: false,
          message: "Invalid chainId!",
        };

      const message = {
        domain: window.location.host,
        chainId: web3Store.state?.chainId,
        address: web3Store.state?.account,
        statement: "Sign in with Ethereum to the API3 ecosystem",
        uri: window.location.origin,
        version: "1",
        nonce: nonce,
      };

      const messageToSign = await $fetch("/api/auth/sign-message", {
        method: "GET",
        query: message,
      });

      const signature = await web3Store.func?.sign({ message: messageToSign });

      if (!signature) {
        return {
          success: false,
          message: "Failed to sign message!",
        };
      }

      const verificationPayload = {
        signature: signature,
        address: web3Store.state.account,
        message: JSON.stringify(messageToSign),
        nonce: nonce,
      };

      return { success: true, data: verificationPayload };
    } catch (error) {
      console.log("verificationStatus test: signature error", {
        error,
      });
      return {
        success: false,
        message: "Failed to sign message!",
      };
    }
  }

  return { verifyWallet };
};
