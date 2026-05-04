import type { DashboardStat } from "../../types/my";
import Card from "../ui/Card";

type DashboardStatCardProps = {
  stat: DashboardStat;
};

const toneClassNameMap: Record<NonNullable<DashboardStat["tone"]>, string> = {
  default: "text-slate-900",
  primary: "text-blue-600",
  danger: "text-rose-500",
  success: "text-emerald-600",
};

function DashboardStatCard({ stat }: DashboardStatCardProps) {
  const valueToneClassName = toneClassNameMap[stat.tone ?? "default"];

  return (
    <Card className="rounded-[18px] p-4 shadow-[0_6px_18px_rgba(15,23,42,0.035)]">
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-400">{stat.label}</p>
        <div className="space-y-1">
          <p
            className={`text-[1.75rem] font-bold leading-none tracking-[-0.05em] [font-variant-numeric:tabular-nums] ${valueToneClassName}`}
          >
            {stat.value}
          </p>
          {stat.helperText ? (
            <p className="text-xs font-medium text-slate-400">{stat.helperText}</p>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export default DashboardStatCard;
