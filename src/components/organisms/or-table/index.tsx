import clsx from "clsx";
import { MlTableRow } from "./components/ml-table-row";
import { ETokens } from "@/contracts";
import { MlTableHeader } from "./components/ml-table-header";
import { MlLoader } from "@/components/molecules/ml-loader";
import { MlTableBody } from "./components/ml-table-body";

export interface IAssetInformation {
  id: ETokens;
  price: number;
  symbol: string;
  balance: number;
  currency?: string;
}

interface IOrTable {
  assets: IAssetInformation[];
  isLoading: boolean;
}

export const OrTable = ({ assets, isLoading }: IOrTable) => {
  const gridClassnames = "grid grid-cols-4 gap-x-2";
  return (
    <div className="asset-table table border-2 p-2 rounded-lg w-fit">
      <MlTableHeader className={gridClassnames} />
      <MlTableBody
        isLoading={isLoading}
        assets={assets}
        className={gridClassnames}
      />
    </div>
  );
};
