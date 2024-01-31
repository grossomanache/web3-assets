import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { getTokenBalance, getTokenPrice } from "@/lib";
import { contracts } from "@/contracts";

export default async function Home() {
  const usedToken = "kamaleont";
  const contractInformation = contracts[usedToken];

  const balance = await getTokenBalance({ contractInformation });
  const tokenPrice = await getTokenPrice(usedToken);

  return (
    <>
      <p>Balance: {balance} KLT</p>
      <p>Price: {tokenPrice} KLT/USDT</p>
      <p>Value: {Number(balance) * tokenPrice} USDT</p>
      <AtConnectButton />
    </>
  );
}
