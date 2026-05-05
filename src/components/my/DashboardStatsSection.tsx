import type { DashboardStat } from "../../types/my";
import DashboardStatCard from "./DashboardStatCard";

type DashboardStatsSectionProps = {
  stats: DashboardStat[];
};

function DashboardStatsSection({ stats }: DashboardStatsSectionProps) {
  return (
    <section>
      <div className="grid grid-cols-3 gap-2">
        {stats.map((stat) => (
          <DashboardStatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}

export default DashboardStatsSection;
