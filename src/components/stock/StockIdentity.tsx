import StockAvatar from "./StockAvatar";

type StockIdentityProps = {
  symbol: string;
  name: string;
  subtitle?: string;
};

function StockIdentity({ symbol, name, subtitle }: StockIdentityProps) {
  return (
    <div className="flex min-w-0 items-center gap-3">
      <StockAvatar symbol={symbol} />
      <div className="min-w-0 space-y-0.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <p className="truncate text-[15px] font-semibold leading-none text-slate-900">
            {symbol}
          </p>
          <span className="truncate text-[13px] text-slate-500">{name}</span>
        </div>
        {subtitle ? (
          <p className="truncate text-xs text-slate-400">{subtitle}</p>
        ) : null}
      </div>
    </div>
  );
}

export default StockIdentity;
