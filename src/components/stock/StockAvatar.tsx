type StockAvatarProps = {
  symbol: string;
};

const colorMap: Record<string, string> = {
  PLTR: "bg-rose-100 text-rose-600",
  TSLA: "bg-orange-100 text-orange-600",
  NVDA: "bg-amber-100 text-amber-700",
  AAPL: "bg-emerald-100 text-emerald-700",
};

function StockAvatar({ symbol }: StockAvatarProps) {
  const colorClassName = colorMap[symbol] ?? "bg-slate-100 text-slate-600";

  return (
    <div
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${colorClassName}`}
      aria-hidden="true"
    >
      {symbol.slice(0, 1)}
    </div>
  );
}

export default StockAvatar;
