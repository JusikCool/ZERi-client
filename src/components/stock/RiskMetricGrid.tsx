import type { RiskMetric } from "../../types/stock";
import RiskMetricCard from "./RiskMetricCard";

type RiskMetricGridProps = {
  metrics: RiskMetric[];
};

function RiskMetricGrid({ metrics }: RiskMetricGridProps) {
  return (
    <section className="grid grid-cols-2 gap-2.5">
      {metrics.map((metric) => (
        <RiskMetricCard key={metric.id} metric={metric} />
      ))}
    </section>
  );
}

export default RiskMetricGrid;
