import type { StockDetailData } from "../../types/stock";
import Card from "../ui/Card";

type RiskSummaryCardProps = {
  summary: StockDetailData["riskSummary"];
};

function RiskSummaryCard({ summary }: RiskSummaryCardProps) {
  const descriptionLines = summary.description
    .split(". ")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <Card className="space-y-5 rounded-[24px] p-5 sm:p-6">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-500">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span>{summary.label}</span>
        <span>·</span>
        <span>{summary.warningText}</span>
      </div>
      <div className="space-y-2.5">
        <p className="text-sm font-medium text-slate-500">
          {summary.horizonLabel}
        </p>
        <p className="text-[3.95rem] font-extrabold leading-none tracking-[-0.03em] text-rose-500 [font-variant-numeric:tabular-nums]">
          {summary.downsidePercent}%
        </p>
      </div>
      <div className="space-y-1 text-[15px] leading-6 text-slate-500">
        {descriptionLines.map((line, index) => (
          <p key={`${line}-${index}`}>
            {line}
            {index === descriptionLines.length - 1 || line.endsWith(".")
              ? ""
              : "."}
          </p>
        ))}
      </div>
    </Card>
  );
}

export default RiskSummaryCard;
