import type { RiskReasonSeverity } from "../../types/risk";
import Card from "../ui/Card";

type RiskReasonItemProps = {
  index: number;
  title: string;
  description: string;
  severity: RiskReasonSeverity;
};

function RiskReasonItem({
  index,
  title,
  description,
  severity,
}: RiskReasonItemProps) {
  const badgeClassName =
    severity === "neutral"
      ? "bg-slate-100 text-slate-500"
      : "bg-rose-50 text-rose-500";

  return (
    <Card className="rounded-[18px] border border-slate-100/90 p-4 shadow-[0_8px_20px_rgba(15,23,42,0.035)]">
      <div className="flex items-start gap-3">
        <div
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[13px] font-bold ${badgeClassName}`}
          aria-hidden="true"
        >
          {index}
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <p className="text-[15px] font-bold tracking-[-0.02em] text-slate-900">
            {title}
          </p>
          <p className="break-words pr-1 text-[13px] leading-[1.5] text-slate-500">
            {description}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default RiskReasonItem;
