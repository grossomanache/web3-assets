interface IOrFooter {
  className?: string;
}

export const OrFooter = ({ className }: IOrFooter) => {
  return (
    <footer className={className}>
      Built by <a href="https://github.com/grossomanache">@grossomanache</a>
    </footer>
  );
};
