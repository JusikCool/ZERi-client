import type { DashboardStat } from "../../types/my";
import SectionHeader from "../ui/SectionHeader";
import DashboardStatCard from "./DashboardStatCard";

type DashboardStatsSectionProps = {
  title?: string;
  stats: DashboardStat[];
};

function DashboardStatsSection({
  title = "요약 통계",
  stats,
}: DashboardStatsSectionProps) {
  return (
    <section className="space-y-3">
      <SectionHeader title={title} />
      <div className="grid grid-cols-3 gap-2.5">
        {stats.map((stat) => (
          <DashboardStatCard key={stat.id} stat={stat} />
        ))}
      </div>
    </section>
  );
}

export default DashboardStatsSection;
