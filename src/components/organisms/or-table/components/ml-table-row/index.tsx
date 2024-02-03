import clsx from "clsx";
import { IAssetInformation } from "../..";
import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { contracts } from "@/contracts";

interface IMlTableRow {
  asset: IAssetInformation;
  className: string;
}

export const MlTableRow = ({ asset, className }: IMlTableRow) => {
  const { id, balance, price, currency: referenceCurrency } = asset;

  if (typeof balance !== "number" || !id) {
    return (
      <div>
        <p>Please connect a wallet to see your assets</p>
        <AtConnectButton size="sm" />
      </div>
    );
  }

  const { symbol } = contracts[id];

  const value = price * balance;
  const conversion = `${symbol}/${referenceCurrency ?? "USD"}`;

  return (
    <div className={clsx(className)}>
      <div className="name capitalize">{id}</div>
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
