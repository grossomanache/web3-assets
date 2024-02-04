import { BrowserProvider } from "ethers";

export const getProvider = () => {
  const isWindowValid = typeof window !== "undefined" && window?.ethereum;
  if (!isWindowValid) {
    return undefined;
  }

  const provider = new BrowserProvider(window?.ethereum);

  return provider;
};
