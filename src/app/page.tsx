"use client";

import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { OrTable } from "@/components/organisms/or-table";

export default function Home() {
  return (
    <>
      <AtConnectButton />
      <OrTable />
    </>
  );
}
