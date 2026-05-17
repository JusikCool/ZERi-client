import { useNavigate } from "react-router-dom";
import StockIdentity from "./StockIdentity";

type StockRiskListItemProps = {
  symbol: string;
  name: string;
  riskPercent: number;
  period: string;
  isLast?: boolean;
};

function StockRiskListItem({
  symbol,
  name,
  riskPercent,
  period,
  isLast = false,
}: StockRiskListItemProps) {
  const navigate = useNavigate();

  const riskTone =
    riskPercent <= -15
      ? "text-rose-500"
      : riskPercent <= -10
        ? "text-orange-500"
        : "text-orange-400";

  return (
    <li
      className={`flex min-h-16 cursor-pointer items-center justify-between gap-3 px-4 py-3.5 transition-colors hover:bg-slate-50 active:bg-slate-100 ${
        isLast ? "" : "border-b border-slate-100"
      }`}
      onClick={() => navigate(`/stocks/${symbol}`)}
    >
      <StockIdentity symbol={symbol} name={name} />
      <div className="shrink-0 text-right">
        <p className={`text-[15px] font-semibold leading-none ${riskTone}`}>
          {riskPercent.toFixed(2)}%
        </p>
        <p className="mt-0.5 text-xs text-slate-400">{period}</p>
      </div>
    </li>
  );
}

export default StockRiskListItem;
