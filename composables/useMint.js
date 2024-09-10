/**
 * useMint Composable
 *
 * A composable function that provides NFT minting functionality for the API3 Guild.
 *
 * @function
 *
 * @returns {Object} An object containing minting-related functions
 * @property {Function} mintNft - Async function to mint an NFT
 * @property {Function} isAlreadyMinted - Async function to check if an NFT has already been minted
 *
 * @uses
 * - @wagmi/core - For blockchain interactions (waitForTransaction, writeContract, readContract)
 * - useWeb3Store - Pinia store for managing Web3 state
 * - GUILD_ABI - ABI for the API3 Guild smart contract
 *
 * @constant
 * @type {string}
 * @name API3_GUILD_ADDRESS
 * @description The Ethereum address of the API3 Guild smart contract
 *
 * @example
 * const { mintNft, isAlreadyMinted } = useMint();
 *
 * @function mintNft
 * @async
 * @param {number} productId - The ID of the product to mint
 * @param {Object} chainId - The ID of the blockchain network
 * @returns {Promise<Object>} Result of the minting operation
 *
 * @function isAlreadyMinted
 * @async
 * @param {number} productId - The ID of the product to check
 * @param {string} account - The Ethereum address to check for minting status
 * @returns {Promise<boolean>} Whether the NFT has already been minted
 *
 * @notes
 * - Minting is currently set up for the Polygon Mainnet (chainId 137)
 * - The composable updates the web3Store with minting functions
 * - Error handling is implemented for both functions
 * - Different function names are used for checking minting status based on productId
 */

import { waitForTransaction } from "@wagmi/core";
import { writeContract, readContract } from "@wagmi/core";
import GUILD_ABI from "../content/GUILD_ABI.json";

const API3_GUILD_ADDRESS = "0x4052d3e79AEe9cF01168633531FEfAe4bF8FdB78";

export const useMint = () => {
  const web3Store = useWeb3Store();
  async function mintNft(productId, chainId) {
    try {
      if (!chainId?.value)
        return {
          success: false,
          message: "Wrong chain to mint! Please switch to Polygon Mainnet",
        };

      const { hash } = await writeContract({
        address: API3_GUILD_ADDRESS,
        abi: GUILD_ABI,
        functionName: "mint",
        args: [productId],
        chainId: chainId.value,
      });

      const data = await waitForTransaction({
        hash: hash,
        chainId: chainId.value,
      });

      return { success: true, data: data };
    } catch (error) {
      console.log("mint error ", {
        error,
        productId,
      });
      return {
        success: false,
        message: "Failed to mint NFT!",
      };
    }
  }

  async function isAlreadyMinted(productId, account) {
    try {
      let functionName = "";

      if (productId === 0) {
        functionName = "devAlreadyClaimed";
      } else if (productId === 1) {
        functionName = "daoAlreadyClaimed";
      } else {
        functionName = "testerAlreadyClaimed";
      }

      const data = await readContract({
        address: API3_GUILD_ADDRESS,
        abi: GUILD_ABI,
        functionName: functionName,
        args: [account],
        chainId: 137,
      });

      return data;
    } catch (error) {
      console.log("mint check error ", error);
      return false;
    }
  }

  web3Store.func.mintNft = mintNft;
  web3Store.func.isAlreadyMinted = isAlreadyMinted;

  return { mintNft, isAlreadyMinted };
};
