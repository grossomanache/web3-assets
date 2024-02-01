"use client";

import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { getTokenBalance, getTokenPrice } from "@/lib";
import { contracts } from "@/contracts";
import { IAssetInformation, OrTable } from "@/components/organisms/or-table";
import { useEffect, useState } from "react";

export default function Home() {
  const usedToken = "kamaleont";
  const referenceCurrency = "usd";
  const contractInformation = contracts[usedToken];

  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [price, setPrice] = useState<number>(0);

  useEffect(() => {
    getTokenBalance(contractInformation).then((result) => setBalance(result));
    getTokenPrice(usedToken, referenceCurrency).then((result) =>
      setPrice(result)
    );
  }, [contractInformation]);

  const asset: IAssetInformation = {
    id: contractInformation.symbol,
    label: usedToken,
    balance,
    price,
    referenceCurrency,
  };

  return (
    <section className="flex flex-col gap-y-8 items-center">
      <AtConnectButton size="sm" className="flex self-end" />
      <OrTable assets={[asset]} />
    </section>
  );
}
