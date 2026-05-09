import type { RiskGrade, StockDetailData } from "../../types/stock";
import Card from "../ui/Card";

type RiskSummaryCardProps = {
  summary: StockDetailData["riskSummary"];
};

const gradeStyles: Record<
  RiskGrade,
  { dot: string; label: string; value: string }
> = {
  WARNING: {
    dot: "bg-rose-400",
    label: "text-rose-500",
    value: "text-rose-500",
  },
  CAUTION: {
    dot: "bg-amber-400",
    label: "text-amber-500",
    value: "text-amber-500",
  },
  OK: {
    dot: "bg-emerald-400",
    label: "text-emerald-500",
    value: "text-emerald-500",
  },
};

function RiskSummaryCard({ summary }: RiskSummaryCardProps) {
  const styles = gradeStyles[summary.grade];

  const descriptionLines = summary.description
    .split(". ")
    .map((line) => line.trim())
    .filter(Boolean);

  return (
    <Card className="space-y-5 rounded-3xl p-5 sm:p-6">
      <div className={`flex items-center gap-1.5 text-xs font-semibold ${styles.label}`}>
        <span className={`h-2 w-2 rounded-full ${styles.dot}`} />
        <span>{summary.label}</span>
        <span>·</span>
        <span>{summary.grade}</span>
      </div>
      <div className="space-y-2.5">
        <p className="text-sm font-medium text-slate-500">
          {summary.horizonLabel}
        </p>
        <p
          className={`text-[3.95rem] font-extrabold leading-none tracking-[-0.03em] [font-variant-numeric:tabular-nums] ${styles.value}`}
        >
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
