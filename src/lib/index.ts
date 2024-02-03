import {
  ECurrency,
  ETokens,
  IContractInformation,
  chainIdToInformation,
  contracts,
} from "@/contracts";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { getContract } from "viem";
import { getProvider } from "./utils";

const WEI_DECIMAL_PLACES = 18;

export const getUserAddress = async (provider: BrowserProvider) => {
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  return userAddress;
};

export const getTokenBalance = async (
  contractInformation: IContractInformation
): Promise<number | undefined> => {
  const provider = getProvider();
  if (!provider) {
    return;
  }

  const { address, abi } = contractInformation;

  try {
    const contract = new Contract(address, abi, provider);

    const userAddress = await getUserAddress(provider);

    const balanceInWei = await contract.balanceOf(userAddress);
    const balance = Number(formatUnits(balanceInWei, WEI_DECIMAL_PLACES));

    return balance;
  } catch (error) {
    console.error("Error fetching token balance:", error);
    throw error;
  }
};

export const getTokenPrice = async (
  tokenId: ETokens | ECurrency,
  referenceCurrency?: string
) => {
  const usedCurrency = referenceCurrency ?? "usd";
  const apiRoute = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=${usedCurrency}`;

  try {
    const response = await fetch(apiRoute);
    const data = await response.json();

    const value = data[tokenId];

    if (!value) {
      throw new Error("Coingecko API failed. Please check your request");
    }

    const price = value[usedCurrency];

    return price;
  } catch (error) {
    console.error("Error fetching token price:", error);
    throw error;
  }
};

export const getNativeBalance = async () => {
  const isWindowValid = typeof window !== "undefined" && window?.ethereum;
  if (!isWindowValid) {
    return undefined;
  }

  const provider = new BrowserProvider(window?.ethereum);

  const userAddress = await getUserAddress(provider);
  const balanceInWei = await provider.getBalance(userAddress);
  const balance = Number(formatUnits(balanceInWei, WEI_DECIMAL_PLACES));

  return balance;
};

export const getNativeTokenData = async (
  chainId: number | undefined,
  referenceCurrency?: string
) => {
  if (!chainId) {
    return { price: 0, balance: 0 };
  }

  const {
    currency: { id, symbol },
  } = chainIdToInformation[chainId];
  const price = await getTokenPrice(id, referenceCurrency);

  const balance = await getNativeBalance();
  if (typeof balance !== "number") {
    return { price: 0, balance: 0 };
  }

  return { id, price, balance, symbol };
};

export const getTokenData = async (
  tokenId: ETokens,
  referenceCurrency?: string
) => {
  const price = await getTokenPrice(tokenId, referenceCurrency);

  const contractInformation = contracts[tokenId];
  const balance = await getTokenBalance(contractInformation);

  return { price, balance };
};

export const getTokensData = async () => {
  const provider = getProvider();
  if (!provider) {
    return;
  }
};
