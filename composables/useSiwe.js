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
