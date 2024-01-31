import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { getTokenBalance } from "@/lib";
import { contracts } from "@/contracts";

export default async function Home() {
  const contractInformation = contracts["klt"];
  const balance = await getTokenBalance({ contractInformation });

  return (
    <>
      <h1>Balance: {balance} KLT</h1>
      <AtConnectButton />
    </>
  );
}
