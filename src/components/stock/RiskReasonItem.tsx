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
    severity === "danger"
      ? "bg-rose-50 text-rose-500"
      : severity === "warning"
        ? "bg-amber-50 text-amber-600"
        : "bg-slate-100 text-slate-500";

  return (
    <Card className="rounded-[18px] p-4">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${badgeClassName}`}
          aria-hidden="true"
        >
          {index}
        </div>
        <div className="min-w-0 space-y-1">
          <p className="text-[15px] font-semibold tracking-[-0.02em] text-slate-900">
            {title}
          </p>
          <p className="text-sm leading-5 text-slate-500">{description}</p>
        </div>
      </div>
    </Card>
  );
}

export default RiskReasonItem;
