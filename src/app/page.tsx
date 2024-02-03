"use client";

import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { getNetworkId, getTokenData, getUserAddress } from "@/lib";
import { ETokens, chainIdToInformation } from "@/contracts";
import { OrTable } from "@/components/organisms/or-table";
import { useEffect, useState } from "react";
import { MlLoader } from "@/components/molecules/ml-loader";
import { useWeb3Modal } from "@web3modal/wagmi/react";

interface IAsset {
  id: ETokens;
  price: number;
  balance: number;
}

export default function Home() {
  const usedToken = ETokens.USDT;

  const [currentChain, setCurrentChain] = useState<number>(0);
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getNetworkId().then((chainId) => {
      setCurrentChain(chainId);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    const tokens = chainIdToInformation[currentChain]?.tokens ?? [];

    const promises = tokens.map((tokenId) => {
      return getTokenData(tokenId).then((data) => {
        const { balance, price } = data;
        return { id: tokenId, price, balance: balance ?? 0 };
      });
    });

    Promise.all(promises)
      .then((assetsData) => {
        setAssets(assetsData);
      })
      .catch((error) => {
        console.error("Failed to load token data", error);
      })
      .finally(() => {
        setLoading(false); // Ensure loading is set to false after operations complete
      });
  }, [currentChain, usedToken]);

  return (
    <section className="flex flex-col gap-y-8 items-center p-2">
      <AtConnectButton size="sm" className="flex self-end" />
      <h1>web3 assets</h1>
      <OrTable assets={assets} isLoading={loading} />
    </section>
  );
}
