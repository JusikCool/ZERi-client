import type { DashboardStat } from "../../types/my";
import Card from "../ui/Card";

type DashboardStatCardProps = {
  stat: DashboardStat;
};

const valueToneClassNameMap: Record<NonNullable<DashboardStat["tone"]>, string> = {
  default: "text-slate-900",
  primary: "text-slate-900",
  danger: "text-slate-900",
  success: "text-slate-900",
};

const helperToneClassNameMap: Record<
  NonNullable<DashboardStat["tone"]>,
  string
> = {
  default: "text-slate-400",
  primary: "text-slate-400",
  danger: "text-slate-400",
  success: "text-emerald-500",
};

function DashboardStatCard({ stat }: DashboardStatCardProps) {
  const tone = stat.tone ?? "default";
  const isInlineUnitStat =
    stat.id === "reviews" || stat.id === "actual-downside";
  const isHitRateStat = stat.id === "hit-rate";

  return (
    <Card className="rounded-[16px] p-3 shadow-[0_6px_18px_rgba(15,23,42,0.028)]">
      <div className="space-y-1.5">
        <p className="text-[10px] font-semibold leading-none text-slate-500">
          {isHitRateStat && stat.helperText
            ? `${stat.label} - ${stat.helperText}`
            : stat.label}
        </p>
        <div className="space-y-1">
          {isInlineUnitStat && stat.helperText ? (
            <p
              className={`flex items-end gap-0.5 text-[22px] font-extrabold leading-none tracking-[-0.05em] [font-variant-numeric:tabular-nums] ${valueToneClassNameMap[tone]}`}
            >
              <span>{stat.value}</span>
              <span className="pb-0.5 text-[12px] font-semibold tracking-[-0.01em] text-slate-700">
                {stat.helperText}
              </span>
            </p>
          ) : (
            <p
              className={`text-[22px] font-extrabold leading-none tracking-[-0.05em] [font-variant-numeric:tabular-nums] ${valueToneClassNameMap[tone]}`}
            >
              {stat.value}
            </p>
          )}
          {stat.helperText && !isInlineUnitStat && !isHitRateStat ? (
            <p
              className={`text-[10px] font-medium leading-none ${helperToneClassNameMap[tone]}`}
            >
              {stat.helperText}
            </p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export default DashboardStatCard;
