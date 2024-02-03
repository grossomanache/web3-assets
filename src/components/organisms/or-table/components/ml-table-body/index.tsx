import { MlLoader } from "@/components/molecules/ml-loader";
import { IAssetInformation } from "../..";
import { MlTableRow } from "../ml-table-row";
import { AtConnectButton } from "@/components/atoms/at-connect-button";

interface IMlTableBody {
  isLoading: boolean;
  assets: IAssetInformation[];
  className: string;
}

export const MlTableBody = ({ isLoading, assets, className }: IMlTableBody) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <MlLoader />
      </div>
    );
  }

  const isValidAssets = assets.length > 0;
  if (!isValidAssets) {
    return (
      <div className="flex flex-col items-center">
        <p>Please connect a wallet to see your assets</p>
        <AtConnectButton size="sm" />
      </div>
    );
  }

  return (
    <>
      {assets.map((asset) => (
        <MlTableRow key={asset.id} asset={asset} className={className} />
      ))}
    </>
  );
};
