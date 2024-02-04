import {
  ECurrencies,
  ECurrencyId,
  ETokens,
  IContractInformation,
  chainIdToInformation,
  contracts,
} from "@/contracts";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { initializeProvider } from "./utils";

const WEI_DECIMAL_PLACES = 18;

const getUserAddress = async (provider: BrowserProvider) => {
  const signer = await provider.getSigner();
  const userAddress = await signer.getAddress();

  return userAddress;
};

const getTokenPrices = async (
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

const getTokenBalance = async (
  provider: BrowserProvider,
  contractInformation: IContractInformation
): Promise<number | undefined> => {
  const { address, abi } = contractInformation;

  try {
    const userAddress = await getUserAddress(provider);
    const contract = new Contract(address, abi, provider);

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
  const provider = await initializeProvider();

  const isValidConnection = chainId && provider;
  if (!isValidConnection) {
    console.error("No Ethereum provider available");
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
