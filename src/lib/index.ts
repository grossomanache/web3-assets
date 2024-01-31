import { IContractInformation } from "@/contracts";
import { InterfaceAbi } from "ethers";
import { BrowserProvider, Contract, formatUnits } from "ethers";
import { Address } from "viem";

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
