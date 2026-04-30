import { useNavigate } from "react-router-dom";
import type { TodayRisk } from "../../types/stock";
import StockIdentity from "../stock/StockIdentity";
import Button from "../ui/Button";
import Card from "../ui/Card";

type TodayRiskCardProps = {
  risk: TodayRisk;
};

function TodayRiskCard({ risk }: TodayRiskCardProps) {
  const navigate = useNavigate();
  const subtitle =
    risk.stock.price !== undefined && risk.stock.changeRate !== undefined
      ? `$${risk.stock.price.toFixed(2)} · 어제 대비 +${risk.stock.changeRate}%`
      : undefined;

  return (
    <Card className="space-y-4 p-4">
      <StockIdentity
        symbol={risk.stock.symbol}
        name={risk.stock.name}
        subtitle={subtitle}
      />
      <div className="rounded-[18px] bg-rose-50 px-4 py-3.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-rose-400" />
          <p className="text-xs font-semibold text-rose-500">{risk.riskLabel}</p>
        </div>
        <p className="mt-3 text-sm font-medium text-slate-500">
          {risk.signalSummary}
        </p>
        <div className="mt-1 flex items-end gap-2">
          <p className="text-[3.25rem] font-bold leading-none tracking-[-0.06em] text-rose-500 [font-variant-numeric:tabular-nums]">
            {risk.downsidePercent}%
          </p>
        </div>
        <p className="mt-2 text-xs leading-5 text-slate-400">
          {risk.horizonLabel}
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <Button
          variant="secondary"
          onClick={() => {
            // TODO: connect to /stocks/PLTR/why after the why page is implemented.
          }}
        >
          왜 위험한가요?
        </Button>
        <Button onClick={() => navigate("/stocks/PLTR")}>자세히 보기</Button>
      </div>
    </Card>
  );
}

export default TodayRiskCard;
