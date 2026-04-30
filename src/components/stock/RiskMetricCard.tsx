import type { RiskMetric } from "../../types/stock";
import Card from "../ui/Card";

type RiskMetricCardProps = {
  metric: RiskMetric;
};

function RiskMetricCard({ metric }: RiskMetricCardProps) {
  const helperToneClassName =
    metric.emphasis === "danger"
      ? "text-rose-500"
      : metric.emphasis === "warning"
        ? "text-orange-500"
        : "text-slate-400";

  return (
    <Card className="space-y-2 p-4">
      <p className="text-xs font-medium text-slate-400">{metric.label}</p>
      <p className="text-[2rem] font-bold leading-none tracking-[-0.04em] text-slate-900">
        {metric.value}
      </p>
      {metric.helperText ? (
        <p className={`text-xs font-medium ${helperToneClassName}`}>
          {metric.helperText}
        </p>
      ) : null}
    </Card>
  );
}

export default RiskMetricCard;
