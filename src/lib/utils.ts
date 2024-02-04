import { EthereumProvider } from "@walletconnect/ethereum-provider";
import { BrowserProvider } from "ethers";
import { projectId } from "../config";

export const getProvider = () => {
  const isWindowValid = typeof window !== "undefined" && window?.ethereum;
  if (!isWindowValid) {
    return undefined;
  }

  const provider = new BrowserProvider(window?.ethereum);
  return provider;
};

export const getWeb3Provider = async () => {
  const ethereumProvider = await EthereumProvider.init({
    projectId,
    showQrModal: true,
    optionalChains: [1, 56, 137],
  });

  const provider = new BrowserProvider(ethereumProvider);
  return provider;
};
