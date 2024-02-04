import clsx from "clsx";
import Image from "next/image";

interface IMlTableTitle {
  balance?: number;
  className?: string;
}

export const MlTableTitle = ({ balance, className }: IMlTableTitle) => {
  const balanceLabel = balance ? `- ${balance}USD` : "";
  return (
    <h2 className={clsx(className, "flex flex-row items-center")}>
      <Image src="/wallet.png" height={50} width={50} alt="wallet" />
      <p className="ml-2 text-2xl">Wallet {balanceLabel}</p>
    </h2>
  );
};
