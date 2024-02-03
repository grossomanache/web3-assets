"use client";

import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { getTokenData } from "@/lib";
import { ETokens, chainIdToInformation, contracts } from "@/contracts";
import { OrTable } from "@/components/organisms/or-table";
import { useEffect, useState } from "react";
import { useAccount, useChainId } from "wagmi";

interface IAsset {
  id: ETokens;
  price: number;
  balance: number;
  symbol: string;
}

export default function Home() {
  const { chainId } = useAccount();

  const [assets, setAssets] = useState<IAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const tokens = chainId ? chainIdToInformation?.[chainId]?.tokens : [];

    const promises = tokens.map(async (tokenId) => {
      const tokenData = await getTokenData(tokenId);
      const { balance, price } = tokenData;
      const { symbol } = contracts[tokenId];
      return { id: tokenId, price, symbol, balance: balance ?? 0 };
    });

    Promise.all(promises)
      .then((assetsData) => {
        setAssets(assetsData);
      })
      .catch((error) => {
        console.error("Failed to load token data", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [chainId]);

  return (
    <section className="flex flex-col gap-y-8 items-center p-2">
      <AtConnectButton size="sm" className="flex self-end" />
      <h1>web3 assets</h1>
      <OrTable assets={assets} isLoading={loading} />
    </section>
  );
}
