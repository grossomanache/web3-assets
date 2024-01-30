"use client";

import { IDefaultChildren } from "@/app/layout";
import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";
import { Chain, Metadata } from "@web3modal/scaffold-utils/ethers";

const projectId = process.env.NEXT_PUBLIC_PROJECT_ID ?? "";

const bnbChain: Chain = {
  chainId: 56,
  name: "BNB Smart Chain",
  currency: "BNB",
  explorerUrl: "https://bscscan.com/",
  rpcUrl: "https://bsc-dataseed.binance.org/",
};

const polygonChain: Chain = {
  chainId: 137,
  name: "Polygon Mainnet",
  currency: "MATIC",
  explorerUrl: "https://polygonscan.com/",
  rpcUrl: "https://polygon-rpc.com/",
};

const metadata: Metadata = {
  name: "Web3 assetes",
  description: "All of your crypto assets in one place",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [bnbChain, polygonChain],
  projectId,
  enableAnalytics: true,
});

export function Web3ModalProvider({ children }: IDefaultChildren) {
  return children;
}
