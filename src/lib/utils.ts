import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { BrowserProvider } from "ethers";
import { projectId } from "../config";

const getMetaMaskProvider = () => {
  const isWindowValid = typeof window !== "undefined" && window?.ethereum;
  if (!isWindowValid) {
    return undefined;
  }

  const provider = new BrowserProvider(window?.ethereum);
  return provider;
};

const getWalletConnectProvider = async () => {
  const ethereumProvider = await EthereumProvider.init({
    projectId,
    showQrModal: true,
    optionalChains: [1, 56, 137],
  });

  const provider = new BrowserProvider(ethereumProvider);
  return provider;
};

export const initializeProvider = async () => {
  let provider = getMetaMaskProvider();

  if (!provider) {
    provider = await getWalletConnectProvider();
  }

  return provider;
};
