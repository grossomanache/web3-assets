import clsx from "clsx";
import { IAssetInformation } from "../..";
import Image from "next/image";

interface IMlTableRow {
  asset: IAssetInformation;
  className: string;
}

export const MlTableRow = ({ asset, className }: IMlTableRow) => {
  const { id, balance, price, symbol, currency: referenceCurrency } = asset;

  const value = price * balance;
  const conversion = `${symbol}/${referenceCurrency ?? "USD"}`;

  return (
    <div className={clsx(className)}>
      <div className="name capitalize flex flex-row">
        <Image src={`/tokens/${id}.png`} height={10} width={30} alt={id} />
        <p className="pl-2">{id}</p>
      </div>
      <div className="price uppercase">
        {price.toFixed(4)} {conversion}
      </div>
      <div className="balance uppercase">
        {balance.toFixed(2)} {symbol}
      </div>
      <div className="value uppercase">
        ${value.toFixed(2)} {referenceCurrency}
      </div>
    </div>
  );
};
