import {
  ECurrencies,
  ECurrencyId,
  ETokens,
  IContractInformation,
  chainIdToInformation,
  contracts,
} from "@/contracts";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { getProvider } from "./utils";

const WEI_DECIMAL_PLACES = 18;

export const getUserAddress = async (provider: BrowserProvider) => {
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  return userAddress;
};

export const getTokenPrices = async (
  tokenIds: (ETokens | ECurrencyId)[],
  referenceCurrency?: string
) => {
  const usedCurrency = referenceCurrency ?? "usd";

  const ids = tokenIds.join(",");
  const apiRoute = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=${usedCurrency}`;

  try {
    const response = await fetch(apiRoute);
    const data = await response.json();

    const prices = tokenIds.reduce((acc, tokenId) => {
      acc[tokenId] = data[tokenId]?.usd || 0;
      return acc;
    }, {} as { [key in ETokens | ECurrencyId]: number });

    return prices;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    throw error;
  }
};

export const getTokenPrice = async (
  tokenId: ETokens | ECurrencyId,
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
  const price = await getTokenPrices([id], referenceCurrency);

  const balance = await getNativeBalance();
  if (typeof balance !== "number") {
    return { price: 0, balance: 0 };
  }

  return { id, price, balance, symbol };
};

export const getTokenBalance = async (
  provider: BrowserProvider,
  contractInformation: IContractInformation
): Promise<number | undefined> => {
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

export interface IAsset {
  id: ETokens | ECurrencies;
  price: number;
  balance: number;
  symbol: string;
}

export const getAssetData = async (
  chainId: number | undefined,
  tokenIds: ETokens[],
  referenceCurrency?: string
) => {
  const provider = getProvider();

  const isValidConnection = chainId && provider;
  if (!isValidConnection) {
    return [];
  }

  const nativeCurrency = chainIdToInformation[chainId].currency;

  const pricesToQuery = [...tokenIds, nativeCurrency.id];
  const prices = await getTokenPrices(pricesToQuery, referenceCurrency);

  const nativeCurrencyData = {
    id: nativeCurrency.label,
    price: prices[nativeCurrency.id],
    symbol: nativeCurrency.label,
    balance: 0,
  };

  const promises = tokenIds.map(async (tokenId) => {
    const price = prices[tokenId];

    const contract = contracts[tokenId];
    const balance = await getTokenBalance(provider, contract);

    const { symbol } = contract;

    return {
      id: tokenId,
      price,
      symbol,
      balance: balance ?? 0,
    };
  });

  const promisesToResolve = [nativeCurrencyData, ...promises];

  const data = await Promise.all(promisesToResolve);
  return data;
};
