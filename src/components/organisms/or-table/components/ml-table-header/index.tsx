import clsx from "clsx";

interface IMlTableHeader {
  className?: string;
}

export const MlTableHeader = ({ className }: IMlTableHeader) => {
  return (
    <div className={clsx(className, "header border-b-2 row font-bold")}>
      <div className="name">Asset</div>
      <div className="price hidden md:inline"> Price</div>
      <div className="balance hidden md:inline">Balance</div>
      <div className="value">Value</div>
    </div>
  );
};
