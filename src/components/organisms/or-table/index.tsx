import { useAccount } from "wagmi";
import { MlTableHeader } from "./components/ml-table-header";

export const OrTable = () => {
  const account = useAccount();

  return (
    <>
      <MlTableHeader account={account} />
    </>
  );
};
