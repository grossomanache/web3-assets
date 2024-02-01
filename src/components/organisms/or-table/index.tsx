import clsx from "clsx";
import { MlTableRow } from "./components/ml-table-row";

export interface IAssetInformation {
  id: string;
  label: string;
  price: number;
  balance: number | undefined;
  referenceCurrency: string;
}

interface IOrTable {
  assets: IAssetInformation[];
}

export const OrTable = ({ assets }: IOrTable) => {
  const gridClassnames = "grid grid-cols-4 gap-x-2";
  return (
    <div className="asset-table table border-2 p-2 rounded-lg w-fit">
      <div className={clsx(gridClassnames, "header border-b-2 row font-bold")}>
        <div className="name">Asset</div>
        <div className="price"> Price</div>
        <div className="balance">Balance</div>
        <div className="value">Value</div>
      </div>
      {assets.map((asset) => (
        <MlTableRow key={asset.id} asset={asset} className={gridClassnames} />
      ))}
    </div>
  );
};
