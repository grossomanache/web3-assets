import { IContractInformation } from "@/contracts";
import { InterfaceAbi } from "ethers";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { Address } from "viem";

let provider: BrowserProvider;

if (typeof window !== "undefined" && window?.ethereum) {
  provider = new BrowserProvider(window.ethereum);
}

interface IGetTokenBalance {
  contractInformation: IContractInformation;
  userAddress: Address;
}

export const getTokenBalance = async ({
  contractInformation,
  userAddress,
}: IGetTokenBalance) => {
  const { address, abi } = contractInformation;
  const contract = new Contract(address, abi, provider);

  try {
    const balance = await contract.balanceOf(userAddress);

    return formatUnits(balance, 18);
  } catch (error) {
    console.error("Error fetching token balance:", error);
    throw error;
  }
};
