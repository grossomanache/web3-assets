import clsx from "clsx";
import Image from "next/image";

interface IMlTableTitle {
  balance: number;
  className?: string;
}

export const MlTableTitle = ({ balance, className }: IMlTableTitle) => {
  return (
    <h2 className={clsx(className, "flex flex-row items-center")}>
      <Image src="/wallet.png" height={40} width={40} alt="wallet" />
      <p className="ml-2">Wallet - {balance}USD</p>
    </h2>
  );
};
