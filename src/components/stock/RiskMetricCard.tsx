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
        ? "text-rose-500"
        : "text-slate-400";
  const hasFractionValue = metric.value.includes("/");
  const [primaryValue, secondaryValue] = hasFractionValue
    ? metric.value.split("/")
    : [metric.value, ""];

  return (
    <Card className="flex min-h-[108px] flex-col justify-between rounded-[18px] p-4 shadow-[0_6px_18px_rgba(15,23,42,0.035)]">
      <p className="text-xs font-medium text-slate-400">{metric.label}</p>
      <p className="text-[2.05rem] font-bold leading-none tracking-[-0.05em] [font-variant-numeric:tabular-nums]">
        {hasFractionValue ? (
          <>
            <span className="text-slate-900">{primaryValue}</span>
            <span className="text-slate-400">/{secondaryValue}</span>
          </>
        ) : (
          <span className="text-slate-900">{metric.value}</span>
        )}
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
