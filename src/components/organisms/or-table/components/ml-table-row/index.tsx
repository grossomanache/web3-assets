import clsx from "clsx";
import { IAssetInformation } from "../..";
import { AtConnectButton } from "@/components/atoms/at-connect-button";

interface IMlTableRow {
  asset: IAssetInformation;
  className: string;
}

export const MlTableRow = ({ asset, className }: IMlTableRow) => {
  const { id, label, balance, price, referenceCurrency } = asset;

  if (typeof balance !== "number") {
    return (
      <div>
        <p>Please connect a wallet to see your assets</p>
        <AtConnectButton size="sm" />
      </div>
    );
  }

  const value = price * balance;
  const conversion = `${id}/${referenceCurrency}`;

  return (
    <div className={clsx(className)}>
      <div className="name capitalize">{label}</div>
      <div className="price uppercase">
        {price} {conversion}
      </div>
      <div className="balance uppercase">
        {balance} {id}
      </div>
      <div className="value uppercase">
        ${value} {referenceCurrency}
      </div>
    </div>
  );
};
