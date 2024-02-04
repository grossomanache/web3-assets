import clsx from "clsx";
import { IAssetInformation } from "../..";
import Image from "next/image";
import { useAccount, useChainId } from "wagmi";

interface IMlTableRow {
  asset: IAssetInformation;
  className: string;
}

export const MlTableRow = ({ asset, className }: IMlTableRow) => {
  const { chain } = useAccount();
  const { id, balance, price, symbol, currency } = asset;

  const referenceCurrency = currency ?? "USD";

  const value = price * balance;

  const priceLabel = `${price.toFixed(4)} ${referenceCurrency}`;
  const mobilePriceLabel = `${price.toFixed(2)} ${referenceCurrency}`;

  const chainName = chain?.name ?? "";

  const subtitleClassName = "text-sm dark:text-gray-400 text-gray-600";

  return (
    <div className={clsx(className)}>
      <div className="name capitalize items-center flex flex-row">
        <Image src={`/tokens/${id}.png`} height={10} width={30} alt={id} />
        <span className="pl-2">
          <p>{id}</p>
          <div className="flex flex-row items-center">
            <Image
              src={`/chains/${chainName}.png`}
              height={15}
              width={15}
              alt={id}
            />
            <p className={clsx(subtitleClassName, "pl-1")}>{chainName}</p>
          </div>
        </span>
      </div>
      <div className="price uppercase hidden md:inline">{priceLabel}</div>
      <div className="balance uppercase hidden md:inline">
        {balance.toFixed(2)} {symbol}
      </div>
      <div className="value uppercase">
        <p className="uppercase">
          ${value.toFixed(2)} {referenceCurrency}
        </p>
        <p className={clsx("price uppercase", "md:hidden", subtitleClassName)}>
          {mobilePriceLabel}
        </p>
      </div>
    </div>
  );
};
