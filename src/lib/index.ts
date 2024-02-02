import { ETokens, IContractInformation, contracts } from "@/contracts";
import { BrowserProvider, Contract, formatUnits } from "ethers";

export let provider: BrowserProvider;
const isWindowValid = typeof window !== "undefined" && window?.ethereum;
if (isWindowValid) {
  provider = new BrowserProvider(window?.ethereum);
}

export const getNetworkId = async () => {
  try {
    const network = await provider.getNetwork();
    const { chainId } = network;

    if (!chainId) {
      console.error("Non valid network");
    }

    return Number(chainId);
  } catch (error) {
    console.error("Error fetching network name:", error);
    throw error;
  }
};

export const getTokenBalance = async (
  contractInformation: IContractInformation
): Promise<number | undefined> => {
  const { address, abi } = contractInformation;

  if (!provider) {
    return undefined;
  }

  try {
    const contract = new Contract(address, abi, provider);

    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const balanceInWei = await contract.balanceOf(userAddress);
    const balance = Number(formatUnits(balanceInWei, 18));

    return balance;
  } catch (error) {
    console.error("Error fetching token balance:", error);
    throw error;
  }
};

export const getTokenPrice = async (
  tokenId: ETokens,
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

export const getTokenData = async (
  tokenId: ETokens,
  referenceCurrency?: string
) => {
  const price = await getTokenPrice(tokenId, referenceCurrency);

  const contractInformation = contracts[tokenId];
  const balance = await getTokenBalance(contractInformation);

  return { price, balance };
};
