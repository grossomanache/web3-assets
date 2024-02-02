"use client";

import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { getNetworkId, getTokenData, getUserAddress } from "@/lib";
import { ETokens, chainIdToInformation } from "@/contracts";
import { OrTable } from "@/components/organisms/or-table";
import { useEffect, useState } from "react";

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
    getUserAddress().then((newAddress) => console.log("newadress", newAddress));
    const tokens = chainIdToInformation[currentChain]?.tokens ?? [];
    tokens.forEach((tokenId) => {
      getTokenData(tokenId).then((data) => {
        console.log("balance", data.balance);
        const { balance, price } = data;
        setAssets((assets) => [
          ...assets,
          { id: tokenId, price, balance: balance ?? 0 },
        ]);
      });
    });
    setLoading(false);
  }, [currentChain, usedToken]);

  return (
    <section className="flex flex-col gap-y-8 items-center">
      <AtConnectButton size="sm" className="flex self-end" />
      <OrTable assets={assets} />
    </section>
  );
}
