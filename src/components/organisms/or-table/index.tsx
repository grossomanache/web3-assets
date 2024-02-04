import { MlTableHeader } from "./components/ml-table-header";
import { MlTableBody } from "./components/ml-table-body";
import { IAsset } from "@/lib";
import { MlTableTitle } from "./components/ml-table-title";

export interface IAssetInformation extends IAsset {
  currency?: string;
}

interface IOrTable {
  assets: IAssetInformation[];
  isLoading: boolean;
}

export const OrTable = ({ assets, isLoading }: IOrTable) => {
  const isValidAssets = assets.length > 0;
  const balance = isValidAssets
    ? assets.reduce((accumulator, { balance }) => {
        return accumulator + balance;
      }, 0)
    : undefined;

  const gridClassnames =
    "items-center grid grid-cols-2 md:grid-cols-4 gap-x-4 p-2";
  return (
    <section className="flex flex-col gap-4">
      <MlTableTitle balance={balance} />
      <div className="asset-table table border-2 rounded-lg w-fit">
        <MlTableHeader className={gridClassnames} />
        <MlTableBody
          isLoading={isLoading}
          assets={assets}
          className={gridClassnames}
        />
      </div>
    </section>
  );
};
