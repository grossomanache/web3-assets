import { MlLoader } from "@/components/molecules/ml-loader";
import { IAssetInformation } from "../..";
import { MlTableRow } from "../ml-table-row";
import { AtConnectButton } from "@/components/atoms/at-connect-button";
import { useAccount } from "wagmi";
import clsx from "clsx";

interface IMlTableBody {
  isLoading: boolean;
  assets: IAssetInformation[];
  className: string;
}

export const MlTableBody = ({ isLoading, assets, className }: IMlTableBody) => {
  const { chainId } = useAccount();

  if (isLoading) {
    return (
      <div className="flex justify-center py-6">
        <MlLoader />
      </div>
    );
  }

  const isValidAssets = assets.length > 0 && chainId;
  if (!isValidAssets) {
    return (
      <div className="flex flex-col items-center">
        <p className="px-2 py-4">Please connect a wallet to see your assets</p>
        <AtConnectButton size="sm" className="my-3" />
      </div>
    );
  }

  return (
    <>
      {assets.map((asset, index) => {
        const isOddNumber = index % 2 === 0;
        const backgroundColor = isOddNumber
          ? "dark:bg-gray-800 bg-neutral-200"
          : "";
        return (
          <MlTableRow
            key={asset.id}
            asset={asset}
            className={clsx(className, backgroundColor)}
          />
        );
      })}
    </>
  );
};
