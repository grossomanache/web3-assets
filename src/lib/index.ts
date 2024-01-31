import { IContractInformation } from "@/contracts";
import { BrowserProvider, Contract, formatUnits } from "ethers";

interface IGetTokenBalance {
  contractInformation: IContractInformation;
}

export const getTokenBalance = async ({
  contractInformation,
}: IGetTokenBalance): Promise<string> => {
  const isWindowValid = typeof window !== "undefined" && window?.ethereum;
  if (!isWindowValid) {
    return "0.0";
  }

  const provider = new BrowserProvider(window.ethereum);
  const { address, abi } = contractInformation;

  try {
    const contract = new Contract(address, abi, provider);

    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const balance = await contract.balanceOf(userAddress);

    return formatUnits(balance, 18);
  } catch (error) {
    console.error("Error fetching token balance:", error);
    throw error;
  }
};

export const getTokenPrice = async (tokenId: string, currency?: string) => {
  const usedCurrency = currency ?? "usd";
  const apiRoute = `https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=${usedCurrency}`;

  const response = await fetch(apiRoute);
  const data = await response.json();

  const value = data[tokenId];
  const price = value[usedCurrency];

  return price;
};
