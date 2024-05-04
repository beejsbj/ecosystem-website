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
