import { MlTableHeader } from "./components/ml-table-header";
import { MlTableBody } from "./components/ml-table-body";
import { IAsset } from "@/lib";

export interface IAssetInformation extends IAsset {
  currency?: string;
}

interface IOrTable {
  assets: IAssetInformation[];
  isLoading: boolean;
}

export const OrTable = ({ assets, isLoading }: IOrTable) => {
  const gridClassnames =
    "items-center grid grid-cols-2 md:grid-cols-4 gap-x-4 p-2";
  return (
    <div className="asset-table table border-2 rounded-lg w-fit">
      <MlTableHeader className={gridClassnames} />
      <MlTableBody
        isLoading={isLoading}
        assets={assets}
        className={gridClassnames}
      />
    </div>
  );
};
