interface IAtConnectButton {
  className?: string;
}

export const AtConnectButton = ({ className }: IAtConnectButton) => {
  return (
    <div className={className}>
      <w3m-button size="md" />
    </div>
  );
};
