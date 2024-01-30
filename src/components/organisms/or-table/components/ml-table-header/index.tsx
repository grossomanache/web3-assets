import { UseAccountReturnType } from "wagmi";

interface IMlTableHeader {
  account: UseAccountReturnType;
}

export const MlTableHeader = ({ account }: IMlTableHeader) => {
  return <>{account.address}</>;
};
