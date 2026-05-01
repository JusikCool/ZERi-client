import type { TodayRisk } from "../../types/stock";
import TodayRiskCard from "./TodayRiskCard";

type TodayRiskSectionProps = {
  risk: TodayRisk;
};

function TodayRiskSection({ risk }: TodayRiskSectionProps) {
  return (
    <section className="space-y-3">
      <TodayRiskCard risk={risk} />
    </section>
  );
}

export default TodayRiskSection;
