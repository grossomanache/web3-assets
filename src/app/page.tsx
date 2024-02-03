"use client";

import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { getTokenData } from "@/lib";
import { ETokens, chainIdToInformation } from "@/contracts";
import { OrTable } from "@/components/organisms/or-table";
import { useEffect, useState } from "react";
import { useAccount, useChainId, useClient } from "wagmi";

interface IAsset {
  id: ETokens;
  price: number;
  balance: number;
}

export default function Home() {
  const usedToken = ETokens.USDT;

  const chainId = useChainId();
  const [assets, setAssets] = useState<IAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const tokens = chainIdToInformation[chainId]?.tokens ?? [];

    const promises = tokens.map(async (tokenId) => {
      const tokenData = await getTokenData(tokenId);
      const { balance, price } = tokenData;
      return { id: tokenId, price, balance: balance ?? 0 };
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
  }, [chainId, usedToken]);

  return (
    <section className="flex flex-col gap-y-8 items-center p-2">
      <AtConnectButton size="sm" className="flex self-end" />
      <h1>web3 assets</h1>
      <OrTable assets={assets} isLoading={loading} />
    </section>
  );
}
