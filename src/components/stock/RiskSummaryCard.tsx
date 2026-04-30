import type { StockDetailData } from "../../types/stock";
import Card from "../ui/Card";

type RiskSummaryCardProps = {
  summary: StockDetailData["riskSummary"];
};

function RiskSummaryCard({ summary }: RiskSummaryCardProps) {
  return (
    <Card className="space-y-4 p-5">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-500">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span>{summary.label}</span>
        <span>·</span>
        <span>{summary.warningText}</span>
      </div>
      <div className="space-y-2">
        <p className="text-sm font-medium text-slate-500">
          {summary.horizonLabel}
        </p>
        <p className="text-5xl font-bold tracking-[-0.06em] text-rose-500">
          {summary.downsidePercent}%
        </p>
      </div>
      <p className="text-sm leading-6 text-slate-500">{summary.description}</p>
    </Card>
  );
}

export default RiskSummaryCard;
