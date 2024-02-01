interface IAtConnectButton {
  size?: "md" | "mdl" | "sm";
  className?: string;
}

export const AtConnectButton = ({ className, size }: IAtConnectButton) => {
  return (
    <div className={className}>
      <w3m-button size={size} />
    </div>
  );
};
