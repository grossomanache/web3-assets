"use client";

import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { IAsset, getAssetData } from "@/lib";
import { chainIdToInformation } from "@/contracts";
import { OrTable } from "@/components/organisms/or-table";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

export default function Home() {
  const { chainId, address } = useAccount();

  const [assets, setAssets] = useState<IAsset[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const tokens = chainId ? chainIdToInformation?.[chainId]?.tokens : [];

    getAssetData(chainId, tokens)
      .then((data) => {
        setAssets(data);
      })
      .finally(() => setLoading(false));
  }, [address, chainId]);

  return (
    <section className="flex flex-col gap-y-8 items-center p-2">
      <AtConnectButton size="sm" className="flex self-end" />
      <span className="place-self-start ml-6">
        <h1>web3 assets</h1>
        <h2>All of your crypto assets in a single place</h2>
      </span>
      <OrTable assets={assets} isLoading={loading} />
    </section>
  );
}
