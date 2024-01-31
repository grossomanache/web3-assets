"use client";

import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { OrTable } from "@/components/organisms/or-table";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { getTokenBalance } from "@/lib";
import { contracts } from "@/contracts";

export default function Home() {
  const { address: userAddress } = useAccount();
  const [balance, setBalance] = useState("0.0");

  useEffect(() => {
    if (!userAddress) {
      return;
    }

    const fetchData = async (tokenName: string) => {
      const contractInformation = contracts[tokenName];
      try {
        const result = await getTokenBalance({
          contractInformation,
          userAddress,
        });

        setBalance(result);
      } catch (error) {
        console.error("Failed to fetch token balance:", error);
      }
    };

    fetchData("klt");
  }, [userAddress]);
  return (
    <>
      <h1>Balance: {balance} KLT</h1>
      <AtConnectButton />
      <OrTable />
    </>
  );
}
